---
outline: deep
---

# Get Started

Esempio di dichiarazione oggetto, istanza e utilizzo:

```abap
DATA: lo_alv TYPE REF TO cl_gui_alv_grid.

" Istanza.
lo_alv = NEW cl_gui_alv_grid( ).

" Visualizzazione
lo_alv->display( ).
```

:::tip
Se l'istanza non verrà riutilizzata, è possibile non dichiarare l'oggetto `lo_alv` creando direttamente un'istanza che, contestualmente, chiama il metodo `display`:
```abap
" Istanza e visualizzazione.
NEW cl_gui_alv_grid( )->display( ).
```
:::