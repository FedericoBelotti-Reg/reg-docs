---
outline: deep
---

# Plugins  

## IDocToAny  

Questo plugin permette lo scambio di IDoc tra SAP e sistemi esterni attraverso la configurazione di uno o più `Flow`, una serie di steps che prevedono l'esecuzione di logiche di **reading**, **writing** e **mapping** dette **strategies** che manipoleranno l'IDoc in outbound o i dati letti da sorgenti esterne in inbound.

::: info
Non è necessario creare un `Daemon` o un `Listener` per ogni `Flow`, è sufficiente definire le **strategies** che verranno eseguite grazie ad una configurazione centralizzata per `Daemon` e `Listener`.
:::

E' quindi possibile, attraverso un writer, prendere un IDoc e scriverne i dati in un file di testo, in un database, o di chiamare delle API per comunicare con l'esterno. Allo stesso modo, tramite un reader, è possibile creare un IDoc leggendo i dati dalle stesse sorgenti esterne.  

::: info
Le logiche di reading, writing e mapping dipendono naturalmente dallo sviluppo e dalle logiche coinvolte, ma è sufficiente definire queste, al resto penserà il plugin.
:::

### Strategies

Il plugin gestisce tre tipi di strategies: **reader**, **writer** e **mapper**.

#### Reader

Strategy eseguita dal `Daemon` per elaborare i dati in inbound. Ogni reader, una volta eseguita la strategy, restituisce un oggetto di tipo `DataSet` contenente una struttura dati organizzata in tabelle da utilizzare per lo step di mapping.  
Il reader prevede inoltre la definizione di una logica per contrassegnare come **completata** o **KO** l'entità letta dalla sorgente esterna affinchè non venga rielaborata successivamente.  

Questi sono gli steps del `Flow` seguiti dal `Daemon`:  
![Flusso Reader](/diagrams/IDocToAny_Reader.svg)  

#### Writer
Strategy eseguita dal `Listener` per elaborare i dati dell'IDoc in outbound. Dopo l'esecuzione del mapping, il `DataSet` può essere utilizzato all'interno della strategy per mandare dati all'esterno, scriverli su file o in un database.  

Questi sono gli steps del `Flow` seguiti dal `Listener`:  
![Flusso Writer](/diagrams/IDocToAny_Writer.svg)  

#### Mapper
Strategy che prevede due metodi `MapIDocToDataSet` e `MapDataSetToIDoc` chiamati rispettivamente dal `Listener` e dal `Daemon`. Nel caso del `Listener` verranno quindi messi a disposizione i dati dell'IDoc per poter essere mappati, restituendo un oggetto `DataSet`  
e viceversa nel caso del `Daemon`.  

::: info
Nel caso in cui il flusso preveda sia l'outbound che l'inbound di dati, la strategy di mapping sarà una sola, con logiche di mapping diverse all'interno dei due metodi messi a disposizione dall'interfaccia.
:::

### Configurazione

La configurazione per l'IDocToAny è la medesima di ogni altro plugin, ossia l'inserimento di un record nelle tabelle `tblConfFromSap` nel caso di IDoc in outbound, uno per ogni messaggio/variante, e `tblConfToSap` per gli IDoc in inbound.

:::info
Nel caso di IDoc in inbound, è sufficiente inserire la configurazione per `IDocToAny.Plugins.Daemon`, la differenziazione dei flussi è definita all'interno della configurazione del `Flow` (spiegata nei paragrafi successivi).
:::

### Sviluppo

Prendiamo in esempio un `Flow` che, processato l'IDoc in outbound in SAP, ne elabori i dati per scriverli in un file di testo, nello specifico quanto fatto su **Acciai Vender** per l'interfaccia **SAP-Matter**.

:::warning
I tipi IDoc, le varianti e i dati specifici del flusso sono propri del sistema di Acciai Vender.
:::

:::danger
Il progetto IDocToAny presente su TFS ha una struttura di cartelle specifica. Tutte le classi create vanno collocate all'interno della cartella corretta, in base allo scopo della classe, in quanto vengono eseguiti alcuni controlli sulla base del namespace.
:::

Sarà necessario creare un `Mapper` implementando il metodo `MapIDocToDataSet`, e un `Writer` per la scrittura su file. Questi sono gli steps da seguire:  
1. Nella classe `ListenerConfiguration`, creare la configurazione per il `Flow`:
```csharp
    public class ListenerConfiguration : Config
    {
        protected override void FillDefaultValues()
        {
            Flows = new FlowDTO[]
            {
                new FlowDTO() { // [!code focus]
                    IDocType = "ZMATTER_DOCUMENT",  // [!code focus]
                    MesCode = "MAT",    // [!code focus]
                    Mapper = "CorrespondingMapper", // [!code focus]
                    Writer = "MatterFileWriter",    // [!code focus]
                    WriterConfiguration = new MatterFileWriterConfig()  // [!code focus]
                    {   // [!code focus]
                        DestinationPath = "SapToMatterTest",    // [!code focus]
                        Separator = "~" // [!code focus]
                    }   // [!code focus]
                },  // [!code focus]
            };
        }
    }
```

La classe `FlowDTO` ha delle proprietà base **obbligatorie** per il corretto funzionamento del `Listener`. Tutte le configurazioni specifiche del `Flow` vanno inserite all'interno di una classe che implementa l'interfaccia `IFlowConfiguration`, in questo caso `MatterFileWriterConfig`:

```csharp
    public class MatterFileWriterConfig : IFlowConfiguration
    {
        public string DestinationPath { get; set; }
        public string Separator { get; set; }
    }
```

:::tip
Questa configurazione, come ogni altro plugin dell'Orchestratore, verrà utilizzata dall'Orchestratore stesso per crearla a livello di database nel momento in cui non ce ne sia già una presente nella tabella `tblConfigurazione`.
:::

2. Creare una classe per la mapping strategy che implementi l'interfaccia `IMapperStrategy`, in questo caso `CorrespondingMapper`. :
```csharp
    public class CorrespondingMapper : IMapperStrategy
    {
        public IEnumerable<IDocDTO> MapDataSetToIDoc(FlowDTO flow, DataSet dataset)
        {
            throw new NotImplementedException();
        }

        public DataSet MapIDocToDataSet(FlowDTO flow, IDocDTO idoc)
        {
            throw new NotImplementedException();
        }        
    }
```
Trattandosi di un `Listener`, il mapping verrà fatto da IDoc a `DataSet`. Implementare quindi la logica all'interno del metodo `MapIDocToDataSet`.  
:::info
In questo caso la classe `CorrespondingMapper` fa il mapping 1:1 di ogni campo presente in ogni segmento dell'IDoc in un `DataSet` che ne riflette la struttura.
:::

:::tip
La best-practice prevede di produrre un oggetto `DataSet` con già la struttura gerarchica necessaria al successivo consumo del `DataSet` stesso, non quindi un elenco di tabelle sconnesse da dover poi riconciliare tramite indici.
:::

3. Creare una classe per la writing strategy che implementi l'interfaccia `IWriterStrategy`, in questo caso `MatterFileWriter`, implementando la logica nel metodo `WriteRecords`:
```csharp
    public class MatterFileWriter : IWriterStrategy
    {
        public void WriteRecords(FlowDTO flow, DataSet dataset)
        {
            // . . .
        }
    }
```

:::info
L'oggetto `flow` viene reso disponibile in tutti i metodi del plugin, così da poter accedere comodamente ai dati di configurazione.
:::

Se tutto è stato fatto correttamente, elaborando un IDoc del tipo specificato in configurazione da SAP, la logica del plugin dovrebbe essere eseguita e produrre, in questo caso, un file di testo nel percorso indicato sempre in configurazione (`DestinationPath`).