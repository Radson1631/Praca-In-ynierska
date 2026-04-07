$parts = @("ui-core-init.js", "ui-core-controls.js", "ui-core-events.js")
$out = "ui.js"

$allLines = @()
foreach ($p in $parts) {
    if (!(Test-Path $p)) {
        throw "Brak pliku: $p"
    }
    $allLines += Get-Content $p
}

Set-Content -Path $out -Value $allLines -Encoding UTF8
Write-Output "Zbudowano ui.js z 3 części."

