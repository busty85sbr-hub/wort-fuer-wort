// Passt das von Capacitor frisch erzeugte Android-Projekt an:
// App-Icons, Farben und Startbild aus android-vorlage/, Versionsnummer aus der Build-Nummer
// und – falls ein Signaturschlüssel bereitliegt – die Signatur für die Release-APK.
import { cpSync, existsSync, readFileSync, writeFileSync } from 'node:fs';

const RES = 'android/app/src/main/res';
const GRADLE = 'android/app/build.gradle';

if (!existsSync(GRADLE)) {
  console.error('Ordner android/ fehlt – zuerst „npx cap add android“ ausführen.');
  process.exit(1);
}

cpSync('android-vorlage/res', RES, { recursive: true, force: true });

const build = Math.max(1, parseInt(process.env.GITHUB_RUN_NUMBER || '1', 10));
let gradle = readFileSync(GRADLE, 'utf8');
const ersetze = (muster, neu, was) => {
  if (!muster.test(gradle)) { console.error('In build.gradle nicht gefunden: ' + was); process.exit(1); }
  gradle = gradle.replace(muster, neu);
};

ersetze(/versionCode \d+/, 'versionCode ' + build, 'versionCode');
ersetze(/versionName "[^"]*"/, 'versionName "1.0.' + build + '"', 'versionName');

if (process.env.WFW_KEYSTORE) {
  ersetze(/buildTypes \{\s*release \{/, treffer => [
    'signingConfigs {',
    '        release {',
    '            storeFile file(System.getenv("WFW_KEYSTORE"))',
    '            storePassword System.getenv("WFW_KEYSTORE_PASSWORD")',
    '            keyAlias System.getenv("WFW_KEY_ALIAS")',
    '            keyPassword System.getenv("WFW_KEYSTORE_PASSWORD")',
    '        }',
    '    }',
    '    ' + treffer,
    '            signingConfig signingConfigs.release'
  ].join('\n'), 'buildTypes/release');
}

writeFileSync(GRADLE, gradle);
console.log('Android-Projekt angepasst: Version 1.0.' + build + (process.env.WFW_KEYSTORE ? ', Release-Signatur aktiv' : ', ohne eigenen Schlüssel (Debug-Build)'));
