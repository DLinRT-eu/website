# Update Company Product IDs Script
# This script updates company files with correct productIds based on actual products

$companyProducts = @{
    "AI Medical" = @("ai-medical-jazz")
    "Carina AI" = @("carina-intcontour")
    "Coreline Soft Co" = @("coreline-aview-rt-acs")
    "Ever Fortune AI" = @("everfortune-rt-suite")
    "Hura Imaging" = @("hura-dvtarget")
    "Limbus AI" = @("limbus-contour")
    "Manteia" = @("manteia-accucontour", "manteia-acculearning", "manteia-mozi")
    "MIM Software" = @("mim-contour-protegeai")
    "Mirada Medical" = @("mirada-dlc")
    "MVision AI" = @("mvision-ai-contouring", "mvision-ai-dose-plus", "mvision-verify", "mvision-ai-workspace-plus", "mvision-ai-adapt-plus", "mvision-ai-image-plus")
    "RadFormation" = @("radformation-autocontour")
    "Synaptiq" = @("synaptiq-mediq-rt")
    "Therapanacea" = @("therapanacea-annotate", "therapanacea-adaptbox", "mr-box-synthetic")
    "Vysioner" = @("vysioner-vbrain")
    "Wisdom Tech" = @("wisdom-deep-contour")
    "Oncosoft" = @("oncosoft-oncostudio")
    "GE Healthcare" = @("ge-auto-segmentation", "ge-truefidelity-pro", "ge-air-recon-dl", "ge-dlip-ct", "ge-air-recon-dl-enhancement", "ge-healthcare-irt")
    "Philips" = @("philips-auto-contouring", "philips-mrcat-head-and-neck", "philips-mrcat-brain", "philips-mrcat-pelvis", "philips-precise-image", "philips-smartspeed", "philips-intellispace-ai-enhancement", "philips-smartdose-ct-enhancement")
    "Siemens Healthineers" = @("siemens-syngo-ct", "siemens-ai-rad-companion", "directorgans", "siemens-dual-energy-optimizer")
    "Canon Medical Systems" = @("canon-aice-ct", "canon-aice-mr", "canon-piqe", "canon-advanced-vis-ai")
    "United Imaging" = @("united-uai-vision-recon", "united-uaifi-umr", "united-hd-tof", "united-ucs-ai")
    "Taiwan Medical Imaging Co." = @("taimedimg-deepmets")
    "AlgoMedica" = @("algomedica-pixelshine")
    "Spectronic Medical" = @("spectronic-mriplus", "spectronic-mri-planner", "spectronic-mriplanner")
    "SyntheticMR" = @("syntheticmr-neuro")
    "RaySearch Laboratories" = @("raysearch-raystation", "raysearch-raystation-planning")
    "AIRS Medical" = @("airs-swiftmr", "airs-ct-clarity")
    "Subtle Medical" = @("subtle-mr", "subtle-pet", "subtle-gad")
    "PTW" = @("ptw-aqualis")
    "PyMedix" = @("pymedix-registration")
    "MedLever, Inc." = @("medlever-workflow-management")
    "Elekta" = @("elekta-iris")
    "Accuray" = @("accuray-synchrony")
    "Sun Nuclear" = @("oncospace-predictive-planning")
    "MD Anderson Cancer Center" = @("rpa-radiation-planning-assistant")
}

Write-Host "`n=== Company Product Mapping ===" -ForegroundColor Green
foreach ($company in $companyProducts.Keys | Sort-Object) {
    $products = $companyProducts[$company]
    Write-Host "`n$company ($($products.Count) products):" -ForegroundColor Cyan
    $products | ForEach-Object { Write-Host "  - $_" }
}

Write-Host "`n`nTotal: $($companyProducts.Keys.Count) companies" -ForegroundColor Green
Write-Host "Total Products: $(($companyProducts.Values | ForEach-Object { $_.Count } | Measure-Object -Sum).Sum)" -ForegroundColor Green
