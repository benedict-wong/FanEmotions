@echo off
REM --- Convert CSV to JSON, trimming spaces from values ---

set "input=%~1"
set "output=project-data.json"

if "%input%"=="" (
    echo Usage: csv_to_json.bat file.csv
    exit /b
)

echo Converting "%input%" to "%output%"...

powershell -NoProfile -Command ^
  "$data = Import-Csv -Path '%input%';" ^
  "foreach ($row in $data) { foreach ($col in $row.PSObject.Properties) { $col.Value = $col.Value.Trim() } }" ^
  "($data | ConvertTo-Json -Depth 10) | Out-File -Encoding utf8 '%output%'"

echo Done! Output saved to "%output%"
pause