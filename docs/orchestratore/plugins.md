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

La configurazione di questa tipologia di plugin è la medesima di ogni altro plugin.