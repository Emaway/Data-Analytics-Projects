Attribute VB_Name = "Module1"
Sub StockVolume()
    '1) Define variable ticker
    
    '2) Define variable Total Volume
     
    '3) Difine varable Summary table for Ticcker and Total Stock
    
'-------------------------------------------------------------------------------------------------------------
For Each ws In Worksheets

ws.Range("I1").Value = "Ticker"
ws.Range("J1").Value = "Total Stock Volume"

' Define Ticker

Dim Ticker As String

' Define Total volume

Dim Total_Volume As Double

Total_Volume = 0

'Set Summary table row to hold Ticker and Total Stock ( I & J)

Dim Summary_Table_Row As Integer

Summary_Table_Row = 2


'get the last row number with data

RowCount = ws.Cells(Rows.Count, "A").End(xlUp).Row


' Loop through all <ticker> cells under column A


For i = 2 To RowCount

' Check ticker symbols in each cell, if it is not the same


If ws.Cells(i + 1, 1).Value <> ws.Cells(i, 1).Value Then

 'set Ticker value and
 
Ticker = ws.Cells(i, 1).Value

 'set total volume
 
Total_Volume = Total_Volume + ws.Cells(i, 7).Value

 'Summerize Ticker and Total volume in the Summary Table (column I & J)
 
ws.Range("I" & Summary_Table_Row).Value = Ticker


ws.Range("J" & Summary_Table_Row).Value = Total_Volume

 ' Add one to the summary table row
 
Summary_Table_Row = Summary_Table_Row + 1
 
 ' Reset Total

Total_Volume = 0

 ' If the cell immediately following a row is the same ticker
    
Else

' Add to the Ticker summary with conciding Total_Volume
      
Total_Volume = Total_Volume + ws.Cells(i, 7).Value

    End If

  Next i
Next ws


End Sub

