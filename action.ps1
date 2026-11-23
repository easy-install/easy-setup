#!/usr/bin/env pwsh
#
# Runs `ei` for every entry of the `url` input. Each line is a single `ei`
# invocation whose arguments are split on whitespace, for example:
#   quickjs-ng/quickjs --name qjs --alias qjs-ng

$ErrorActionPreference = 'Stop'

function Get-EiInput {
    param([Parameter(Mandatory)][string]$Name)

    $variable = 'INPUT_' + $Name.ToUpperInvariant().Replace(' ', '_')
    $value = [Environment]::GetEnvironmentVariable($variable)
    if ([string]::IsNullOrWhiteSpace($value)) {
        [Console]::Error.WriteLine("Error: Input required and not supplied: $Name")
        exit 1
    }

    return $value
}

function Get-EiPath {
    $command = Get-Command ei -CommandType Application -ErrorAction SilentlyContinue |
        Select-Object -First 1
    if ($command) {
        return $command.Source
    }

    $eiDir = if ($env:EI_DIR) { $env:EI_DIR } else { Join-Path $HOME '.ei' }
    $eiExe = Join-Path $eiDir 'ei.exe'
    if (Test-Path -LiteralPath $eiExe) {
        return $eiExe
    }

    [Console]::Error.WriteLine('Error: ei was not found, run the install step first')
    exit 1
}

$ei = Get-EiPath
Write-Output "ei: $ei"

# One `ei` command line per entry: newlines or commas separate the commands.
$commands = @(
    foreach ($line in ((Get-EiInput -Name 'url') -split "`r?`n")) {
        foreach ($entry in $line.Split(',')) {
            $trimmed = $entry.Trim()
            if ($trimmed) { $trimmed }
        }
    }
)

foreach ($commandLine in $commands) {
    $arguments = @($commandLine -split '\s+' | Where-Object { $_ })
    Write-Output "-> Running: ei $($arguments -join ' ')"
    & $ei @arguments
    if ($LASTEXITCODE -ne 0) {
        exit $LASTEXITCODE
    }
}
