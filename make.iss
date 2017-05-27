; Instalador para DocumentorJS
; Se requiere NODEJS instalado
; Compilar con Inno Setup: http://www.jrsoftware.org/isinfo.php
; @author Daniel Vera Morales

#define MyAppName "DKDocumentorJS"
#define MyAppAlias "DKDoc"
#define MyAppVersion "1.0.0"
#define MyAppPublisher "DK"

[Setup]
; NOTE: The value of AppId uniquely identifies this application.
; Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{108A82E0-0329-4CD5-9C5E-88C5E552D48A}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
DefaultDirName={pf}\DKDocumentorJS
DisableDirPage=yes
DefaultGroupName=DKDocumentorJS
DisableProgramGroupPage=yes
InfoBeforeFile=./license.txt
OutputBaseFilename={#MyAppAlias}-{#MyAppVersion}
Compression=lzma
SolidCompression=yes
PrivilegesRequired=admin
OutputDir=./dist/
             
[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Files]
Source: "./*"; Excludes:"./node_modules/*, ./Output"; AfterInstall:InstallNodeApp; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[code]
function InitializeUninstall(): Boolean;
var
  C, P, D: String;
var R: Integer;
begin
  C:= 'npm';
  P:= 'uninstall  --silent ';
  D:= ExpandConstant('{app}');
  if ShellExec('', C, P, D, SW_HIDE, ewWaitUntilTerminated, R) then begin
     Result := True;
  end
  Result := False;
end;

function InitializeSetup(): boolean;
var
  D: String;
  R, ResultCode: integer;
begin
  D:= '';
  if ShellExec('', 'npm', '--version', D, SW_HIDE, ewWaitUntilTerminated, ResultCode) then
  begin
     Result := True;
  end
  else begin
    MsgBox('NODE JS IS NOT INSTALLED:>https://nodejs.org/en/download/package-manager/#windows', mbError, MB_OK)
    ShellExec('open', 'https://nodejs.org/en/download/package-manager/#windows', '', '', SW_SHOW, ewNoWait, ResultCode);
    Result := False;
  end;
end;

procedure InstallNodeApp;
var
  C, P, D: String;
var R: Integer;
begin
  C:= 'npm';
  P:= 'install  --silent ';
  D:= ExpandConstant('{app}');
  ShellExec('', C, P, D, SW_HIDE, ewWaitUntilTerminated, R);
  ShellExec('', C, 'link', D, SW_HIDE, ewWaitUntilTerminated, R);
end;