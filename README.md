# frontend-assignment

## TODOs

- TODO: Install dependencies for the assignment along with their Typescript type definitions:
  - Leaflet: A JS library for creating interactive 2D maps.
  - React Leaflet: A React wrapper around the Leaflet JS library.
  - MUI: [Material UI](https://mui.com/), a React UI component library.
- TODO: Fetch at least 2 items of [GeoJSON data](https://datahub.io/collections/geojson) of your choice from the internet.
- TODO: Construct types for GeoJSON data.
- TODO: Type-cast the fetched data if necessary. You can also use type guards where needed.
- TODO: Declare variables with the useState() hook.
- TODO: Annotate all variables with their proper TypeScript types. Type 'any' must be avoided.
- TODO: Use MUI framework for UI components.
- TODO: Implement a mechanism to switch between the GeoJSON data to be displayed.
- TODO: Implement a mechanism to list the 'features' contained in the selected GeoJSON data and a way for users to select a specific one to have it highlighted on the map.
- TODO: Implement a React Leaflet map.
- TODO: Display the initial coordinates (x,y) above the map in the page.
- TODO: Add a custom Leaflet Map component.
- TODO: Define type for props if necessary.
- TODO: Visualize coordinates with Plotly or any other framework in scatter plot.

## Vorgehensweise

Bevor ich überhaupt mit der Planung anfangen konnte war mir klar, dass ich zuerst mir einen Überblick über die GeoJSON-Daten verschaffen muss.
Um die Datasets zu erkundigen hat sich [Postman](https://www.postman.com/) als ein nützliches Tool erwiesen. Daraufhin habe ich mich für die folgenden
zwei Datasets entschieden: [geo-countries](https://pkgstore.datahub.io/core/geo-countries/countries/archive/23f420f929e0e09c39d916b8aaa166fb/countries.geojson) 
und [geo-admin1-us](https://pkgstore.datahub.io/core/geo-admin1-us/admin1-us/archive/832de13f11fc882d18d45e085758e737/admin1-us.geojson). Nachdem ich einen
Blick auf die Datasets geworfen habe, habe ich angefangen mich an die Planung zu machen. Mir war klar, dass bevor ich überhaupt die eignetliche Aufgabe
der Datenvisualisierung bearbeiten kann, muss ich die Daten erstmal eingelesen und entsprechend getyped haben. Für einen schnellen Navigation der Daten habe
ich mich dazu entschieden diese in einer Map darzustellen, bei der der Key eines Objekts der Name ist und der Value ein zugehöriges Array der Polygons.
Nach der Präprozessierung der Daten konnte ich dann einen ersten Meachanismus entwickeln um ein Objekt auszuwählen. Dabei habe ich mich für die Komponente
FormControl, die Material UI zur Verfügung stellt, entschieden. Die Keys der Maps können dort eingespeist werden und mit Auswahl eines Keys kann Zugang zum
korrespondierenden Array geleistet werden. Bevor ich aber den Mechanismus zum Wechseln zwischen den beiden Datasets kümmere, habe ich mir vorgenommen erstmal
ein Dataset zu visualisieren, da mir noch unbewusst war wie viel Zeit tatsächlich das implementieren der Karte und des Plots beanspruchen würde.
Da ich noch nie mit sowohl Leaflet als auch Plotly gearbeitet habe, habe ich mich zunächst mich mit der Documentation befasst und mir kleinere Beispiele
angeguckt. Als nächstes habe ich mich an eigene Tests gemacht und erste Prototype zur Realisierung der Darstellung implementiert. Bei der Karte bin ich auf
kleine Hürden gestoßen, wie zum Beispiel das in dem Datasets die Breiten- und Höhengrade vertauscht waren oder das ich vergessen hatte das Styling der Leafletkomponenten
zu importieren. Das erstellen des Plots lief dafür relativ reibungslos. Nachdem ich die Visualisierung des einen Datasets erfolgriech realisiert habe, konnte ich 
mich an den Mechanismus machen, um zwischen den beiden Datasets zu wechseln. Gedanken um die Visualisierung des anderen Datasets musste ich mir nicht machen,
da diese sehr ähnlich beschaffen waren und ich direkt die beiden Maps im gleichen Typ implementiert habe. Da ich nur zwei Datasets gegeben habe, habe ich mich für
Buttons zum switchen zwischen den Sets entschieden. Für den Switch-Mechanismus habe ich dann zwei weitere Variablen implementiert. Eine Hook die den zurzeit aktiven
Modus hält, damit wir nach Änderung dieses in unserem FormControl die benötigten Keys auswechseln können. Und eine weiter Map, die die zurzeit aktive Map hält,
wodurch wir den Satz unserer Keys immer auf die richtige Map anwenden. Alle Funktionalitäten waren somit implementiert und ich konnte mit dem Styling der Applikation
beginnen. Hierbei waren das Stylen der Material UI-Komponenten für mich neu, aber kein Problem nachdem ich etwas Zeit investiert habe. Bei dem Theme habe ich
mich von der [Empit Website](https://empit.com/) inspirieren lassen. Für das gesamte Styling der Komponenten habe ich mich auf die vier Farben: '#feed00', '#f0f0f0', '#fff'
und '#000' festgelegt. Zu guter letzt habe ich das fertige Projekt [hier](https://kfc-manager.github.io/frontend-assignment/) deployed.

## Probleme

Ich bin auf die folgenden Probleme gestoßen und hoffe auf Feedback wie ich diese besser hätte Implementieren können:

- Ich habe es nicht geschafft der Plot-Komponente eine dynamische Höhe zuzuweisen ich bin einem [Tutorial](https://dev.to/dheerajmurali/building-a-responsive-chart-in-react-with-plotly-js-4on8) gefolgt, aber nach nicht Zuweisen einer Höhe, wird immer der Default-Value (450px) initialisiert.
- Ich bin auf Probleme beim Type-casten der GeoJSON Datasets gestoßen. In dem Feature Array werden Polygone und Mulipolygone zusammengemixt und diese haben im coordinates-Attribut Arrays mit verschiedenen tiefen (LatLngTuple[][] und LatLngTuple[][][]). Ich bin auf keine besser Lösung gekommen, als diese mit den Funktionen flattenPolygon() und flattenMultiPolygon() verschieden zu behandeln.
