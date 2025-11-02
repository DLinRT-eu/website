# PowerShell Script to extract all product IDs and their company names
$products = @()

Get-ChildItem -Path "src\data\products" -Recurse -Filter "*.ts" -Exclude "index.ts","*example*" | ForEach-Object {
    $file = $_.FullName
    $content = Get-Content $file -Raw
    
    # Extract all product objects
    if ($content -match '(?s)\{[^}]*id:\s*"([^"]+)"[^}]*company:\s*"([^"]+)"[^}]*\}') {
        $allMatches = [regex]::Matches($content, '(?s)\{\s*id:\s*"([^"]+)"[^}]*?company:\s*"([^"]+)"[^}]*?\}')
        
        foreach ($match in $allMatches) {
            $productId = $match.Groups[1].Value
            $companyName = $match.Groups[2].Value
            
            $products += [PSCustomObject]@{
                ProductId = $productId
                Company = $companyName
                File = $_.Name
            }
        }
    }
}

# Output sorted by company
$products | Sort-Object Company, ProductId | Format-Table -AutoSize
$products | Group-Object Company | Sort-Object Name | ForEach-Object {
    Write-Host "`n$($_.Name) ($($_.Count) products):" -ForegroundColor Cyan
    $_.Group | ForEach-Object { Write-Host "  - $($_.ProductId)" }
}
