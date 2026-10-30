Add-Type -AssemblyName System.Drawing
if (-not (Test-Path 'icons')) { New-Item -ItemType Directory -Path 'icons' | Out-Null }

function Build-Icon($size, $path) {
    $bmp = New-Object System.Drawing.Bitmap $size, $size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

    $rect = New-Object System.Drawing.Rectangle 1, 1, ($size - 2), ($size - 2)
    $bgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 21, 23, 28))
    $g.FillEllipse($bgBrush, $rect)

    $penWidth = [float][Math]::Max(1.5, ($size * 0.06))
    $penColor = [System.Drawing.Color]::FromArgb(255, 187, 134, 252)
    $pen = New-Object System.Drawing.Pen -ArgumentList $penColor, $penWidth
    $g.DrawEllipse($pen, $rect)

    $dotR = [Math]::Max(2.0, ($size * 0.16))
    $d1 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 255, 121, 198))
    $d2 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 0, 255, 65))
    $d3 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 0, 240, 255))

    $g.FillEllipse($d1, ($size * 0.28), ($size * 0.35), $dotR, $dotR)
    $g.FillEllipse($d2, ($size * 0.54), ($size * 0.28), $dotR, $dotR)
    $g.FillEllipse($d3, ($size * 0.42), ($size * 0.56), $dotR, $dotR)

    $g.Dispose()
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
}

Build-Icon 16 'icons/icon16.png'
Build-Icon 48 'icons/icon48.png'
Build-Icon 128 'icons/icon128.png'
Write-Host "Icons successfully generated in icons/"
