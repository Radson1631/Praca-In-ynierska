## Stale polaczenie miedzy 2 komputerami (Node.js)

1. Na komputerze-serwerze (w tym folderze) uruchom:
```powershell
npm install
npm run start:collab
```

2. Odczytaj IP LAN komputera-serwera (np. `192.168.1.20`).

3. Na obu komputerach otworz aplikacje z serwera:
`http://192.168.1.20:8787`

4. W menu `Wspolpraca (2 komputery)`:
- `Server WS`: `ws://192.168.1.20:8787/ws`
- `Pokoj`: ten sam identyfikator na obu komputerach
- kliknij `Polacz`

Po polaczeniu zmiany sa wysylane automatycznie, a `Wyslij teraz` wymusza sync natychmiast.

## Wersja bez PowerShella na co dzien (hostowany serwer online)

Mozesz uruchomic ten sam serwer na Render i potem tylko wpisywac jeden staly adres `wss://.../ws`.

1. Wrzuć projekt na GitHub (z plikami `collab-server.js`, `package.json`, `render.yaml`).
2. Wejdź na https://render.com i zaloguj się.
3. `New` -> `Blueprint` -> wybierz repo.
4. Render odczyta `render.yaml` i utworzy serwer automatycznie.
5. Po deploy dostaniesz adres np. `https://twoj-collab.onrender.com`.
6. W aplikacji (na obu komputerach) ustaw:
   - `Server WS`: `wss://twoj-collab.onrender.com/ws`
   - `Pokoj`: taki sam na obu komputerach (np. `default`)
7. Kliknij `Polacz` na obu komputerach.

Uwagi:
- W planie darmowym Render moze usypiac serwis po bezczynnosci. Pierwsze polaczenie po przerwie moze trwac chwile.
- Przy hostingu online nie trzeba uruchamiac lokalnie `npm run start:collab`.
