# Wort für Wort

Lesespiel für Leseanfänger. Ein Wort erscheint Buchstabe für Buchstabe oder Silbe für Silbe, bei jedem Tippen kommt der nächste Teil dazu. Steht das ganze Wort da, fragt die App mit einem Bildsymbol, ob aufgelöst werden soll. Mit ✓ erscheint das passende Bild (Emoji), danach bestätigt das Kind, ob es richtig gelesen hat. Bei ✓ gibt es eine Fanfare und Konfetti.

Die App gibt es hier auf zwei Wegen:

| Weg | Wo | Für |
|---|---|---|
| **Web-App** | GitHub Pages aus dem Ordner `docs/` | Tablet, Handy, PC im Browser. Über „Zum Startbildschirm hinzufügen“ läuft sie danach auch offline. |
| **Android-App (APK)** | Releases dieses Repos, automatisch gebaut | Android-Tablet und -Handy, Installation wie eine normale App |

## Aufbau

```
docs/                       Die App (index.html mit Wortschatz, Schrift und Logik), Manifest, Service Worker, Icons
android-vorlage/res/        App-Icon, Farben und Startbild für die Android-App
tools/android-anpassen.mjs  Setzt Icons, Version und Signatur in das erzeugte Android-Projekt ein
capacitor.config.json       App-Kennung (de.wortfuerwort.app), Name, Quellordner docs/
package.json                Capacitor 6 und zwei Plugins (Zurück-Taste, Sprachausgabe)
.github/workflows/          Workflow „Android-APK bauen“
```

## Web-App (GitHub Pages)

Settings → Pages → *Deploy from a branch* → Branch `main`, Ordner `/docs` → Save.
Nach ein bis zwei Minuten läuft die App unter `https://<benutzername>.github.io/<repo-name>/`.

## Android-App

Jede Änderung an `docs/` startet einen neuen Build. Von Hand geht es unter Actions → *Android-APK bauen* → *Run workflow*. Die fertige APK liegt unter **Releases**. Auf dem Tablet: Releases → neueste Version → `.apk` antippen → installieren.

Damit sich spätere Versionen direkt über die installierte App legen lassen und eigene Wörter und Einstellungen erhalten bleiben, braucht jeder Build denselben Signaturschlüssel. Er liegt als Secret `ANDROID_KEYSTORE` im Repo (Settings → Secrets and variables → Actions). Fehlt das Secret, baut der Workflow trotzdem, dann aber mit wechselndem Test-Schlüssel.

## Daten

Eigene Wörter und Einstellungen speichert die App nur auf dem jeweiligen Gerät (localStorage). Web-App und Android-App haben getrennte Daten. Übertragen lassen sie sich in den Einstellungen mit „Liste kopieren“ und „Liste einfügen“.

## Wortschatz

380 Wörter mit Bild, nach Sprechsilben getrennt. Die Schwierigkeitsstufe berechnet die App aus den Lauten im Wort:

- **Leicht:** lautgetreu und kurz
- **Mittel:** mit Lautverbindungen (sch, ei, au, ie …) oder Doppelbuchstaben
- **Schwer:** lange Wörter, Konsonantenhäufungen, seltene Buchstaben

Schrift: Andika von SIL International (SIL Open Font License 1.1), eingebettet in `docs/index.html`.
