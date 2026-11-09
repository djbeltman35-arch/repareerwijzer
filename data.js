// Repareerwijzer — inhoud. Elke storing met een echte foutcode krijgt een eigen pagina.
// d: 1 = zelf te doen, 2 = gemiddeld, 3 = laat een specialist kijken
// taken: n = interval in teller-eenheid, m = maanden, w = bij signaal; v = vuistregel (geen fabrieksvoorschrift)

const F = (code, t, d, cause, steps) => ({ code, t, d, cause, steps });
const N = (t, d, cause, steps) => ({ code: null, t, d, cause, steps });

const CATS = [
  { id: "koffiemachines", name: "Koffiemachines", one: "koffiemachine", intro: "Espressomachines, volautomaten en padmachines: ontkalken, zetgroep, afdichtingen en de betekenis van knipperende lampjes." },
  { id: "wasmachines", name: "Wasmachines", one: "wasmachine", intro: "Alle foutcodes per merk, met wat je zelf kunt doen voordat je een monteur belt." },
  { id: "vaatwassers", name: "Vaatwassers", one: "vaatwasser", intro: "Afvoer, watertoevoer en lekbeveiliging: de foutcodes van de grote merken uitgelegd." },
  { id: "drogers", name: "Drogers", one: "droger", intro: "Filters, condensor en reservoir: de meeste drogerstoringen los je zelf op." },
  { id: "stofzuigers", name: "Stofzuigers", one: "stofzuiger", intro: "Steelstofzuigers en robotstofzuigers: filters, borstels en een pulserende motor." },
  { id: "e-bikes", name: "E-bikes", one: "e-bike", intro: "Foutcodes van de motor, onderhoud per kilometer en wat je wel en niet zelf doet." },
  { id: "3d-printers", name: "3D-printers", one: "3D-printer", intro: "Onderhoud per printuur, smering en verstoppingen voor de populairste printers." },
  { id: "tuin", name: "Robot- en grasmaaiers", one: "robotmaaier", intro: "Messen, winterbeurt en storingen van robotmaaiers en accugrasmaaiers." },
  { id: "audio", name: "Platenspelers", one: "platenspeler", intro: "Onderhoud van klassieke draaitafels die nog decennia mee kunnen." }
];

const SRC = {
  coolblueSamsung: ["Samsung – foutcodes wasmachine", "https://www.samsung.com/nl/support/home-appliances/wat-betekent-de-foutcode-op-het-display-van-mijn-wasmachine/"],
  coolblueLG: ["Coolblue – storingen LG wasmachines", "https://www.coolblue.nl/advies/lg-wasmachines-storingen.html"],
  coolblueAEG: ["Coolblue – storingen AEG wasmachines", "https://www.coolblue.nl/advies/aeg-wasmachines-storingen.html"],
  coolblueWhirl: ["Coolblue – storingen Whirlpool wasmachines", "https://www.coolblue.nl/advies/hulp-bij-de-meest-voorkomende-storingen-whirlpool-wasmachines.html"],
  beko: ["Bemmelen & Kroon – Beko wasmachine problemen", "https://www.bemmelenkroon.nl/advies/beko-wasmachine-problemen/"],
  bshWas: ["Coolblue – storingen Bosch en Siemens wasmachines", "https://www.coolblue.nl/advies/bosch-siemens-wasmachines-storingen.html"],
  bshVaat: ["Coolblue – storingen Bosch en Siemens vaatwassers", "https://www.coolblue.nl/advies/hoe-los-ik-storingen-op-van-bosch-en-siemens-vaatwassers.html"],
  siemensE15: ["Siemens – foutcode E15 vaatwasser", "https://www.siemens-home.bsh-group.com/nl/service/ondersteuning/problemen/vaatwassers/foutcode-e15"],
  mieleWas: ["Coolblue – storingen Miele wasmachines", "https://www.coolblue.nl/advies/miele-wasmachines-storingen.html"],
  mieleVaat: ["Coolblue – foutcodes Miele vaatwasser", "https://www.coolblue.nl/advies/hoe-los-je-de-foutcodes-van-een-miele-vaatwasser-op.html"],
  mieleDroog: ["Coolblue – storingen Miele droger", "https://www.coolblue.nl/advies/hoe-verhelp-je-een-miele-wasdroger-storing.html"],
  boschDroog: ["Coolblue – storingen Bosch droger", "https://www.coolblue.be/nl/advies/hoe-verhelp-je-zelf-een-bosch-droogkast-storing.html"],
  delonghi: ["Coolblue – foutmeldingen De'Longhi Dinamica en Magnifica", "https://www.coolblue.be/nl/advies/hoe-los-je-foutmeldingen-bij-de-delonghi-dinamica-en-magnifica-op.html"],
  senseo: ["Philips – knipperend lampje Senseo", "https://acc.philips.co.uk/c-t/XC000001226/the-indicator-light-of-my-senseo-coffee-machine-flashes"],
  pixie: ["iFixit – Nespresso Pixie probleemoplossing", "https://www.ifixit.com/Wiki/Nespresso_Pixie_Troubleshooting"],
  sage: ["Sage – handleiding Barista Express BES875", "https://www.sageappliances.com/content/dam/breville/ch/assets/miscellaneous/instruction-manual/espresso/BES875-instruction-manual.pdf"],
  lmCheck: ["La Marzocco – onderhoudschecklist Linea Mini", "https://lamarzocco.com/de/de/wp-content/uploads/2023/07/linea_mini_preventative_maintenance_checklist.pdf"],
  clive: ["Clive Coffee – Linea Mini reinigen", "https://support.clivecoffee.com/la-marzocco-linea-mini-group-cleaning-and-maintenance"],
  scg: ["Seattle Coffee Gear – groepsrubber vervangen", "https://www.seattlecoffeegear.com/blogs/learning-center/replacing-group-gasket-shower-screen"],
  gaggia: ["Whole Latte Love – Gaggia Classic Pro onderhoud", "https://www.wholelattelove.com/blogs/support-articles/4411065796883"],
  dyson: ["Gebruiksaanwijzing.net – Dyson pulseert", "https://www.gebruiksaanwijzing.net/huishouden/dyson-stofzuiger-pulseert/"],
  robot: ["Coolblue – onderhoud robotstofzuiger", "https://www.coolblue.nl/advies/onderhoud-robotstofzuiger.html"],
  vmBrake: ["VanMoof – remblokken vervangen S3/X3", "https://help.vanmoof.com/hc/en-us/articles/16198939351197-How-to-replace-the-brake-pads-on-the-VanMoof-S3-X3"],
  vmRadar: ["Radar – oude VanMoofs laten repareren", "https://radar.avrotros.nl/artikel/nieuwe-van-moof-fietsen-op-de-markt-kun-je-oude-modellen-ook-weer-laten-repareren-60465"],
  boschEbike: ["BikeTotaal – Bosch e-bike foutcodes", "https://www.biketotaal.nl/advies/elektrische-fietsen/foutcodes/bosch"],
  shimano: ["Holland Bikeshop – Shimano e-bike foutcodes", "https://hollandbikeshop.com/en-gb/dutch-repairs/e-bike-error-codes/shimano-e-bike-error-codes"],
  prusa: ["Prusa – regelmatig onderhoud MK4/S", "https://help.prusa3d.com/article/regular-printer-maintenance-mk4-s-mk3-9-s_419000"],
  bambuP1: ["Bambu Lab wiki – onderhoud P1P", "https://wiki.bambulab.com/en/p1/maintenance/p1p-maintenance"],
  bambuA1: ["Bambu Lab wiki – basisonderhoud A1", "https://wiki.bambulab.com/en/a1/maintenance/basic-maintenance"],
  husq: ["Husqvarna – messen Automower vervangen", "https://www.husqvarna.com/be-nl/support/husqvarna-self-service/hoe-en-wanneer-u-de-bladen-van-uw-automower-robotmaaier-moet-vervangen-ka-01722/"],
  technics: ["Albepro – revisie Technics SL-1200MK2", "https://albepro.nl/en/repair-and-maintenance-en/technics-repair-en/revision-technics-sl-1200mk2-en.html"]
};

const MODELS = [
// ───────── Koffiemachines
{ id: "sage-barista-express", brand: "Sage", name: "Barista Express (BES875)", cat: "koffiemachines", years: "2013–heden", unit: null,
  intro: "De populairste espressomachine met ingebouwde molen. Pistonhouder van 54 mm. Bijna alle klachten komen door maalgraad, kalk of een vervuilde molen.",
  weak: ["De molen loopt vast door vocht of olieachtige bonen.", "Lekken langs de pistonhouder door een verharde afdichtring in de zetgroep."],
  parts: [["Pistonhouder", "54 mm"], ["Waterfilter", "Sage-filter, eerst 5 minuten weken in koud water"], ["Reiniging", "Sage-reinigingstabletten met reinigingsschijf"], ["Ontkalker", "Sage-ontkalkingszakje op 1 liter water"]],
  tasks: [{ w: "Als CLEAN ME brandt", t: "Reinigingscyclus met tablet", s: "1-kops mandje, reinigingsschijf en 1 tablet. Machine uit, dan 1 CUP, 2 CUP en POWER 10 seconden vasthouden." },
    { m: 3, t: "Waterfilter vervangen", s: "Elke 3 maanden of 40 liter, bij zacht water tot 60 liter." },
    { w: "Bij kalk in het waterreservoir", t: "Ontkalken" }, { w: "Na elke keer melk opschuimen", t: "Stoompijpje afvegen en kort doorblazen" }],
  faults: [
    N("Koffie loopt te snel en is waterig", 1, "Maling te grof, te weinig koffie of te zacht aangedrukt.", ["Fijner malen; maalstand 8 is het startpunt.", "Gebruik 15–18 gram voor 2 kopjes.", "Druk aan met 15–20 kg; het metalen dopje van de tamper ligt dan gelijk met de rand van het mandje.", "Een shot hoort 25–35 seconden te duren."]),
    N("Koffie loopt langs de pistonhouder", 2, "Houder niet helemaal vast, vuile rand van het mandje of versleten afdichtring.", ["Draai de houder helemaal vast naar rechts.", "Veeg de rand van het mandje schoon.", "Helpt dat niet, vervang de afdichtring in de zetgroep."]),
    N("Molen draait, maar er komt geen koffie uit", 2, "Verstopping tussen de maalschijven of vocht in de maalkamer.", ["Zet de maalgraad op 1, haal de bonenbak eraf en zet de maalgraad op 16.", "Draai de moer met een 10 mm-dopsleutel met de klok mee los. Haal veer, ring en de onderste maalschijf eruit.", "Borstel de uitloop schoon. Vocht kun je drogen met een föhn.", "Zet alles terug, draai de moer tegen de klok in vast en zet de maalgraad op 5."]),
    N("FILTER SIZE-lampjes knipperen", 1, "De bonenbak zit niet goed vast.", ["Haal de bonenbak eraf, controleer op vuil en klik hem opnieuw vast."]),
    N("Machine doet ineens niets meer", 1, "De thermische beveiliging is aangesproken.", ["Zet de machine uit en haal de stekker eruit.", "Laat 30–60 minuten afkoelen.", "Blijft het probleem, neem contact op met Sage."])],
  src: ["sage"] },

{ id: "la-marzocco-linea-mini", brand: "La Marzocco", name: "Linea Mini", cat: "koffiemachines", years: "2015–heden", unit: null,
  intro: "Dubbele boiler, gebouwd als de horecamachine Linea. Er is weinig onderhoud nodig, maar het moet wel op vaste momenten gebeuren.",
  weak: ["Groepsrubber en douchezeef drogen uit; lekken langs de houder is het eerste signaal.", "Vacuümventielen en het veiligheidsventiel staan op de jaarlijkse lijst van La Marzocco."],
  parts: [["Groepsrubber en douchezeef", "Linea Mini-set; het nieuwe rubber licht invetten met voedselveilig vet"], ["Reiniging", "Biocaf of Cafiza, halve theelepel in een blind mandje"]],
  tasks: [{ m: 1.25, t: "Backflushen met reinigingsmiddel", s: "Elke 4–6 weken. Blind mandje, 5 keer 10 seconden aan en uit, daarna spoelen zonder middel." },
    { m: 3.5, t: "Groepsrubber en douchezeef vervangen", s: "Checklist van La Marzocco: elke 3–4 maanden. Bij licht thuisgebruik houden dealers vaak één keer per jaar aan." },
    { m: 6, t: "Filtermandjes en stoomventiel-revisieset vervangen" },
    { m: 12, t: "Vacuümventielen en veiligheidsventiel laten vervangen" },
    { m: 36, t: "Boiler laten controleren en zo nodig ontkalken" }],
  faults: [
    N("Water loopt langs de pistonhouder", 2, "Het groepsrubber is verhard.", ["Zet de machine uit en laat hem afkoelen.", "Draai de schroef van de douchezeef los en haal zeef en rubber eruit.", "Maak de groep schoon, vet het nieuwe rubber licht in en druk het aan.", "Zet de zeef terug en draai de verdelerschroef met de hand vast."]),
    N("Shot loopt traag, ook bij grovere maling", 1, "Douchezeef of mandje is dichtgeslibd met koffievet.", ["Backflush met reinigingsmiddel.", "Laat zeef en mandjes weken in een oplossing van Cafiza."])],
  src: ["lmCheck", "clive"] },

{ id: "e61-espressomachines", brand: "E61-groep", name: "Rocket, Profitec, ECM, Lelit", cat: "koffiemachines", years: "Alle bouwjaren", unit: null, also: "Rocket Appartamento, Profitec Pro 300/500/700, ECM Synchronika, Lelit Mara",
  intro: "De E61-zetgroep zit sinds 1961 in tientallen merken. Daardoor passen veel onderdelen op machines van verschillende merken.",
  weak: ["Het groepsrubber is er in 8 mm en 8,5 mm. Staat de hendel te ver naar rechts, neem dan de dikkere.", "De hendel van de groep gaat stroef lopen als hij niet af en toe wordt ingevet."],
  parts: [["Groepsrubber", "8 mm of 8,5 mm, met douchezeef als set"], ["Reiniging", "Cafiza of Biocaf"]],
  tasks: [{ m: 1, t: "Backflushen met reinigingsmiddel", v: 1 }, { m: 12, t: "Groepsrubber en douchezeef vervangen", v: 1, s: "Eerder als de hendel verder naar rechts komt dan eerst." }],
  faults: [N("Pistonhouder draait verder dan vroeger", 1, "Het rubber is samengedrukt en uitgehard.", ["Zet de machine uit en laat hem afkoelen.", "Wip het rubber eruit met een haakje. Richt het haakje op het rubber, niet op het metaal.", "Maak de groef schoon.", "Plaats een nieuw rubber; kies 8,5 mm als de hendel ver naar rechts stond.", "Draai een lege houder vast zodat het rubber goed zakt."])],
  src: ["scg"] },

{ id: "gaggia-classic-pro", brand: "Gaggia", name: "Classic / Classic Pro", cat: "koffiemachines", years: "1991–heden", unit: null,
  intro: "Klassieke instap-espressomachine met 58 mm-houder. Geliefd omdat bijna alles te vervangen en te upgraden is.",
  weak: ["Kalk die loskomt kan de drieweg-magneetklep blokkeren.", "Een reinigingsschijf voor het backflushen zit niet in de doos; elke 58 mm-schijf past."],
  parts: [["Pistonhouder", "58 mm"], ["Backflushschijf", "Elke 58 mm blinde schijf"]],
  tasks: [{ m: 3, t: "Ontkalken", v: 1, s: "Regelmatig, ook bij normaal hard water. Niet via de zetgroep ontkalken." }, { m: 1, t: "Backflushen met reinigingsmiddel", v: 1 }],
  faults: [N("Water komt traag of niet uit de groep na ontkalken", 2, "Losgekomen kalk blokkeert de drieweg-magneetklep.", ["Ontkalk nooit via de zetgroep; spoel ontkalker alleen via het stoom- of heetwaterpijpje.", "Is de klep verstopt, dan moet hij uit elkaar en met de hand gereinigd worden."])],
  src: ["gaggia"] },

{ id: "delonghi-magnifica", brand: "De'Longhi", name: "Magnifica S en Dinamica", cat: "koffiemachines", years: "2010–heden", unit: null, also: "ECAM 22.110, ECAM 22.360, ECAM 350.xx",
  intro: "De meest verkochte volautomaat in Nederland. De lampjes vertellen precies wat er mis is, als je weet hoe je ze moet lezen.",
  weak: ["De koffietrechter raakt verstopt bij te fijne voorgemalen koffie.", "Een uitroepteken dat blijft branden betekent dat de machine erg vuil is."],
  parts: [["Zetgroep", "Uitneembaar, wekelijks spoelen onder de kraan"]],
  tasks: [{ m: 0.25, t: "Zetgroep uitnemen en afspoelen", v: 1 }, { w: "Als het ontkalklampje knippert", t: "Ontkalken" }],
  faults: [
    N("Waterlampje knippert", 1, "Het waterreservoir is bijna leeg.", ["Vul het reservoir met vers water."]),
    N("Waterlampje brandt continu", 1, "Het reservoir zit niet goed.", ["Duw het reservoir stevig op zijn plaats."]),
    N("Koffiedikbak-lampje knippert", 1, "De koffiedikbak is vol.", ["Haal lekbak en koffiedikbak eruit, leeg ze en plaats ze terug."]),
    N("Bonen en uitroepteken knipperen allebei", 1, "De trechter voor gemalen koffie is verstopt.", ["Prik de trechter vrij met de lange borstel of de steel van een lepel.", "Maak de resten schoon."]),
    N("Uitroepteken knippert", 1, "De zetgroep is na het reinigen niet teruggeplaatst.", ["Plaats de zetgroep terug."]),
    N("Uitroepteken brandt continu", 1, "De machine is erg vuil of het onderhoud is te laat.", ["Volg de reinigingsstappen uit de handleiding."]),
    N("Ontkalklampje knippert", 1, "Ontkalken is (bijna) nodig.", ["Ontkalk de machine zo snel mogelijk om storingen te voorkomen."])],
  src: ["delonghi"] },

{ id: "philips-senseo", brand: "Philips", name: "Senseo (alle modellen)", cat: "koffiemachines", years: "2001–heden", unit: null, also: "Senseo Original, Senseo Switch, Senseo Select",
  intro: "Het padapparaat staat in miljoenen keukens. Een knipperend lampje gaat bijna altijd over water of kalk.",
  weak: ["De vlotter in het reservoir kan vastzitten.", "In een koude ruimte onder 10 °C werkt de machine niet goed."],
  parts: [["Padhouders", "1 kopje en 2 kopjes"]],
  tasks: [{ w: "Als het CALC-lampje brandt", t: "Ontkalken volgens de handleiding" }, { m: 0.25, t: "Padhouders en reservoir schoonmaken", v: 1 }],
  faults: [
    N("Lampje knippert snel", 1, "Probleem met het water.", ["Vul het reservoir tot boven het minimum.", "Plaats het reservoir goed terug.", "Controleer of de vlotter niet vastzit; maak het reservoir schoon met heet water en afwasmiddel.", "Stond de machine in de kou, laat hem dan 1–2 uur op kamertemperatuur komen."]),
    N("Lampje knippert langzaam", 1, "De machine warmt op.", ["Even wachten. Duurt het langer dan 90 seconden, neem dan contact op met Philips."]),
    N("Alle lampjes knipperen samen met CALC", 1, "De machine staat in de ontkalkstand.", ["Maak het ontkalken af; daarna stopt het knipperen."]),
    N("Kopje loopt maar half vol", 1, "Kalk in de machine.", ["Ontkalk volgens de handleiding, zonder pads.", "Spoel daarna een paar reservoirs schoon water door."])],
  src: ["senseo"] },

{ id: "nespresso-pixie", brand: "Nespresso", name: "Pixie en Essenza Mini", cat: "koffiemachines", years: "2010–heden", unit: null, also: "Krups en Magimix-uitvoeringen",
  intro: "Kleine cupmachines met twee knoppen. Knipperende knoppen en geen water hebben bijna altijd met kalk of lucht te maken.",
  weak: ["Een luchtbel in het systeem na een leeg reservoir.", "De machine blijft in de ontkalkstand hangen."],
  parts: [],
  tasks: [{ m: 3, t: "Ontkalken", v: 1 }],
  faults: [
    N("Knoppen blijven knipperen na ontkalken", 1, "De machine hangt in de ontkalkstand.", ["Houd de knipperende knoppen tot 5 seconden ingedrukt tot je een piep hoort."]),
    N("Er komt geen water uit", 1, "Luchtbel in het systeem of te weinig water.", ["Vul het reservoir minstens voor een kwart, liever voor de helft.", "Maak de inlaat onder het reservoir schoon met een vochtige doek.", "Ontkalk de machine."]),
    N("Koffie loopt heel traag", 1, "Beschadigde cup of te veel kalk.", ["Probeer een andere cup.", "Reinig en ontkalk de machine."]),
    N("Snel drie keer knipperen", 3, "Elektronische storing.", ["Neem contact op met Nespresso."])],
  src: ["pixie"] },

// ───────── Wasmachines
{ id: "samsung-wasmachine", brand: "Samsung", name: "Wasmachine (alle modellen)", cat: "wasmachines", years: "Alle bouwjaren met display", unit: null, also: "EcoBubble, AddWash, QuickDrive",
  intro: "Samsung gebruikt korte codes van cijfers en letters. Oudere modellen tonen soms de E-variant van dezelfde code, zoals E1 in plaats van 4C.",
  weak: ["Te veel wasmiddel geeft schuimstoringen.", "Een scheve of te lege trommel geeft onbalans."], parts: [],
  tasks: [{ m: 1, t: "Pompfilter schoonmaken", v: 1 }, { m: 1, t: "Trommelreiniging (Eco Drum Clean)", v: 1 }],
  faults: [
    F("4C / 4E / E1", "Probleem met de watertoevoer", 1, "Kraan niet helemaal open, geknikte slang of te lage waterdruk.", ["Draai de kraan helemaal open.", "Controleer de toevoerslang op knikken en verstoppingen.", "Controleer of de afvoerslang op de juiste hoogte hangt."]),
    F("5C / 5E / E2", "Water wordt niet afgevoerd", 1, "Verstopt filter of geknikte afvoerslang.", ["Laat het water weglopen via de noodafvoerslang.", "Controleer de afvoerslang op knikken en verstoppingen.", "De slang moet recht lopen en minstens 60 cm hoog hangen."]),
    F("dC / dE / DC1", "Deur zit niet goed dicht", 1, "Er zit wasgoed tussen of de deur is niet goed gesloten.", ["Sluit de deur helemaal en controleer of er niets tussen zit."]),
    F("UE / Ub / E4", "Trommel is uit balans", 1, "Wasgoed ongelijk verdeeld.", ["Zet de machine waterpas.", "Verdeel het wasgoed opnieuw, of voeg 2–3 handdoeken toe.", "Laat opnieuw centrifugeren."]),
    F("Sud", "Te veel schuim", 1, "Te veel wasmiddel.", ["Meestal lost dit zichzelf op.", "Draai daarna een Eco Drum Clean of een 90 °C-katoenprogramma zonder was en wasmiddel.", "Maak het pompfilter en het filter van de toevoerslang schoon."]),
    F("3C / 3E", "Probleem met de motor", 2, "Storing in motor of aansturing.", ["Zet de machine uit met de hoofdschakelaar.", "Wacht 1 minuut, zet hem aan en start een nieuw programma.", "Komt de code terug, neem contact op met Samsung."]),
    F("1C / 1E / E7", "Probleem met de waterniveausensor", 2, "Sensor geeft geen goed signaal.", ["Uitzetten, 1 minuut wachten, weer aanzetten en een nieuw programma starten.", "Blijft de code, neem contact op met Samsung."]),
    F("OE / OC / OF / E3", "Te veel water in de trommel", 1, "Vaak te veel wasmiddel.", ["Zet de machine 1 minuut uit en weer aan.", "De afvoerpomp hoort de machine dan te legen."]),
    F("HE / HC / H1", "Probleem met de watertemperatuur", 1, "Toevoerslang zit vaak op de warme kraan.", ["Sluit de toevoerslang aan op de koude kraan (meestal blauw)."]),
    F("6E / E5 / E6", "Verwarmingselement werkt niet", 3, "Defect verwarmingselement of aansturing.", ["Neem contact op met Samsung-service."]),
    F("UC", "Spanningsschommeling", 1, "De stekker zit los of de machine hangt aan een verlengsnoer.", ["Steek de stekker direct in een eigen stopcontact, zonder verlengsnoer.", "Zet de machine 1 minuut uit en start een nieuw programma."]),
    F("HEET", "Machine is te heet", 1, "Geen storing.", ["Wacht tot de machine is afgekoeld tot 55 °C; dan gaat de deur open."])],
  src: ["coolblueSamsung"] },

{ id: "lg-wasmachine", brand: "LG", name: "Wasmachine (alle modellen)", cat: "wasmachines", years: "Alle bouwjaren met display", unit: null, also: "Direct Drive, AI DD",
  intro: "LG toont codes van twee letters. De meeste los je zelf op met de kraan, de afvoer of het herverdelen van de was.",
  weak: ["Een verstopt pompfilter rechtsonder achter het klepje."], parts: [],
  tasks: [{ m: 1, t: "Pompfilter schoonmaken", v: 1 }],
  faults: [
    F("IE / 1E", "Probleem met de watertoevoer", 1, "Kraan dicht, slang geknikt of filtertje vuil.", ["Draai de kraan helemaal open.", "Maak een geknikte toevoerslang recht of vervang hem.", "Schroef de slang los, maak het filtertje schoon en schroef hem terug."]),
    F("OE", "Afvoer verstopt", 1, "Verstopt pompfilter of geknikte afvoerslang.", ["Maak knikken in de afvoerslang recht.", "Open het klepje (meestal rechtsonder), haal het pompfilter eruit en maak het schoon.", "Plaats het filter terug en test opnieuw."]),
    F("UE", "Trommel uit balans", 1, "Te weinig of ongelijk verdeeld wasgoed.", ["Voeg vergelijkbaar wasgoed toe als de trommel bijna leeg is.", "Verdeel zware stukken zoals badjassen en badmatten opnieuw."]),
    F("dE / dE1 / dE2", "Deur niet goed dicht", 1, "Er zit wasgoed tussen of het slot is defect.", ["Duw de deur dicht tot hij klikt.", "Haal wasgoed weg dat tussen de deur zit.", "Is het slot kapot, laat dan een monteur komen."]),
    F("LE", "Motor overbelast", 1, "Te veel wasgoed.", ["Haal wat was uit de trommel.", "Laat de machine 30 minuten rusten en start opnieuw."]),
    F("AE", "Lekkage gedetecteerd", 2, "Er lekt water in de machine.", ["Zet de machine uit, haal de stekker eruit en draai de kraan dicht.", "Neem contact op met LG of de winkel."]),
    F("PE", "Fout in de waterniveausensor", 2, "Toevoer niet in orde of sensorstoring.", ["Kraan dicht en stekker eruit.", "Controleer de aansluiting en maak knikken of verstoppingen in de toevoerslang vrij.", "Stekker erin en opnieuw starten."]),
    F("CL", "Kinderslot staat aan", 1, "Geen storing.", ["Houd de twee knoppen voor het kinderslot een paar seconden samen ingedrukt. Welke knoppen dat zijn verschilt per model."])],
  src: ["coolblueLG"] },

{ id: "aeg-wasmachine", brand: "AEG", name: "Wasmachine (alle modellen)", cat: "wasmachines", years: "Alle bouwjaren met display", unit: null, also: "Lavamat, ÖKOMix, 6000/7000/8000/9000-serie",
  intro: "AEG geeft codes als E10, E20 en E40. Bij modellen zonder display tel je het aantal piepjes of knipperingen: 3 keer is lekkage, 4 keer is het deurslot.",
  weak: ["Een verstopt afvoerfilter rechtsonder achter het klepje."], parts: [],
  tasks: [{ m: 1, t: "Afvoerfilter schoonmaken", v: 1 }],
  faults: [
    F("E10 / C1 / F1", "Te weinig water", 1, "Kraan, slang of filtertje.", ["Draai de kraan helemaal open en weer dicht.", "Stekker eruit, toevoerslang los en het filtertje schoonmaken.", "Slang terugzetten en op knikken controleren."]),
    F("E20 / E21 / E22 / E23 / E24 / E25 / C2 / F2", "Water wordt niet afgevoerd", 1, "Verstopt afvoerfilter of geknikte slang.", ["Maak het afvoerfilter schoon, rechtsonder achter het klepje.", "Controleer de slang op knikken.", "De afvoerslang mag niet hoger dan 1 meter hangen."]),
    F("E30 / C3", "Waterlekkage", 2, "Lekkende toevoerslang of wasgoed tussen de deur.", ["Controleer of de toevoerslang vastzit.", "Haal wasgoed weg dat tussen de deur zit.", "Zo nodig: stekker eruit, handdoek achter de machine en de machine 40 seconden licht naar achteren kantelen."]),
    F("E40 / E41 / E42 / E43 / E44 / E45", "Storing in het deurslot", 1, "Wasgoed tussen de deur, te zware lading of defect slot.", ["Haal wasgoed weg dat tussen de deur zit.", "Sluit de deur tot hij klikt en start opnieuw.", "Haal wat was eruit als de trommel te vol is.", "Is het slot kapot, laat dan een monteur komen."]),
    F("EF0 / EFO / EF3", "Afvoer, schuim, lekkage of onbalans", 1, "Meerdere mogelijke oorzaken.", ["Maak het afvoerfilter schoon.", "Bij schuim: draai een leeg programma op 60 °C.", "Controleer de toevoerslang en de deur.", "Verdeel het wasgoed opnieuw."]),
    F("EF4", "Lage waterdruk", 1, "Kraan, slang of doorstroommeter.", ["Draai de kraan helemaal open en controleer de slang.", "Maak het filtertje in de toevoerslang schoon.", "Blijft de code, laat de doorstroommeter controleren."]),
    F("EF5", "Trommel uit balans", 1, "Te kleine of te zware lading.", ["Voeg was toe als de lading klein is, haal dekbedden eruit.", "Zet de machine waterpas op een harde vloer."]),
    F("EB0 / EBO", "Spanning te laag", 2, "Probleem met het stopcontact.", ["Gebruik een geaard stopcontact zonder verlengsnoer.", "Stekker 30 seconden eruit.", "Blijft de code, bel een monteur."]),
    F("EH0 / EHO", "Probleem met de stroomvoorziening", 1, "Storing in het stroomnet.", ["Controleer of andere apparaten werken.", "Stekker een paar minuten eruit, daarna een programma kiezen en starten."]),
    F("E90", "Storing in de printplaat", 2, "Elektronica.", ["Uitzetten en de stekker een paar minuten eruit.", "Blijft de code, bel een monteur."])],
  src: ["coolblueAEG"] },

{ id: "whirlpool-wasmachine", brand: "Whirlpool", name: "Wasmachine (alle modellen)", cat: "wasmachines", years: "Alle bouwjaren met display", unit: null, also: "Supreme Care, FreshCare+",
  intro: "Whirlpool gebruikt F-codes. De codes voor watertoevoer en afvoer los je bijna altijd zelf op.",
  weak: [], parts: [],
  tasks: [{ m: 1, t: "Afvoerfilter schoonmaken", v: 1 }],
  faults: [
    F("FH / FA / E1", "Probleem met de watertoevoer", 1, "Kraan, slang of waterdruk.", ["Draai de kraan helemaal open.", "Controleer de toevoerslang op knikken en verstoppingen.", "Zet de machine uit, wacht een paar minuten en zet hem weer aan."]),
    F("F3 / F4 / F21 / FP", "Probleem met de afvoer", 1, "Verstopt filter of slang.", ["Controleer de afvoerslang.", "Vang het water op en maak het afvoerfilter schoon.", "Start opnieuw."]),
    F("F05 / E2", "Fout in de temperatuursensor", 2, "Sensorstoring.", ["Stekker 30 minuten eruit, terugsteken en opnieuw starten."]),
    F("F06 / F6", "Motor werkt niet, was blijft nat", 2, "Wasgoed blokkeert de trommel of de printplaat is defect.", ["Draai de trommel voorzichtig met de hand en haal verstrikte was weg.", "Haal wat was uit een te volle trommel.", "Blijft het probleem, dan is een monteur nodig."]),
    F("F7", "Motor haalt de snelheid niet", 1, "Te vol of transportbouten nog aanwezig.", ["Vul de trommel minder vol.", "Controleer of alle transportbouten verwijderd zijn."]),
    F("F13 / F22", "Probleem met de deur", 1, "Deur niet dicht of vuil slot.", ["Sluit de deur helemaal.", "Veeg het deurslot schoon met een vochtige doek."]),
    F("F18", "Te veel schuim", 1, "Te veel wasmiddel.", ["Leeg de trommel en draai een programma zonder wasmiddel.", "Gebruik voortaan minder wasmiddel."])],
  src: ["coolblueWhirl"] },

{ id: "beko-wasmachine", brand: "Beko", name: "Wasmachine (alle modellen)", cat: "wasmachines", years: "Alle bouwjaren met display", unit: null,
  intro: "Beko toont C- en EF-codes. Watertoevoer en afvoer los je meestal zelf op; bij motorcodes is vaak een monteur nodig.",
  weak: [], parts: [],
  tasks: [{ m: 1, t: "Pompfilter schoonmaken", v: 1 }],
  faults: [
    F("C1", "Geen of te weinig water", 1, "Kraan, slang of filters.", ["Controleer of de kraan open staat.", "Kijk of de slang niet geknikt is en de filters aan beide kanten schoon zijn.", "Test de waterdruk met een andere kraan."]),
    F("C6", "Afwijkend waterpeil", 1, "Knik in de slang of verstopte afvoer.", ["Maak knikken in de toevoerslang recht en controleer de afvoerslang.", "Maak het pompfilter schoon.", "Haal de stekker 5 minuten uit het stopcontact."]),
    F("CA", "Storing in motor of motorsturing", 2, "Overbelasting of motorfout.", ["Controleer de stekker en haal wat was uit de trommel.", "Draai een programma met lege trommel.", "Haal de stekker 30 minuten eruit. Blijft de code, bel een monteur."]),
    F("EF1 / EF20", "Water wordt niet goed afgevoerd", 1, "Verstopt pompfilter of afvoerslang.", ["Maak het pompfilter schoon.", "Controleer de afvoerslang op knikken en verstoppingen."]),
    F("EF3", "Lekkage op de bodemplaat", 2, "Er staat water in de bodem.", ["Stekker eruit en kraan dicht.", "Controleer slangen, zeepbakje en deurrubber.", "Laat de machine 24 uur drogen."])],
  src: ["beko"] },

{ id: "bosch-siemens-wasmachine", brand: "Bosch / Siemens", name: "Wasmachine (alle modellen)", cat: "wasmachines", years: "Alle bouwjaren met display", unit: null, also: "Bosch Maxx, Serie 4/6/8, Siemens iQ300/iQ500/iQ700",
  intro: "Bosch en Siemens komen uit dezelfde fabriek (BSH) en gebruiken dezelfde foutcodes. Soms staat er een F in plaats van een E.",
  weak: ["De afvoerslang hangt te hoog of is geknikt."], parts: [],
  tasks: [{ m: 2, t: "Pompfilter schoonmaken", v: 1 }],
  faults: [
    F("E18 / E6 / E25 / E26 / E30 / E36 / E80", "Probleem met de afvoer", 1, "Pomp of afvoerslang.", ["Maak het filter voor de afvoerpomp schoon.", "De afvoerslang mag maximaal 1 meter boven de machine hangen.", "Maak verstoppingen en knikken vrij en spoel de slang door."]),
    F("E17 / F17 / E11 / E12 / E29 / F29", "Probleem met de watertoevoer", 1, "Kraan, waterdruk of filterzeefje.", ["Draai de kraan open en kijk of een emmer binnen een minuut vol is.", "Kraan dicht, een programma 40 seconden laten lopen en de stekker eruit.", "Schroef de toevoerslang los en borstel het filterzeefje schoon."]),
    F("E21 / F21", "Storing in de motor", 2, "Motorfout.", ["Zet de machine uit, wacht 3 minuten en zet hem weer aan.", "Blijft de code, laat een monteur kijken."]),
    F("E16 / F16", "Wasgoed zit tussen de deur", 1, "Klem in de deur.", ["Open de deur zo mogelijk en haal het wasgoed voorzichtig weg.", "Duw de deur stevig dicht en start opnieuw."]),
    F("E32", "Trommel uit balans", 1, "Geen echte storing; knippert afwisselend met End.", ["Verdeel het wasgoed en mix grote en kleine stukken.", "Draai zo nodig een centrifugeerprogramma."]),
    F("E23 / F23 / E35", "Water in de bodemplaat", 2, "Mogelijk een lek.", ["Draai de kraan dicht en haal de stekker eruit.", "Neem direct contact op met de winkel of Bosch/Siemens."]),
    F("E10", "Automatische dosering (i-DOS) uitgeschakeld", 2, "Storing in het doseersysteem.", ["Doe wasmiddel voorlopig met de hand in het bakje.", "Neem contact op met de winkel of Bosch/Siemens."])],
  src: ["bshWas"] },

{ id: "miele-wasmachine", brand: "Miele", name: "Wasmachine (alle modellen)", cat: "wasmachines", years: "Alle bouwjaren", unit: null, also: "W1, TwinDos-modellen, oudere W-series",
  intro: "Nieuwere Miele's tonen een F-code of een tekstmelding. Oudere modellen geven een storing aan met een combinatie van lampjes.",
  weak: ["TwinDos raakt verstopt als de machine lang niet gebruikt is."], parts: [],
  tasks: [{ m: 1, t: "Afvoerfilter schoonmaken", v: 1 }],
  faults: [
    F("F63", "Te veel schuim", 1, "Te veel wasmiddel.", ["Leeg de trommel.", "Draai een katoenprogramma op 90 °C zonder wasmiddel.", "Doseer voortaan volgens het etiket."]),
    F("F220", "Storing watertoevoer", 1, "Te weinig of geen water.", ["Draai de kraan helemaal open.", "Controleer de toevoerslang op knikken en verstoppingen en vervang hem als hij beschadigd is.", "Start het programma opnieuw."]),
    F("F211 / F212 / F213 / F214", "Kortsluiting in de TwinDos-sensor", 2, "Doseersensor defect.", ["Doe wasmiddel en wasverzachter voorlopig met de hand in het bovenste bakje.", "Laat Miele de sensor controleren of vervangen."]),
    N("Storing waterafvoer", 1, "Water loopt niet weg.", ["Open het klepje onderaan de voorkant en maak het afvoerfilter schoon.", "Verwijder haarspelden en munten. Leg een handdoek klaar."]),
    N("Storing waterproof (kraansymbool)", 2, "Het beveiligingssysteem ziet een lek.", ["Draai direct de kraan dicht en haal de stekker eruit.", "Neem contact op met de winkel of Miele."])],
  src: ["mieleWas"] },

// ───────── Vaatwassers
{ id: "bosch-siemens-vaatwasser", brand: "Bosch / Siemens", name: "Vaatwasser (alle modellen)", cat: "vaatwassers", years: "Alle bouwjaren met display", unit: null, also: "Bosch SMS/SMV/SMI, Siemens SN-serie",
  intro: "De meest verkochte vaatwassers in Nederland. E24 en E15 zijn de codes die het vaakst voorkomen.",
  weak: ["Het filter onderin verstopt snel als het niet regelmatig wordt uitgespoeld."], parts: [],
  tasks: [{ m: 0.25, t: "Filter uitspoelen", v: 1 }, { m: 1, t: "Machinereiniger op het heetste programma", v: 1 }],
  faults: [
    F("E24 / E25", "Probleem met de afvoer", 1, "Knik in de slang, vuil filter of afvoerpomp.", ["Maak knikken in de afvoerslang recht.", "Maak het filter of de afvoerpomp schoon.", "Bij een nieuwe machine: haal het transportplaatje uit de sifonaansluiting."]),
    F("E22", "Filter verstopt", 1, "Vuil filter.", ["Haal het filter eruit en spoel het onder de kraan schoon met een borsteltje."]),
    F("E14 / E16 / E17 / E18 / E32", "Probleem met de watertoevoer", 1, "Kraan, druk of filter.", ["Draai de kraan helemaal open. Een emmer hoort in een minuut ongeveer 10 liter te vullen.", "Maak de toevoerslang recht en het filter schoon met een borsteltje."]),
    F("E15", "Water in de bodemplaat", 3, "Het lekbeveiligingssysteem is aangesproken.", ["Draai de kraan dicht en haal de stekker eruit.", "Probeer het niet zelf te repareren; er kan een onderdeel kapot zijn.", "Neem contact op met Bosch of Siemens."]),
    F("E09", "Mogelijk een kapot onderdeel", 3, "Vaak het verwarmingsdeel.", ["Kraan dicht, stekker eruit.", "Neem contact op met Bosch of Siemens."]),
    F("E61", "Probleem met de afvoer", 1, "Verstopte slang of sifonaansluiting.", ["Controleer de afvoerslang op verstoppingen en knikken.", "Controleer of de sifonaansluiting open is en het pompdeksel vastzit."]),
    F("E01 / E02 / E03 / E04 / E05", "Technische storing", 1, "Tijdelijke storing.", ["Zet de machine uit, wacht een paar minuten en zet hem weer aan."])],
  src: ["bshVaat", "siemensE15"] },

{ id: "miele-vaatwasser", brand: "Miele", name: "Vaatwasser (alle modellen)", cat: "vaatwassers", years: "Alle bouwjaren met display", unit: null, also: "G-serie, AutoDos-modellen",
  intro: "Miele-vaatwassers geven F-codes. F11 en F12/F13 los je zelf op; bij een aantal andere codes adviseert Miele om niet zelf te sleutelen.",
  weak: [], parts: [],
  tasks: [{ m: 0.25, t: "Filtercombinatie uitspoelen", v: 1 }],
  faults: [
    F("F11", "Probleem met de afvoer", 1, "Geknikte slang of verstopt filter.", ["Maak knikken in de afvoerslang recht.", "Maak filter, zeef en afvoer schoon."]),
    F("F12 / F13", "Probleem met de watertoevoer", 1, "Kraan, druk of inlaatzeefje.", ["Draai de kraan helemaal open.", "Test de druk: een emmer hoort in een minuut ongeveer 10 liter te vullen.", "Maak het inlaatzeefje schoon."]),
    F("F132", "Kraan dicht", 1, "Geen water.", ["Zet de vaatwasser uit en draai de kraan helemaal open."]),
    F("F33", "Deur niet goed dicht", 1, "Iets blokkeert de deur.", ["Haal vaat of vuil weg dat de deur blokkeert.", "Sluit de deur stevig en start opnieuw."]),
    F("F32 / F78", "Technische storing", 1, "Tijdelijke storing.", ["Uitzetten, een paar seconden wachten, aanzetten en het programma opnieuw kiezen."]),
    F("F601", "Storing AutoDos", 1, "PowerDisk niet goed geplaatst.", ["Controleer of de PowerDisk en de houder goed zitten.", "Zet AutoDos weer aan. Blijft de code, zet AutoDos uit en doseer met de hand."]),
    F("F10 / F18 / F24 / F40", "Andere storing", 3, "Onderdeel defect.", ["Niet zelf repareren.", "Zet de machine uit, draai de kraan dicht en neem contact op met Miele."])],
  src: ["mieleVaat"] },

// ───────── Drogers
{ id: "bosch-droger", brand: "Bosch", name: "Warmtepompdroger en condensdroger", cat: "drogers", years: "Alle bouwjaren met display", unit: null, also: "Serie 4, Serie 6, Serie 8",
  intro: "De meeste drogerstoringen komen door een vol filter of een geknikte condensafvoer.",
  weak: ["Pluis in de condensor maakt de droogtijd steeds langer."], parts: [],
  tasks: [{ w: "Na elke droogbeurt", t: "Pluizenfilter legen" }, { w: "Als Care op het display staat", t: "Condensor laten spoelen", s: "Draaiknop op katoen, strijkijzer-symbool vasthouden en een kwartslag draaien tot CP1. Daarna 1,5 liter warm water in het condensreservoir." }],
  faults: [
    F("E01 / E02", "Pluizenfilter verstopt", 1, "Vol filter.", ["Haal het filter eruit, verwijder het grove stof en spoel het onder de kraan."]),
    F("E03", "Condensafvoer geknikt of verstopt", 1, "Slang of sifon.", ["Maak knikken in de slang recht.", "Zit er geen knik in: maak de slang en de sifonaansluiting schoon."]),
    F("E06", "Storing in de verwarming", 3, "Verwarmingscircuit.", ["Laat het repareren door een monteur."]),
    F("E89", "Storing in de voeding", 2, "Elektronica.", ["Uitzetten, stekker een paar minuten eruit en opnieuw starten.", "Blijft de code, bel een monteur."])],
  src: ["boschDroog"] },

{ id: "miele-droger", brand: "Miele", name: "Droger (alle modellen)", cat: "drogers", years: "Alle bouwjaren met display", unit: null,
  intro: "Miele-drogers geven vooral meldingen over vuile filters en een vol reservoir.",
  weak: ["Het sokkelfilter onder de droger wordt vaak vergeten."], parts: [],
  tasks: [{ w: "Na elke droogbeurt", t: "Pluizenfilters legen" }, { m: 3, t: "Sokkelfilter uitspoelen en condensor stofzuigen", v: 1 }],
  faults: [
    F("F066", "Sokkelfilter reinigen", 1, "De droger is vuil.", ["Maak het pluizenfilter bij de trommel schoon.", "Spoel het sokkelfilter onder de droger uit en laat het drogen.", "Zuig de koellamellen van de condensor schoon.", "Plaats het filter terug en druk op OK."]),
    N("Giet reservoir leeg", 1, "Het condensreservoir is vol.", ["Leeg het reservoir en plaats het terug.", "Bij een afvoerslang: controleer op knikken.", "Open en sluit de deur om de melding te wissen."]),
    N("Blokkering geregistreerd of 0:00", 1, "Wasgoed zit ongelijk verdeeld.", ["Maak het wasgoed los en haal wat eruit als de trommel erg vol is.", "Zet de droger uit en aan en start een programma."])],
  src: ["mieleDroog"] },

// ───────── Stofzuigers
{ id: "dyson-v-serie", brand: "Dyson", name: "V6, V7, V8, V10, V11", cat: "stofzuigers", years: "2015–heden", unit: null,
  intro: "Een pulserende Dyson schakelt zichzelf telkens uit om de motor te beschermen. Bijna altijd is de luchtstroom ergens geblokkeerd.",
  weak: ["Een nat teruggeplaatst filter.", "Haar rond de borstelrol."],
  parts: [["Filter", "Wasbaar, alleen met koud water"]],
  tasks: [{ m: 1, t: "Filter uitspoelen en 24 uur laten drogen" }, { m: 12, t: "Filter vervangen", s: "Ook eerder als het na het wassen grijs of geel blijft." }],
  faults: [N("Stofzuiger pulseert (gaat steeds aan en uit)", 1, "Te weinig luchtstroom door filter, bak, buis of borstel.", ["Haal borstelkop, buis en hulpstukken eraf.", "Leeg de bak en spoel hem zo mogelijk; laat hem 24 uur drogen.", "Spoel het filter alleen met koud water, knijp het voorzichtig uit en laat het minstens 24 uur drogen. Nooit nat terugplaatsen.", "Schijn met een zaklamp door de buis en haal verstoppingen eruit.", "Knip haar en draad van de borstelrol.", "Test zonder buis en borstel: stopt het pulseren, dan zit de verstopping daarin.", "Zet de MAX-stand uit en test opnieuw."])],
  src: ["dyson"] },

{ id: "robotstofzuiger", brand: "Alle merken", name: "Robotstofzuigers", cat: "stofzuigers", years: "Alle bouwjaren", unit: null, also: "Roborock, iRobot Roomba, Dreame, Ecovacs, Xiaomi",
  intro: "Voor alle merken geldt hetzelfde onderhoudsschema. Een robot die verdwaalt of slechter zuigt, heeft bijna altijd vuile sensoren of een vol filter.",
  weak: ["Haar en draad in de borstels en wielen."], parts: [],
  tasks: [{ m: 0.5, t: "Filter uitkloppen", s: "Een wasbaar filter minstens 24 uur laten drogen." }, { m: 6, t: "Filter vervangen" }, { m: 6, t: "Zijborstels vervangen" }, { m: 9, t: "Hoofdborstel vervangen", s: "Elke 6–12 maanden." }, { m: 1, t: "Stofbak en waterreservoir schoonmaken", s: "Met zeepsop, daarna goed laten drogen." }],
  faults: [N("Robot verdwaalt of botst vaker", 1, "Vuile sensoren of camera.", ["Veeg sensoren, camera en de LiDAR-opening schoon met een droge microvezeldoek.", "Controleer ook de valsensoren en de laadcontacten."])],
  src: ["robot"] },

// ───────── E-bikes
{ id: "vanmoof-s3-x3", brand: "VanMoof", name: "S3 en X3", cat: "e-bikes", years: "2020–2023", unit: "km",
  intro: "Na het faillissement van 2023 is VanMoof doorgestart. Voor de SX3-generatie en nieuwer worden originele onderdelen weer gemaakt. Reparaties lopen via partnerwerkplaatsen, niet meer via VanMoof zelf.",
  weak: ["De S3 viel vaker uit dan verwacht; vooral de automatische versnelling en de elektronica zijn bekende klachtpunten.", "Veel onderdelen zijn specifiek voor VanMoof, waardoor gewone fietsenmakers er vaak niet mee kunnen werken."],
  parts: [["Remblokken", "Voor de hydraulische schijfrem van de S3/X3"]],
  tasks: [{ n: 300, t: "Ketting reinigen en smeren", v: 1, s: "Na een regenrit eerder." }, { n: 2000, t: "Remblokken controleren", v: 1 }, { m: 12, t: "Beurt bij een VanMoof-partner" }],
  faults: [N("Remmen piepen of remmen slecht", 2, "Versleten of vervuilde remblokken.", ["Controleer de dikte van de blokken.", "Vervang ze volgens de VanMoof-handleiding voor de S3/X3.", "Raak de remschijf niet aan met vette vingers."])],
  src: ["vmBrake", "vmRadar"] },

{ id: "bosch-ebike", brand: "Bosch eBike", name: "Active Line en Performance Line", cat: "e-bikes", years: "Alle generaties met display", unit: "km", also: "Gazelle, Batavus, Sparta, Cube, Riese & Müller",
  intro: "De meest gebruikte middenmotor in Nederland. Een foutcode verschijnt als getal op het display. Veel codes los je op met een herstart of door de snelheidssensor te controleren.",
  weak: ["De snelheidsmagneet op de spaak verschuift.", "Stekkers gaan los na een val of vervoer op de auto."], parts: [],
  tasks: [{ n: 300, t: "Ketting reinigen en smeren", v: 1 }, { n: 1000, t: "Snelheidsmagneet en kabels nalopen", v: 1 }, { m: 12, t: "Software-update en beurt bij een Bosch-dealer" }],
  faults: [
    F("100", "Interne fout in de aandrijfeenheid", 1, "Storing in de motor.", ["Zet het systeem uit en weer aan."]),
    F("102", "Snelheidssensor geeft geen goed signaal", 1, "Sensor of magneet.", ["Controleer sensor, magneet en de afstand ertussen."]),
    F("103", "Verbindingsprobleem met de verlichting", 1, "Kabel of aansluiting.", ["Controleer de aansluiting en de kabels van de verlichting."]),
    F("200", "Interne fout in de accu-elektronica", 1, "Storing.", ["Zet het systeem uit en weer aan."]),
    F("500", "Interne fout in de drive unit", 1, "Storing in de motor-elektronica.", ["Start het systeem opnieuw.", "Komt de code terug, ga naar een Bosch-dealer."]),
    F("503", "Probleem met de snelheidssensor", 1, "Magneet niet goed uitgelijnd.", ["Controleer of de magneet op de spaak nog vastzit.", "Lijn magneet en sensor opnieuw uit."]),
    F("530", "Accufout", 1, "Contact tussen accu en fiets.", ["Neem de accu uit en plaats hem opnieuw."]),
    F("606", "Probleem met externe accu of bekabeling", 1, "Kabel of stekker.", ["Controleer kabels, stekkers en aansluiting."]),
    F("610", "Accuspanning buiten bereik", 1, "Accu leeg of slecht contact.", ["Laad de accu volledig op.", "Controleer de contactpunten."]),
    F("640", "Interne fout in de accu", 2, "Accustoring.", ["Start het systeem opnieuw.", "Komt de code terug, ga naar een Bosch-dealer. Open de accu nooit zelf."]),
    F("770", "Probleem met de magneetring of invoersensor", 1, "Magneten.", ["Controleer de magneetring en de magneten."])],
  src: ["boschEbike"] },

{ id: "shimano-steps", brand: "Shimano", name: "STEPS E6100, E8000 en EP8", cat: "e-bikes", years: "2016–heden", unit: "km", also: "Gazelle, Batavus, Koga, Giant",
  intro: "Shimano toont waarschuwingen (W) en fouten (E). Bij een W-code werkt de ondersteuning soms beperkt, bij een E-code meestal niet.",
  weak: ["W013 als je voet op het pedaal staat bij het aanzetten.", "Firmware die niet past bij de geplaatste onderdelen."], parts: [],
  tasks: [{ n: 300, t: "Ketting reinigen en smeren", v: 1 }, { m: 12, t: "Firmware bijwerken via E-TUBE PROJECT of de dealer" }],
  faults: [
    F("W010", "Motor is te warm", 1, "Lange klim of hoge belasting.", ["Fiets zonder ondersteuning tot de motor is afgekoeld."]),
    F("W011 / W101", "Snelheid wordt niet gemeten", 2, "Sensor of magneet op de remschijf.", ["Laat de dealer de positie van de snelheidssensor en de magneet controleren."]),
    F("W013 / W103", "Koppelsensor niet goed opgestart", 1, "Voet stond op het pedaal bij het aanzetten.", ["Haal je voet van het pedaal.", "Zet de accu uit en weer aan met de knop."]),
    F("W020 / W200", "Accu buiten temperatuurbereik", 1, "Te warm of te koud.", ["Laat de accu in de schaduw afkoelen of binnen opwarmen."]),
    F("E010", "Systeemfout", 1, "Tijdelijke storing.", ["Start opnieuw met de aan-knop.", "Komt de code terug, ga naar de dealer."]),
    F("E013 / E034", "Afwijking in de firmware van de motor", 3, "Firmware.", ["Neem contact op met je dealer."]),
    F("E014 / E050", "Snelheidssensor mogelijk verkeerd gemonteerd", 3, "Montage.", ["Neem contact op met je dealer."]),
    F("E020", "Communicatiefout tussen accu en motor", 1, "Kabel zit los.", ["Controleer of de kabel tussen accu en motor goed vastzit."]),
    F("E033", "Firmware niet compatibel", 2, "Onderdelen met verschillende firmware.", ["Werk alle onderdelen bij via E-TUBE PROJECT of laat de dealer dat doen."])],
  src: ["shimano"] },

// ───────── 3D-printers
{ id: "prusa-mk4", brand: "Prusa", name: "Original Prusa MK4, MK4S en MK3.9", cat: "3d-printers", years: "2023–heden", unit: "uur",
  intro: "Prusa geeft het onderhoud in printuren. Met de teller zie je wanneer de geleidestangen en de elektronica aan de beurt zijn.",
  weak: ["De duimschroeven van de heatbreak lopen los, waardoor het mondstuk speling krijgt.", "Filamentresten bij het hoofdtandwiel van de Nextruder."],
  parts: [["Smeermiddel", "Prusa Lubricant, alleen op de gladde stangen"], ["Printplaat", "Aceton alleen op de Smooth-plaat, nooit op Textured, Satin of PA Nylon"]],
  tasks: [{ w: "Voor elke print", t: "Printer stofvrij maken en het mondstuk op 250 °C borstelen" }, { n: 200, t: "Gladde stangen reinigen en smeren", s: "Controleer ook de riemen: ze moeten klinken als een lage basnoot." }, { n: 200, t: "Poelies en ventilatoren schoonmaken" }, { n: 700, t: "Connectoren van de elektronica nalopen", s: "Elke 600–800 uur. Stroom eraf." }],
  faults: [N("Onderextrusie: dunne of ontbrekende lagen", 1, "Vuil mondstuk of filamentresten bij het tandwiel.", ["Verwarm het mondstuk 3–5 minuten op 250 °C en borstel het met een messing borsteltje.", "Til de idler-moer op en maak het tandwiel schoon via de opening aan de zijkant.", "Open de gearbox niet, tenzij Prusa-support daarom vraagt."]),
    N("Mondstuk heeft speling", 1, "Duimschroeven losgelopen.", ["Printer koud en uit.", "Draai de duimschroeven met de hand vast, zonder gereedschap."])],
  src: ["prusa"] },

{ id: "bambu-lab-p1s", brand: "Bambu Lab", name: "P1P en P1S", cat: "3d-printers", years: "2023–heden", unit: null,
  intro: "Snelle CoreXY-printer met koolstofstangen op de X-as. Die stangen mogen nooit worden ingevet.",
  weak: ["Het snijmesje voor filament wordt bot, vooral bij koolstofvezel.", "De Z-spindels verzamelen stof en plastic."],
  parts: [["Vet voor Z-spindels", "Bambu BX-300 of Super Lube 92003"], ["Olie voor Y/Z-stangen", "Super Lube 52004"], ["Koolstofstangen X", "Alleen isopropylalcohol, geen vet"]],
  tasks: [{ w: "Voor elke print", t: "Mondstukwisser controleren" }, { m: 0.25, t: "Ventilatoren schoonblazen" }, { m: 1, t: "Koolstof- en geleidestangen reinigen" }, { m: 3, t: "Z-spindels reinigen en invetten" }, { m: 3, t: "Y- en Z-stangen dun oliën tegen roest" }, { w: "Elke 3–5 rollen", t: "Snijmesje controleren", s: "Bij PA-CF of PA-GF elke 1–2 rollen." }],
  faults: [N("Onderextrusie of gaten in de print", 1, "Vuil mondstuk.", ["Reinig het mondstuk op 200 °C.", "Doe een cold pull."]), N("Piepend geluid bij bewegen", 1, "Spanrol droog.", ["Een klein beetje Super Lube 52004 tussen flens en houder.", "Geen piep? Dan niets doen. Riemen nooit invetten."])],
  src: ["bambuP1"] },

{ id: "bambu-lab-a1", brand: "Bambu Lab", name: "A1", cat: "3d-printers", years: "2024–heden", unit: null,
  intro: "Bed-slinger met open frame. Belangrijk verschil met de P1: op de X-rail hoort olie, nooit vet.",
  weak: ["Stof op de rails door het open frame.", "PTFE-buisje slijt sneller bij koolstofvezel-filament."],
  parts: [["Olie", "X-rail, Y-rail en spanrollen"], ["Vet", "Spindels en extruderwielen, nooit op de X-rail"]],
  tasks: [{ m: 0.25, t: "Ventilatoren en luchtkanalen stofvrij maken" }, { m: 1, t: "X- en Y-rail reinigen en oliën" }, { m: 1, t: "Hotend reinigen met alcohol" }, { m: 3, t: "Spindels invetten en spanrollen oliën" }, { w: "Elke 3 rollen", t: "Snijmesje controleren" }, { w: "Elke 6 rollen", t: "PTFE-buisje controleren", s: "Bij koolstofvezel elke 2 rollen." }],
  faults: [N("Onderextrusie of verstopping", 1, "Vuile extruder.", ["Reinig de extruder.", "Controleer het PTFE-buisje op slijtage."])],
  src: ["bambuA1"] },

{ id: "creality-ender-3", brand: "Creality", name: "Ender 3 en Ender 3 Pro", cat: "3d-printers", years: "2018–2022", unit: null,
  intro: "Goedkope instapprinter met een enorme gemeenschap. Bijna elk onderdeel is los te koop en te upgraden.",
  weak: ["De plastic extruderarm kan scheuren; een metalen arm is een goedkope upgrade.", "Vroege exemplaren hadden firmware zonder beveiliging tegen oververhitting. Controleer je firmware.", "Een spleetje tussen Bowden-buis en mondstuk veroorzaakt verstoppingen."],
  parts: [["Mondstuk", "MK8, 0,4 mm"], ["Bowden-buis", "PTFE, 4 mm buitendiameter"]],
  tasks: [{ w: "Voor elke print", t: "Bed nivelleren met een papiertje" }, { m: 3, t: "Riemspanning en wielen controleren", v: 1 }, { m: 6, t: "Mondstuk en Bowden-buis controleren", v: 1 }],
  faults: [N("Filament komt er niet uit", 2, "Spleet tussen Bowden-buis en mondstuk.", ["Maak het mondstuk heet en draai het los.", "Snij de Bowden-buis haaks af en duw hem door tot op het mondstuk.", "Draai het mondstuk warm weer vast."])],
  src: [] },

// ───────── Tuin
{ id: "husqvarna-automower", brand: "Husqvarna", name: "Automower (alle series)", cat: "tuin", years: "Alle bouwjaren", unit: null,
  intro: "De messen zijn het belangrijkste onderhoud. Ze draaien bewust vrij om hun schroef zodat ze wegdraaien bij een obstakel; dat is geen defect.",
  weak: ["Rafelige, witte grassprieten betekenen botte messen.", "Losgelopen messen als oude schroeven opnieuw worden gebruikt."],
  parts: [["Messen", "Origineel Husqvarna, altijd met nieuwe schroeven"], ["Gereedschap", "Magnetische schroevendraaier en handschoenen"]],
  tasks: [{ m: 1, t: "Messen hoofdschijf vervangen", s: "Gemiddeld elke 3–6 weken; eerder bij zand, obstakels of veel groei." }, { m: 2.5, t: "EdgeCut-messen vervangen", s: "Elke 9–12 weken." }, { w: "Voor de winter", t: "Schoonmaken en binnen opslaan" }],
  faults: [N("Grassprieten zijn wit of gerafeld", 1, "Botte messen.", ["Trek handschoenen aan en zet de maaier uit.", "Leg hem ondersteboven op een zachte ondergrond.", "Draai de schijf tot de opening boven de schroef staat.", "Vervang alle messen tegelijk, elk met een nieuwe schroef. Combineer geen oude en nieuwe messen.", "Controleer of elk mes vrij draait."])],
  src: ["husq"] },

// ───────── Audio
{ id: "technics-sl-1200mk2", brand: "Technics", name: "SL-1200MK2 en SL-1210MK2", cat: "audio", years: "1979–2010", unit: null,
  intro: "De direct-drive draaitafel die decennia meegaat. Na veel jaren slijten vooral de toonarm en de hoogteverstelling.",
  weak: ["Speling in de lagers van de toonarm, waardoor de naald overslaat en de anti-skating niet goed is in te stellen.", "Corrosie op de headshell-aansluiting, waardoor het signaal wegvalt.", "Een vervormde S-vormige toonarmbuis."],
  parts: [["Toonarm", "Los leverbaar als vervanging"], ["Signaalkabel", "Tulpkabel, vaak meteen vervangen bij revisie"]],
  tasks: [{ m: 12, t: "Headshell-contacten reinigen", v: 1 }, { w: "Bij overslaan of brom", t: "Toonarm en signaalkabel laten nakijken" }],
  faults: [N("Naald slaat over", 3, "Speling in de toonarmlagers.", ["Laat de toonarm en de hoogteverstelling reviseren door een specialist."]), N("Signaal valt weg of kraakt", 2, "Corrosie op de headshell-aansluiting of een slechte soldeerverbinding.", ["Reinig de contacten van de headshell.", "Helpt dat niet, laat de bedrading van de toonarm opnieuw solderen."])],
  src: ["technics"] }
];

Object.assign(SRC, {
  haierWas: ["Coolblue – storingen Haier wasmachines", "https://www.coolblue.nl/advies/de-meest-voorkomende-storingen-van-haier-wasmachines.html"],
  indesitWas: ["Coolblue – storingen Indesit wasmachines", "https://www.coolblue.nl/advies/indesit-wasmachines-storingen.html"],
  zanussiWas: ["Coolblue – storingen Zanussi wasmachines", "https://www.coolblue.nl/advies/de-meest-voorkomende-storingen-van-zanussi-wasmachines.html"],
  wisbergWas: ["Coolblue – storingen Wisberg wasmachine", "https://www.coolblue.nl/advies/hoe-los-je-een-wisberg-wasmachine-storing-op.html"],
  whirlVaat: ["Coolblue – foutcodes Whirlpool vaatwasser", "https://www.coolblue.nl/advies/hoe-los-je-de-foutcodes-van-een-whirlpool-vaatwasser-op.html"],
  aegVaat: ["Coolblue – foutcodes AEG vaatwasser", "https://www.coolblue.nl/advies/hoe-los-je-de-foutcodes-van-een-aeg-vaatwasser-op-.html"],
  etnaVaat: ["Coolblue – foutcodes Etna vaatwasser", "https://coolblue.be/en/advice/how-do-you-solve-the-error-codes-of-an-etna-dishwasher.html"],
  atagVaat: ["Coolblue – foutcodes Atag vaatwasser", "https://coolblue.be/en/advice/how-do-you-solve-the-error-codes-of-an-atag-dishwasher.html"],
  bauknechtVaat: ["Coolblue – foutcodes Bauknecht vaatwasser", "https://www.coolblue.de/en/advice/how-do-you-solve-errors-on-your-bauknecht-dishwasher.html"],
  aegDroog: ["Coolblue – storingen AEG droger", "https://www.coolblue.nl/advies/de-meest-voorkomende-storingen-van-aeg-wasdrogers.html"],
  siemensDroog: ["Coolblue – storingen Siemens droger", "https://www.coolblue.nl/advies/hoe-verhelp-je-zelf-een-siemens-wasdroger-storing.html"],
  whirlDroog: ["Coolblue – storingen Whirlpool droger", "https://www.coolblue.nl/advies/hoe-verhelp-je-zelf-een-whirlpool-wasdroger-storing.html"],
  samsungDroog: ["Coolblue – storingen Samsung droger", "https://www.coolblue.nl/advies/hoe-los-ik-storingen-van-samsung-wasdrogers-op.html"],
  zanussiDroog: ["Coolblue – storingen Zanussi droger", "https://www.coolblue.nl/advies/hoe-verhelp-je-een-storing-zanussi-wasdroger.html"],
  haierDroog: ["Coolblue – storingen Haier droger", "https://www.coolblue.nl/advies/hoe-verhelp-je-een-haier-wasdroger-storing.html"],
  jura: ["Coolblue – foutcodes en meldingen JURA", "https://www.coolblue.nl/advies/hoe-los-je-foutcodes-en-meldingen-bij-jura-koffiemachines-op.html"],
  siemensEQ: ["Coolblue – foutmeldingen Siemens koffiemachines", "https://www.coolblue.be/nl/advies/hoe-los-je-foutmeldingen-bij-siemens-koffiemachines-op.html"],
  siemensEQ3: ["Siemens – displaymeldingen EQ.3", "https://www.siemens-home.bsh-group.com/nl/service/ondersteuning/problemen/koffiemachines/eq3/displaymeldingen"],
  bafang: ["BikeTotaal – Bafang foutcodes", "https://www.biketotaal.nl/advies/elektrische-fietsen/foutcodes/bafang"],
  bambuX1: ["Bambu Lab wiki – basisonderhoud X1", "https://wiki.bambulab.com/en/x1/maintenance/basic-maintenance"],
  prusaMK3: ["Prusa – onderhoud i3-printers (MK3S/MK3S+)", "https://help.prusa3d.com/article/regular-printer-maintenance_2072"],
  worx: ["Worx wiki – Landroid Vision foutmeldingen", "https://wiki.worx.com/en/errors-and-functional-messages"]
});

const FILTER_TASK = [{ m: 1, t: "Afvoer- of pompfilter schoonmaken", v: 1 }];
const DRYER_TASKS = [{ w: "Na elke droogbeurt", t: "Pluizenfilter legen" }, { m: 3, t: "Condensor schoonmaken", v: 1, s: "Warmtepompdroger: met een stofzuigerborstel. Condensdroger: uitnemen en afspoelen." }];
const DISH_TASKS = [{ m: 0.25, t: "Filters uitspoelen", v: 1 }, { w: "Als het lampje brandt", t: "Zout en glansspoelmiddel bijvullen" }];
const tech = ["Probeer het niet zelf te repareren.", "Zet het apparaat uit en neem contact op met de fabrikant of een monteur."];

MODELS.push(
// Wasmachines
{ id: "haier-wasmachine", brand: "Haier", name: "Wasmachine (alle modellen)", cat: "wasmachines", years: "Alle bouwjaren met display", unit: null,
  intro: "Haier gebruikt E-codes voor dingen die je zelf oplost en F-codes voor storingen waarvoor een monteur nodig is.", weak: [], parts: [], tasks: FILTER_TASK,
  faults: [
    F("E1 / FB / CLR FLTR", "Water wordt niet goed afgevoerd", 1, "Verstopt filter of geknikte slang.", ["Laat het water weglopen via het rubberen slangetje.", "Maak het filter schoon onder de kraan en plaats het terug.", "Controleer de afvoerslang op knikken."]),
    F("E2", "Storing aan de deur", 1, "Deur niet dicht, wasgoed ertussen of kinderslot.", ["Sluit de deur helemaal en haal wasgoed weg dat ertussen zit.", "Haal wat was eruit als de trommel te vol is.", "Controleer het kinderslot."]),
    F("E4", "Te weinig water", 1, "Kraan of toevoerslang.", ["Draai de kraan helemaal open.", "Controleer de toevoerslang op verstoppingen en knikken."]),
    F("E12", "Water wordt niet afgevoerd", 1, "Slang te diep, lus of knik, of vuil filter.", ["De afvoerslang mag niet te diep in de afvoer zitten.", "Haal lussen en knikken uit de slang.", "Maak het afvoerfilter onderaan schoon."]),
    F("CLRF", "Te veel schuim", 1, "Te veel of verkeerd wasmiddel.", ["Spoel het schuim weg, vul opnieuw en start opnieuw.", "Doe geen extra wasmiddel."]),
    F("Unb", "Trommel uit balans", 1, "Ongelijk verdeelde lading.", ["Haal wat was eruit of verdeel de lading gelijkmatig en start opnieuw."]),
    F("F3", "Fout in de temperatuursensor", 3, "Sensor defect.", tech),
    F("F4", "Storing in de verwarming", 3, "Verwarming defect.", tech),
    F("F7", "Storing in de motor", 3, "Motor defect.", tech),
    F("FA", "Fout in de waterniveausensor", 3, "Sensor defect.", tech),
    F("FC / FC0 / FC1 / FC2", "Communicatiefout", 3, "Elektronica.", tech)],
  src: ["haierWas"] },

{ id: "indesit-wasmachine", brand: "Indesit", name: "Wasmachine (alle modellen)", cat: "wasmachines", years: "Alle bouwjaren met display", unit: null,
  intro: "Indesit toont F-codes. Bij modellen zonder display geeft een combinatie van lampjes de storing aan.", weak: [], parts: [], tasks: FILTER_TASK,
  faults: [
    F("F01", "Machine start niet", 1, "Tijdelijke storing.", ["Zet de machine uit en haal de stekker 2 minuten eruit.", "Stekker terug, 30 seconden wachten en aanzetten."]),
    F("F02", "Probleem met de trommelaandrijving", 3, "Aandrijving.", ["Zet de machine direct uit.", "Neem contact op met Indesit; niet zelf repareren."]),
    F("F05 / F11", "Water wordt niet afgevoerd", 1, "Verstopt filter of slang.", ["Leg een handdoek of bak klaar en open het klepje voor het filter.", "Draai het filter langzaam los en laat het water weglopen.", "Haal speldjes, munten of knopen eruit, maak het filter schoon en plaats het terug.", "Haal knikken uit de slang."]),
    F("F06", "Deur niet goed dicht", 1, "Wasgoed tussen deur en rubber.", ["Haal het wasgoed weg en sluit de deur stevig.", "Gaat de deur niet open: houd de aan/uit-knop ingedrukt tot rES verschijnt."]),
    F("F08", "Machine moet gereset worden", 1, "Storing.", ["Uitzetten, stekker eruit, 5 minuten wachten en weer aanzetten."])],
  src: ["indesitWas"] },

{ id: "zanussi-wasmachine", brand: "Zanussi", name: "Wasmachine (alle modellen)", cat: "wasmachines", years: "Alle bouwjaren met display", unit: null,
  intro: "Zanussi hoort bij dezelfde groep als AEG en gebruikt vergelijkbare codes. Zonder display zie je de storing aan een combinatie van lampjes.", weak: [], parts: [], tasks: FILTER_TASK,
  faults: [
    F("E10 / C1", "Probleem met de watertoevoer", 1, "Kraan of slang.", ["Controleer de wateraansluiting.", "Haal knikken en verstoppingen uit de slangen en start opnieuw."]),
    F("E20 / C2", "Probleem met de afvoer", 1, "Slang of pomp.", ["De afvoerslang mag maximaal 10 cm in de afvoer steken.", "Maak de afvoerpomp en de afvoer schoon."]),
    F("E40", "Storing aan de deur", 1, "Deur niet dicht of te vol.", ["Sluit de deur helemaal en haal wasgoed weg dat ertussen zit.", "Haal wat was eruit en controleer het kinderslot."]),
    F("EF0 / EFO / EF3", "Interne lekkage, water onder de trommel", 2, "Lek.", ["Stekker eruit en de waterslang los.", "Kantel de machine licht naar achteren zodat het water wegloopt.", "Sluit weer aan en haal kleding of veters uit het deurrubber."]),
    F("EB0 / EBO", "Te weinig stroom", 1, "Stopcontact.", ["Probeer een ander, geaard stopcontact.", "Haal de stekker minstens 30 seconden eruit."])],
  src: ["zanussiWas"] },

{ id: "wisberg-wasmachine", brand: "Wisberg", name: "Wasmachine (alle modellen)", cat: "wasmachines", years: "Alle bouwjaren", unit: null,
  intro: "Het huismerk van Coolblue. Toevoer, afvoer en deur los je zelf op; voor de overige codes is een monteur nodig.", weak: [], parts: [], tasks: FILTER_TASK,
  faults: [
    F("E10", "Probleem met de watertoevoer", 1, "Kraan of filter in de slang.", ["Draai de kraan open en dicht en haal de stekker eruit.", "Maak het filter van de toevoerslang schoon.", "Controleer de slang op knikken, sluit aan en draai de kraan helemaal open."]),
    F("E12 / E21", "Probleem met de afvoer", 1, "Vuil filter of slang.", ["Open het klepje rechtsonder, haal het filter eruit en maak filter en behuizing schoon.", "Controleer de afvoerslang; maximaal 1 meter boven de machine."]),
    F("E30", "Deur niet goed dicht", 1, "Kleding tussen de deur of defect slot.", ["Haal kleding weg en duw de deur dicht tot hij klikt.", "Lukt dat niet, dan is het slot mogelijk kapot: monteur."]),
    F("E33", "Fout in de waterniveausensor", 3, "Sensor.", tech),
    F("E36", "Storing in de verwarming", 3, "Verwarming.", tech),
    F("E37 / E38", "Fout in de temperatuursensor", 3, "Sensor.", tech),
    F("E50 / E61 / E62 / E64", "Storing in de printplaat", 3, "Elektronica.", tech),
    F("E60", "Motor draait niet", 3, "Motor.", tech),
    F("E80", "Communicatiefout", 3, "Elektronica.", tech)],
  src: ["wisbergWas"] },

// Vaatwassers
{ id: "aeg-vaatwasser", brand: "AEG", name: "Vaatwasser (alle modellen)", cat: "vaatwassers", years: "Alle bouwjaren met display", unit: null, also: "Ook Electrolux-groep",
  intro: "AEG-vaatwassers tonen codes die met een i beginnen, zoals i10 en i20.", weak: [], parts: [], tasks: DISH_TASKS,
  faults: [
    F("i10 / i11", "Geen water", 1, "Kraan, druk of slangen.", ["Draai de kraan helemaal open. Een emmer hoort in een minuut ongeveer 10 liter te vullen.", "Controleer toevoer- en afvoerslang op knikken.", "Komt er nog geen water, schakel dan een loodgieter in."]),
    F("i20", "Water wordt niet afgevoerd", 1, "Verstopte afvoer of filter.", ["Maak de afvoer van de gootsteen vrij.", "Maak de filters schoon en controleer de afvoerslang op knikken."]),
    F("i30", "Waterbeveiliging is actief", 2, "Lek of verkeerde installatie.", ["Draai de kraan dicht en zet de vaatwasser uit.", "Controleer de installatie en laad de korven zoals de handleiding aangeeft."]),
    F("i41 / i44", "Waterniveau niet goed meetbaar", 1, "Vuile filters.", ["Zet uit, maak de filters grondig schoon en zet weer aan."]),
    F("i51–i59 / i5A–i5F", "Probleem met de motor", 1, "Bijvoorbeeld een glasscherf of cocktailprikker.", ["Zet uit en controleer de filters.", "Haal vastzittende voorwerpen weg en zet weer aan."]),
    F("iC0 / iC3", "Technische storing", 1, "Tijdelijke storing.", ["Uitzetten, een paar seconden wachten, aanzetten."]),
    F("iF1", "Waterniveau te hoog", 1, "Filters of slangen.", ["Zet uit en maak de filters schoon.", "Controleer de slangen en sluit ze aan volgens de handleiding."]),
    F("i61 / i69 / i70 / i80 / i90", "Mogelijk een kapot onderdeel", 3, "Onderdeel defect.", tech)],
  src: ["aegVaat"] },

{ id: "whirlpool-vaatwasser", brand: "Whirlpool", name: "Vaatwasser (alle modellen)", cat: "vaatwassers", years: "Alle bouwjaren met display", unit: null,
  intro: "Whirlpool-vaatwassers geven korte cijfercodes of een letter.", weak: [], parts: [], tasks: DISH_TASKS,
  faults: [
    F("3", "Afvoerprobleem, programma niet klaar", 1, "Geknikte slang of vuil filter.", ["Wacht tot het programma klaar is.", "Controleer de afvoerslang op knikken, maak de afvoer van de gootsteen schoon en reinig het filter."]),
    F("H / 6", "Geen water", 1, "Kraan, slang of zeefje.", ["Controleer of de kraan open staat en werkt.", "Haal knikken uit de toevoerslang en maak het zeefje schoon.", "Zet uit, wacht een paar seconden en start een nieuw programma."]),
    F("9 / 12", "Vaatwasser start niet of reageert niet", 1, "Storing.", ["Houd de aan/uit-knop ingedrukt, zet na een minuut weer aan en start een nieuw programma.", "Blijft de code, haal dan de stekker een minuut eruit."]),
    F("15", "Programma stopt te vroeg", 1, "Afvoerslang te laag of lucht in de toevoer.", ["Controleer of het einde van de afvoerslang op de hoogte uit de handleiding zit.", "Controleer de toevoer op lekken en sluit hem goed aan."])],
  src: ["whirlVaat"] },

{ id: "bauknecht-vaatwasser", brand: "Bauknecht", name: "Vaatwasser (alle modellen)", cat: "vaatwassers", years: "Alle bouwjaren met display", unit: null,
  intro: "Bauknecht hoort bij Whirlpool. De codes gaan vooral over afvoer, sproeiarmen en watertoevoer.", weak: [], parts: [], tasks: DISH_TASKS,
  faults: [
    F("E1 / F4", "Water wordt niet afgevoerd", 1, "Vuil filter.", ["Maak het filter of de zeef schoon."]),
    F("F5", "Sproeiarm geblokkeerd", 1, "Een hoog bord of glas houdt de arm tegen.", ["Controleer of de sproeiarm vrij kan draaien en haal blokkades weg."]),
    F("F6", "Probleem met de watertoevoer", 1, "Slang, filter of Aquastop.", ["Controleer de toevoerslang op knikken en maak het filter erin schoon.", "Reset en start opnieuw. Een kapotte Aquastop kan de oorzaak zijn."]),
    F("F9 / F12", "Storing", 1, "Tijdelijke storing.", ["Zet uit, wacht een minuut en start opnieuw.", "Blijft de code, haal de stekker een minuut eruit."]),
    F("F15", "Programma stopt te vroeg", 1, "Afvoerslang te laag of lucht in de toevoer.", ["Controleer de hoogte van de afvoerslang en de aansluiting.", "Controleer de watertoevoer op lekken."])],
  src: ["bauknechtVaat"] },

{ id: "etna-vaatwasser", brand: "Etna", name: "Vaatwasser (alle modellen)", cat: "vaatwassers", years: "Alle bouwjaren met display", unit: null,
  intro: "Etna-vaatwassers gebruiken E- en F-codes. Bij een aantal codes adviseert Etna om niet zelf te sleutelen.", weak: [], parts: [], tasks: DISH_TASKS,
  faults: [
    F("E1 / F12 / E67 / FF", "Te weinig of geen water", 1, "Kraan of slang.", ["Draai de kraan helemaal open en test de druk: 10 liter in 1 minuut.", "Controleer de toevoerslang en haal knikken eruit."]),
    F("F2", "Water wordt niet goed afgevoerd", 1, "Afvoerslang verkeerd aangesloten.", ["Sluit de afvoerslang aan volgens de handleiding en start het programma opnieuw."]),
    F("F10", "Afvoerpomp geblokkeerd", 2, "Iets blokkeert het pompwieltje.", ["Stekker eruit, beide filters eruit en zo nodig water wegscheppen.", "Haal het gekleurde dopje rechts in de afvoer eruit en draai het pompwieltje erachter rond.", "Dopje en filters terug en weer aansluiten."]),
    F("F11", "Water wordt niet weggepompt", 1, "Verstopte afvoerslang.", ["Maak de slang los en haal vuil en knikken eruit.", "Maak de filters schoon onder de kraan met een borsteltje."]),
    F("E3 / E8 / F40 / F52 / F54 / F56", "Waarschijnlijk een kapot onderdeel", 3, "Onderdeel defect.", ["Niet zelf repareren.", "Kraan dicht, stekker eruit en contact opnemen met Etna."])],
  src: ["etnaVaat"] },

{ id: "atag-vaatwasser", brand: "ATAG", name: "Vaatwasser (alle modellen)", cat: "vaatwassers", years: "Alle bouwjaren met display", unit: null,
  intro: "Atag en Etna komen uit dezelfde groep en gebruiken vergelijkbare F-codes.", weak: [], parts: [], tasks: DISH_TASKS,
  faults: [
    F("F10", "Afvoerpomp geblokkeerd", 2, "Iets blokkeert het pompwieltje.", ["Stekker eruit, beide filters eruit en zo nodig water wegscheppen.", "Haal het gekleurde dopje rechts in de afvoer eruit en draai het pompwieltje erachter rond.", "Hoor je daarna een zoemend geluid, draai dan de kraan dicht, stekker eruit en neem contact op met Atag."]),
    F("F11", "Water wordt niet weggepompt", 1, "Verstopte afvoerslang.", ["Maak de afvoerslang los van de sifon, haal vuil en knikken eruit en sluit hem goed aan.", "Blijft de code, maak de filters schoon."]),
    F("F12 / F67", "Probleem met de watertoevoer", 1, "Kraan of druk.", ["Controleer of de kraan open staat.", "Test de druk: een emmer hoort in 1 minuut ongeveer 10 liter te vullen."]),
    F("F52", "Filters verstopt", 1, "Vuile filters.", ["Haal de filters eruit en spoel ze onder de kraan met een borsteltje."]),
    F("F40 / F54 / F56", "Kapot onderdeel", 3, "Onderdeel defect.", ["Niet zelf repareren.", "Kraan dicht, stekker eruit en contact opnemen met Atag."])],
  src: ["atagVaat"] },

// Drogers
{ id: "aeg-droger", brand: "AEG", name: "Droger (alle modellen)", cat: "drogers", years: "Alle bouwjaren met display", unit: null,
  intro: "AEG-drogers tonen C- en E-codes. Veel meldingen verdwijnen na het schoonmaken van filter en condensor.", weak: [], parts: [], tasks: DRYER_TASKS,
  faults: [
    F("C2 / E20", "Probleem met de waterafvoer", 1, "Afvoerslang.", ["Controleer of de afvoerslang goed aan droger en afvoer vastzit.", "Haal knikken en grote lussen eruit."]),
    F("C6", "Probleem met de vochtsensor", 2, "Geen geaard stopcontact of vuil filter.", ["Gebruik een geaard stopcontact.", "Maak pluizenfilter en condensor schoon.", "Blijft het, bel een monteur."]),
    F("C8", "Probleem met de temperatuursensor", 3, "Sensor.", tech),
    F("CD", "Deur sluit niet goed", 1, "Wasgoed tussen de deur.", ["Duw de deur dicht tot hij klikt.", "Stekker 30 seconden eruit en het programma opnieuw starten."]),
    F("E40", "Deur niet dicht of verkeerde groep", 1, "Deur of stroomgroep.", ["Sluit de deur tot hij klikt en start opnieuw.", "Heb je zonnepanelen, sluit de droger dan aan op een andere groep."]),
    F("E60", "Droger verwarmt niet goed", 1, "Vuil filter of condensor, slechte ventilatie.", ["Spoel het pluizenfilter uit en maak de condensor schoon.", "Zorg voor ventilatie, bijvoorbeeld een open raam."]),
    F("EH0 / EHO", "Geen stroom", 1, "Stekker of stopcontact.", ["Controleer de stekker en test het stopcontact met een ander apparaat."])],
  src: ["aegDroog"] },

{ id: "siemens-droger", brand: "Siemens", name: "Droger (alle modellen)", cat: "drogers", years: "Alle bouwjaren met display", unit: null, also: "iQ300, iQ500, iQ700",
  intro: "Siemens-drogers gebruiken dezelfde codes als Bosch. E01 en E02 zie je het vaakst.", weak: [], parts: [], tasks: DRYER_TASKS,
  faults: [
    F("E01 / E02", "Pluizenfilter vol", 1, "Vol filter.", ["Haal het filter eruit, verwijder grof stof, spoel het af en plaats het terug.", "Leeg het filter na elke droogbeurt."]),
    F("E06", "Probleem met de verwarming", 2, "Verwarming of vuile condensor.", ["Maak eerst pluizenfilter en condensor schoon.", "Helpt dat niet, laat een monteur kijken."]),
    F("E08 / E09 / E10 / E24 / E25 / E90", "Storing in sensor of elektronica", 3, "Elektronica.", tech)],
  src: ["siemensDroog"] },

{ id: "whirlpool-droger", brand: "Whirlpool", name: "Droger (alle modellen)", cat: "drogers", years: "Alle bouwjaren met display", unit: null,
  intro: "Whirlpool-drogers geven F-codes. Veel storingen los je op met een reset of een schone condensor.", weak: ["Het bodemfilter achter het klepje onderaan wordt vaak vergeten."], parts: [], tasks: DRYER_TASKS,
  faults: [
    F("F01 / F02 / F03", "Een onderdeel werkt niet", 1, "Storing.", ["Houd de aan/uit-knop minstens 3 seconden ingedrukt en start het programma opnieuw."]),
    F("F04", "Condensor moet schoon", 1, "Vuile condensor.", ["Stekker eruit.", "Condensdroger: klep onderaan open, condensor eruit en afspoelen.", "Warmtepompdroger: condensor achter de klep met een stofzuigerborstel schoonmaken.", "30 minuten wachten, resetten en opnieuw starten."]),
    F("F05 / F06 / F07 / F08 / F09", "Storing in een onderdeel", 2, "Oververhitting of onderdeel.", ["Stekker eruit en de was eruit halen.", "Ongeveer 1 uur laten afkoelen, dan opnieuw starten."]),
    F("F10 / F24", "Storing in een onderdeel", 2, "Onderdeel.", ["Stekker eruit, ongeveer 1 uur wachten en opnieuw starten.", "Blijft de code, bel een monteur."])],
  src: ["whirlDroog"] },

{ id: "samsung-droger", brand: "Samsung", name: "Droger (alle modellen)", cat: "drogers", years: "Alle bouwjaren met display", unit: null,
  intro: "Samsung-drogers geven korte codes. tE wijst bijna altijd op een vol filter of vuile condensor.", weak: [], parts: [], tasks: DRYER_TASKS,
  faults: [
    F("tE / tE2 / tE4", "Pluizenfilter of condensor verstopt", 1, "Vuil filter of condensor.", ["Maak het pluizenfilter schoon en veeg de behuizing en de stofsensor af.", "Zuig het rooster van de condensor schoon."]),
    F("tE5", "Fout in de temperatuursensor van de compressor", 1, "Sensor.", ["Zet de droger 5 minuten uit en start het programma opnieuw."]),
    F("dE / dF", "Deur sluit niet goed", 1, "Wasgoed tussen de deur.", ["Leg de was goed in de trommel, sluit de deur en start opnieuw."]),
    F("HC / HE", "Compressor oververhit", 1, "Oververhitting.", ["Zet de droger 20 minuten uit en start opnieuw."]),
    F("2E", "Probleem met de stroom", 1, "Stekker of stopcontact.", ["Controleer de stekker en test het stopcontact met een ander apparaat."]),
    F("3E", "Motor draait niet", 1, "Storing.", ["Zet uit en start het programma opnieuw."]),
    F("5E", "Condensreservoir vol", 1, "Vol reservoir of verstopte afvoer.", ["Leeg het condensreservoir en start opnieuw.", "Bij een afvoerslang: controleer op knikken of verstoppingen."])],
  src: ["samsungDroog"] },

{ id: "zanussi-droger", brand: "Zanussi", name: "Droger (alle modellen)", cat: "drogers", years: "Alle bouwjaren met display", unit: null,
  intro: "Zanussi-drogers gebruiken C- en E-codes, vergelijkbaar met AEG.", weak: [], parts: [], tasks: DRYER_TASKS,
  faults: [
    F("CD", "Deur sluit niet", 1, "Wasgoed tussen de deur.", ["Haal de was weg en duw de deur dicht tot hij klikt."]),
    F("C2 / E20 / E21 / E22", "Probleem met de condensafvoer", 1, "Slang.", ["Controleer of de afvoerslang aan beide kanten vastzit.", "Haal knikken en lussen eruit."]),
    F("C6", "Fout in de vochtsensor", 1, "Geen geaard stopcontact.", ["Steek de stekker in een geaard stopcontact."]),
    F("C8 / E70 / E71 / E72", "Fout in de temperatuursensor", 3, "Sensor.", tech),
    F("CE / CF / E90 / E91", "Elektronische storing", 3, "Elektronica.", ["Neem contact op met Zanussi-service."]),
    F("E60 / E63", "Droger verwarmt niet goed", 1, "Vuil filter of condensor.", ["Maak het pluizenfilter schoon en laat het drogen.", "Maak de condensor onderaan de droger schoon."]),
    F("EH0 / EHO", "Geen stroom", 1, "Stroomvoorziening.", ["Druk de stekker goed in en test het stopcontact.", "Controleer de groep in de meterkast."])],
  src: ["zanussiDroog"] },

{ id: "haier-droger", brand: "Haier", name: "Droger (alle modellen)", cat: "drogers", years: "Alle bouwjaren met display", unit: null,
  intro: "Haier-drogers geven E- en F-codes. Een vol pluizenfilter is de meest voorkomende oorzaak.", weak: [], parts: [], tasks: DRYER_TASKS,
  faults: [
    F("E6", "Pluizenfilter vol", 1, "Vol filter.", ["Haal het filter eruit, verwijder grof stof en zuig de filteropening schoon."]),
    F("F2", "Afvoerpomp mogelijk kapot", 3, "Pomp.", tech),
    F("F31 / F32", "Kortsluiting of oververhitte condensor", 1, "Oververhitting.", ["Uitzetten en de stekker 10 minuten eruit, daarna opnieuw proberen."]),
    F("F4", "Trommel wordt niet warm", 3, "Verwarming.", tech),
    F("F5", "Communicatiefout tussen module en display", 1, "Elektronica.", ["Stekker 5 minuten eruit en opnieuw proberen."])],
  src: ["haierDroog"] },

// Koffie
{ id: "jura-volautomaat", brand: "JURA", name: "Volautomaat (alle modellen)", cat: "koffiemachines", years: "Alle bouwjaren met display", unit: null, also: "E-, S-, Z-, D- en A-serie",
  intro: "JURA toont meldingen in tekst of een foutnummer. De meeste meldingen hebben een eenvoudige oorzaak.", weak: ["Olieachtige bonen vormen een laagje in de bonenbak, waardoor de sensor geen bonen ziet."], parts: [],
  tasks: [{ w: "Als 'reinigen' op het display staat", t: "Reinigingsprogramma met tablet" }, { w: "Als het display erom vraagt", t: "Ontkalken of filter vervangen" }],
  faults: [
    F("1 / 2 / 3 / 4 / 5 / 6", "Probleem met de temperatuursensoren", 1, "Sensor geeft een afwijkende waarde.", ["Laat de machine minstens 30 minuten afkoelen tot kamertemperatuur.", "Stekker 5 minuten eruit, terugsteken en aanzetten."]),
    F("8", "Zetgroep zit vast door koffiedik", 1, "Gemalen koffie blokkeert de zetgroep.", ["Stekker eruit, 5 minuten wachten en opnieuw starten.", "Leeg de koffiedikbak en lekbak en plaats ze zonder kier terug.", "Herhaal als de code blijft."]),
    N("Bonen vullen, terwijl de bak vol is", 1, "Olieachtig laagje in de bonenbak.", ["Leeg de bonenbak en veeg hem droog.", "Zet een kopje. Lukt het niet, dan kan het maalwerk defect zijn."]),
    N("Lekbak ontbreekt", 1, "Vuil op de metalen contactstrips.", ["Maak de randen van de lekbak en de binnenkant van de machine schoon met een doek, warm water en wat afwasmiddel.", "Alles droog maken en de lekbak terugplaatsen."]),
    N("Reinigen blijft op het display staan", 1, "Het reinigingsprogramma is niet goed afgerond.", ["Draai het reinigingsprogramma opnieuw, nu zonder tablet."])],
  src: ["jura"] },

{ id: "siemens-eq-volautomaat", brand: "Siemens", name: "EQ-volautomaat (EQ.3 t/m EQ.900)", cat: "koffiemachines", years: "Alle bouwjaren", unit: null,
  intro: "Siemens-volautomaten geven tekstmeldingen. Vaak verschijnt een melding ten onrechte, bijvoorbeeld omdat een onderdeel niet goed zit.", weak: ["Olieachtige bonen blijven hangen in de bonenbak."], parts: [["Waterfilter", "Elke 3 maanden vervangen"]],
  tasks: [{ m: 3, t: "Waterfilter vervangen" }, { w: "Als het display erom vraagt", t: "Ontkalken" }],
  faults: [
    N("Apparaat moet afkoelen", 1, "Oververhit door lang achter elkaar gebruiken.", ["Zet uit, stekker eruit en wacht minstens 30 minuten."]),
    N("Bonenreservoir vullen, terwijl het vol is", 1, "Bonen blijven hangen.", ["Zet de maling fijner en tik zacht tegen de bonenbak.", "Helpt dat niet: bak leeg, droog uitvegen en probeer andere, minder olieachtige bonen."]),
    N("Apparaat ontkalken blijft terugkomen", 1, "Veel kalk of verstopte koffie-uitloop.", ["Plaats een waterfilter en vervang het elke 3 maanden.", "Prik de gaatjes van de koffie-uitloop open met een naald of satéprikker."]),
    N("Deur sluiten, terwijl de deur dicht lijkt", 1, "Deur niet helemaal dicht.", ["Druk de deur stevig dicht."]),
    N("Bakjes legen, terwijl de lekbak leeg is", 1, "Legen niet gezien terwijl de machine uit stond.", ["Haal de lekbak eruit en plaats hem terug terwijl de machine aan staat."]),
    N("Watertank vullen, terwijl de tank vol is", 1, "Tank zit niet goed.", ["Plaats de watertank opnieuw en goed."])],
  src: ["siemensEQ", "siemensEQ3"] },

// E-bikes
{ id: "bafang-ebike", brand: "Bafang", name: "Middenmotor en naafmotor", cat: "e-bikes", years: "Alle bouwjaren met display", unit: "km", also: "Veel budget- en ombouwfietsen",
  intro: "Bafang-motoren zitten in veel e-bikes en ombouwsets. De foutcode staat als getal op het display.", weak: ["Losse stekkers en kabels na een val of transport."], parts: [],
  tasks: [{ n: 300, t: "Ketting reinigen en smeren", v: 1 }, { n: 1000, t: "Stekkers en kabels nalopen", v: 1 }],
  faults: [
    F("04", "Gashendel werkt niet goed of blijft hangen", 1, "Gashendel of kabel.", ["Controleer de gashendel en de kabel."]),
    F("05", "Storing in de gashendel", 2, "Gashendel.", ["Controleer de aansluiting of vervang de gashendel."]),
    F("06", "Accuspanning te laag", 1, "Accu leeg of slecht contact.", ["Laad de accu op en controleer de aansluiting."]),
    F("07", "Accuspanning te hoog", 2, "Accu past niet bij het systeem.", ["Controleer of accu en systeem bij elkaar passen."]),
    F("08", "Probleem met de hallsensor in de motor", 2, "Motorbekabeling.", ["Controleer de bekabeling van de motor."]),
    F("09", "Probleem met de motorfase of bedrading", 2, "Motor of kabels.", ["Controleer motor en kabels."]),
    F("10", "Controller of motor te heet", 1, "Oververhitting.", ["Laat de motor afkoelen."]),
    F("11", "Probleem met de temperatuursensor van de controller", 2, "Sensor.", ["Laat het systeem afkoelen of laat het nakijken."]),
    F("12", "Probleem met de stroomsensor van de controller", 3, "Controller.", ["Laat de controller nakijken."]),
    F("13", "Temperatuurprobleem in de accu", 1, "Te warm of te koud.", ["Laat de accu afkoelen of opwarmen."]),
    F("14", "Probleem met de temperatuursensor van de motor", 3, "Sensor.", ["Laat motor of sensor nakijken."]),
    F("15", "Storing in de temperatuursensor van de controller", 3, "Sensor.", ["Laat het systeem nakijken."]),
    F("21", "Probleem met de snelheidssensor", 1, "Sensor of magneet.", ["Controleer de sensor en de magneet."]),
    F("22", "Communicatieprobleem met de accu (BMS)", 1, "Kabels.", ["Controleer kabels en aansluitingen."]),
    F("23", "Probleem met de verlichting", 1, "Lampen of kabels.", ["Controleer lampen en kabels."]),
    F("25", "Probleem met de koppelsensor", 2, "Sensor of kabels.", ["Controleer de sensor en de kabels."]),
    F("30", "Communicatieprobleem tussen onderdelen", 1, "Kabels.", ["Zet de fiets uit en weer aan.", "Controleer of alle stekkers schoon zijn en goed vastzitten."]),
    F("36", "Probleem met bedieningsknoppen of display", 2, "Display.", ["Controleer het display en de aansluiting."])],
  src: ["bafang"] },

// 3D-printers
{ id: "bambu-lab-x1", brand: "Bambu Lab", name: "X1 en X1 Carbon", cat: "3d-printers", years: "2022–heden", unit: null,
  intro: "Gesloten CoreXY-printer met lidar en koolstofstangen. Net als bij de P1 mogen de koolstofstangen nooit worden ingevet.", weak: ["De lidar-lens raakt vervuild, vooral bij ABS.", "Het koolfilter raakt verzadigd bij veel printen."],
  parts: [["Vet voor Z-spindels", "Bambu BX-300 of Super Lube 92003"], ["Koolstofstangen", "Alleen isopropylalcohol"], ["Koolfilter", "Vervangbaar"]],
  tasks: [{ w: "Voor elke print", t: "Mondstukwisser controleren" }, { m: 0.25, t: "Extrudertandwiel en ventilatoren controleren" }, { m: 1, t: "Koolstof- en geleidestangen controleren en reinigen" }, { m: 3, t: "Z-spindels invetten en stangen tegen roest oliën" }, { m: 3, t: "Koolfilter vervangen", s: "Bij ongeveer 8 uur printen per dag." }, { w: "Bij een foutmelding of vreemd licht", t: "Lidar-lens en laser reinigen" }],
  faults: [N("Onderextrusie of verstopping", 1, "Vuil mondstuk.", ["Reinig het mondstuk op 200 °C en doe een cold pull."])],
  src: ["bambuX1"] },

{ id: "prusa-mk3s", brand: "Prusa", name: "Original Prusa MK3S en MK3S+", cat: "3d-printers", years: "2019–2023", unit: "uur", also: "Ook MK2.5S en MK3",
  intro: "De klassieker onder de Prusa-printers. Prusa adviseert om de paar honderd printuren onderhoud, ook als alles goed lijkt te werken.", weak: ["Te losse of te strakke riemen.", "Filamentresten op de extrudertandwielen."],
  parts: [["Smeermiddel", "Prusa Lubricant; alternatief Super Lube 210XX"], ["Z-as", "Geen smeermiddel op de trapeziummoeren of draadspindels"]],
  tasks: [{ n: 200, t: "Assen, lagers en riemen controleren", s: "Riemstatus in het menu: streefwaarde 260–290." }, { n: 200, t: "Extrudertandwielen schoonborstelen met een messing borstel" }, { n: 700, t: "Connectoren van de elektronica nalopen", s: "Elke 600–800 uur, stroom eraf." }],
  faults: [N("Printkwaliteit blijft slecht", 1, "Versleten mondstuk.", ["Na 3–6 maanden gebruik: overweeg het mondstuk te vervangen.", "Kalibreer opnieuw na onderhoud."])],
  src: ["prusaMK3"] },

// Tuin
{ id: "worx-landroid", brand: "Worx", name: "Landroid Vision", cat: "tuin", years: "2023–heden", unit: null,
  intro: "Robotmaaier zonder begrenzingsdraad, met een camera. Foutcodes beginnen met een E.", weak: ["Gras hoger dan 9 cm belast de mesmotor.", "Smalle doorgangen onder 2 meter."], parts: [],
  tasks: [{ m: 1, t: "Messen en wielen vrijmaken van gras en vuil", v: 1 }, { w: "Bij laadproblemen", t: "Laadcontacten droog afvegen" }],
  faults: [
    F("E2", "Fout in de wielmotor", 1, "Stenen, gras, modder of takjes blokkeren de wielen.", ["Zet de maaier helemaal uit.", "Leg hem ondersteboven op een vlakke ondergrond.", "Haal vuil uit het wielmechanisme en zet hem weer aan."]),
    F("E3", "Mesmotor geblokkeerd", 1, "Iets blokkeert de messen of het gras is te hoog.", ["Zet de maaier uit en kantel hem voorzichtig, met handschoenen.", "Haal takjes, stenen en gras weg rond de messen.", "Gras hoger dan 9 cm eerst met een gewone maaier kort maken."]),
    F("E4", "Maaier zit vast", 1, "Obstakels, nat gras of te smalle doorgang.", ["Werk de firmware bij.", "Haal obstakels weg of zet er een tijdelijke afscheiding omheen.", "Houd het gras onder 9 cm en wacht tot een natte tuin droog is.", "Vergroot de randafstand in de app en zorg voor doorgangen van minstens 2 meter."]),
    F("E5", "Maaier opgetild", 1, "Het voorwiel komt los van de grond.", ["Zorg voor een vlakke ondergrond onder de maaier.", "Haal obstakels weg die het voorwiel optillen.", "Druk op Start om te resetten."]),
    F("E20", "Kan het laadstation niet verlaten", 1, "Slecht contact tussen maaier en station.", ["Controleer of de contacten van maaier en station elkaar goed raken.", "Veeg vuil, water of corrosie droog weg."])],
  src: ["worx"] }
);

CATS.splice(4, 0,
  { id: "koelkasten", name: "Koelkasten", one: "koelkast", intro: "Koelt niet, knipperend lampje of ijs in de vriezer: wat je zelf controleert en wanneer je een monteur belt." },
  { id: "ovens", name: "Ovens en magnetrons", one: "oven", intro: "Foutcodes van ovens, combi-ovens en magnetrons per merk, met wat je zelf kunt doen." },
  { id: "kookplaten", name: "Kookplaten", one: "kookplaat", intro: "Inductie- en elektrische kookplaten: de meldingen op het display uitgelegd." }
);

Object.assign(SRC, {
  koelkast: ["Coolblue – koelkast koelt niet goed", "https://www.coolblue.nl/advies/tips-wanneer-je-koelkast-niet-goed-koelt.html"],
  liebherr: ["Liebherr – veelgestelde vragen koelapparaten", "https://www.liebherr.com/nl-nl/koelkasten-vriezers/veelgestelde-vragen-3093561"],
  aegOven: ["Coolblue – foutcodes AEG ovens", "https://www.coolblue.nl/advies/hoe-los-je-de-foutcodes-en-storingen-op-aeg-ovens.html"],
  samsungOven: ["Coolblue – foutcodes Samsung ovens", "https://www.coolblue.nl/advies/hoe-los-je-foutcodes-van-samsung-ovens-op.html"],
  mieleOven: ["Coolblue – foutcodes Miele oven", "https://www.coolblue.nl/advies/hoe-los-je-de-foutcodes-bij-een-miele-oven-op.html"],
  bshOven: ["Coolblue – foutcodes Siemens en Bosch ovens", "https://www.coolblue.nl/advies/hoe-los-je-foutcodes-van-siemens-en-bosch-ovens-op.html"],
  zanussiOven: ["Coolblue – Zanussi oven storing F908", "https://www.coolblue.nl/advies/hoe-los-je-de-zanussi-oven-storing-f908-op.html"],
  panaMagn: ["Coolblue – foutcodes Panasonic magnetrons", "https://www.coolblue.nl/advies/hoe-los-je-foutcodes-van-panasonic-magnetrons-op.html"],
  samsungMagn: ["Coolblue – foutcodes Samsung magnetron", "https://www.coolblue.nl/advies/hoe-los-je-de-foutcodes-bij-een-samsung-magnetron-op.html"],
  bshMagn: ["Coolblue – foutcodes Bosch of Siemens magnetron", "https://www.coolblue.nl/advies/hoe-los-je-foutcodes-bij-een-bosch-of-siemens-magnetron-op.html"],
  elxKook: ["Electrolux support – foutcodes kookplaten (E0–E9, F2, F3, H, A)", "https://support.electrolux.be/support-articles/koken/kookplaten?locale=nl-BE"],
  aegSup: ["AEG support – kookplaatmeldingen (P, U/||, 3 67, kortsluiting)", "https://support.aeg.be/"],
  aegKook: ["Coolblue – storingen AEG en Zanussi kookplaten", "https://www.coolblue.be/nl/advies/zanussi-aeg-inductiekookplaat-storing.html"],
  hoover: ["Coolblue – storingen Hoover wasmachines", "https://www.coolblue.nl/advies/meest-voorkomende-storingen-van-hoover-wasmachines.html"],
  yamaha: ["Upway – foutcodes Yamaha e-bike-motoren", "https://en.upway.be/blogs/news/codes-derreur-des-moteurs-yamaha"]
});

const OVEN_TASKS = [{ w: "Na gebruik met spatten", t: "Binnenkant afnemen als de oven is afgekoeld" }];
MODELS.push(
{ id: "koelkast-alle-merken", brand: "Alle merken", name: "Koelkast koelt niet goed", cat: "koelkasten", years: "Alle bouwjaren", unit: null, also: "Samsung, LG, Bosch, Siemens, Liebherr, Beko, Inventum",
  intro: "Zes oorzaken die je zelf kunt controleren voordat je een monteur belt. De beste temperatuur in de koelkast is 4 °C.", weak: ["Te weinig ruimte rond de koelkast.", "Versleten deurrubbers."], parts: [["Koelkastthermometer", "Voor modellen zonder digitale temperatuur"]],
  tasks: [{ m: 6, t: "Vriezer ontdooien (Low Frost)", s: "Ongeveer 2 keer per jaar; zonder anti-frost ongeveer 6 keer per jaar." }, { m: 6, t: "Condensor stofvrij maken", v: 1, s: "Alleen als die open ligt; eerst de stekker eruit." }, { m: 12, t: "Deurrubbers controleren met een zaklamp", v: 1 }],
  faults: [
    N("Koelkast koelt niet goed", 1, "Te weinig luchtcirculatie, verkeerde stand of vuile condensor.", ["Laat aan de zijkanten en achterkant minstens 5 cm ruimte.", "Zet de temperatuur op 4 °C; meet het met een koelkastthermometer als er geen display is.", "Zet eten niet tegen de ventilatieopening en laat restjes eerst afkoelen.", "Maak een open condensor schoon met een zachte borstel, met de stekker eruit."]),
    N("Veel ijs in de vriezer", 1, "IJslaag maakt koelen lastiger en kost stroom.", ["Ontdooi de vriezer: Low Frost ongeveer 2 keer per jaar, zonder anti-frost ongeveer 6 keer per jaar."]),
    N("Deur sluit niet goed af", 1, "Versleten deurrubber.", ["Leg een brandende zaklamp in de koelkast, gericht op de deur, en sluit de deur.", "Zie je licht door het rubber? Vervang dan het rubber."])],
  src: ["koelkast"] },

{ id: "liebherr-koelkast", brand: "Liebherr", name: "Koelkast en vriezer", cat: "koelkasten", years: "Alle bouwjaren", unit: null, also: "BioFresh-modellen",
  intro: "Liebherr-apparaten met een toerengeregelde compressor hebben achterop een knipperlampje dat aangeeft of alles goed werkt.", weak: [], parts: [],
  tasks: [{ m: 6, t: "Deurrubbers reinigen met water en wat afwasmiddel", v: 1 }],
  faults: [
    N("Lampje achterop knippert", 1, "Elke 15 seconden is normaal. Een ander ritme betekent een noodstand of defect.", ["Knippert het in een ander ritme, neem dan contact op met de Liebherr-klantenservice."]),
    N("Temperatuur te hoog of te laag", 1, "Instelling, deur, ventilatie of omgeving.", ["Controleer de ingestelde temperatuur en of de deur goed sluit.", "Zorg dat ventilatieopeningen vrij zijn en de koelkast niet naast een warmtebron staat.", "Open de deur minder vaak en minder lang.", "Te koud? Kijk of SuperCool of SuperFrost per ongeluk aan staat.", "Onder +10 °C omgevingstemperatuur werkt het apparaat niet goed."]),
    N("Waterdruppels op de achterwand", 1, "Normaal tijdens het ontdooien.", ["Zorg dat de afvoeropening in de achterwand vrij is."]),
    N("Binnenverlichting werkt niet", 1, "Deur niet dicht, magneet weg of lamp kapot.", ["Sluit de deur goed; het licht gaat na 15 minuten uit als de deur open blijft.", "Vervang een kapotte lamp volgens de handleiding (niet bij LED)."])],
  src: ["liebherr"] },

{ id: "aeg-oven", brand: "AEG", name: "Oven (alle modellen)", cat: "ovens", years: "Alle bouwjaren met display", unit: null, also: "SteamBake, SteamCrisp, CombiAir",
  intro: "AEG-ovens tonen codes als F908 en F111. Veel meldingen verdwijnen na een korte stroomonderbreking.", weak: [], parts: [["Ovenlamp", "Via de AEG-webshop"], ["Braadthermometer", "Via de AEG-webshop"]], tasks: OVEN_TASKS,
  faults: [
    F("E0020 / E20", "Ovenlamp kapot", 1, "Lamp doorgebrand.", ["Controleer of de lamp echt niet brandt.", "Vervang de lamp zelf of laat het een monteur doen."]),
    F("F11 / F111 / F129", "Braadthermometer niet aangesloten of defect", 1, "Thermometer.", ["Sluit de thermometer opnieuw aan.", "Blijft de code, dan is de thermometer waarschijnlijk kapot."]),
    F("F908", "Interne fout", 1, "Storing.", ["Haal de stekker ongeveer 5 minuten uit het stopcontact.", "Kun je niet bij het stopcontact, zet dan de groep in de meterkast 5 minuten uit."]),
    F("P004 / C9A4 / C9A2", "Oven start opnieuw na een stroomonderbreking", 1, "Geen storing.", ["Niets doen; de code verdwijnt vanzelf."]),
    F("SAFE", "Kinderslot staat aan", 1, "Geen storing.", ["Zet de functieknop uit en druk tegelijk op de klok- en graden-knop. Werkt dat niet, kijk in de handleiding."])],
  src: ["aegOven"] },

{ id: "samsung-oven", brand: "Samsung", name: "Oven (alle modellen)", cat: "ovens", years: "Alle bouwjaren met display", unit: null, also: "Dual Cook",
  intro: "Samsung-ovens tonen C-codes. Bij oververhitting of vuile toetsen los je het meestal zelf op.", weak: [], parts: [], tasks: OVEN_TASKS,
  faults: [
    F("C-20", "Temperatuursensor kortgesloten of kapot", 2, "Sensor.", ["Stekker eruit, een paar minuten wachten en weer aansluiten.", "Komt de code terug, dan is een nieuwe sensor nodig."]),
    F("C-21", "Oven te heet", 1, "Oververhitting.", ["Stekker eruit en laten afkoelen.", "Na een paar uur weer aanzetten."]),
    F("C-F0", "Geen communicatie tussen de printplaten", 3, "Elektronica.", ["Neem contact op met de leverancier."]),
    F("C-F2 / C-d0", "Aanraaktoetsen defect", 1, "Vuil tussen de toetsen of defect display.", ["Stekker eruit en kijk of er vuil tussen de toetsen zit.", "Maak de toetsen voorzichtig schoon met een doek en wat water en droog ze.", "Komt de melding terug, dan is het display mogelijk kapot."])],
  src: ["samsungOven"] },

{ id: "miele-oven", brand: "Miele", name: "Oven (alle modellen)", cat: "ovens", years: "Alle bouwjaren met display", unit: null, also: "Pyrolyse-ovens",
  intro: "Miele-ovens geven F-codes. Een deel gaat over de pyrolyse-reiniging.", weak: [], parts: [["Braadthermometer", "Los te bestellen"]], tasks: OVEN_TASKS,
  faults: [
    F("F23", "Pyrolyse-temperatuur niet gehaald", 1, "Veel ingebrande resten.", ["Haal grote etensresten weg en start de pyrolyse opnieuw."]),
    F("F32 / F33", "Probleem met de deur tijdens pyrolyse", 1, "Iets zit tussen de deur.", ["Zet de oven uit en kijk of er niets tussen de deur zit."]),
    F("F44", "Technische storing", 1, "Storing.", ["Zet de oven 30 seconden spanningsloos (stekker of groep) en weer aan."]),
    F("F54", "Braadthermometer kapot", 1, "Thermometer.", ["Haal de thermometer voorzichtig eruit; de melding verdwijnt.", "Bestel een nieuwe thermometer."]),
    F("F55", "Uitgeschakeld na zeer lang gebruik", 1, "Veiligheidsuitschakeling.", ["Zet de oven uit en aan en start het programma opnieuw."]),
    F("F60", "Storing in de ventilatie", 2, "Ventilator geblokkeerd of defect.", ["Zet de oven uit en kijk of de ventilator niet geblokkeerd is.", "Draait hij niet tijdens het opwarmen, bel dan een monteur."])],
  src: ["mieleOven"] },

{ id: "bosch-siemens-oven", brand: "Bosch / Siemens", name: "Oven (alle modellen)", cat: "ovens", years: "Alle bouwjaren met display", unit: null, also: "Ook stoomovens",
  intro: "Bosch en Siemens gebruiken dezelfde ovencodes. Let op het verschil tussen een echte storing en het kinderslot of de demonstratiestand.", weak: ["Demonstratiestand: knoppen werken, maar de oven wordt niet warm."], parts: [], tasks: OVEN_TASKS,
  faults: [
    F("000", "Oven is nog te heet", 1, "Geen storing.", ["Wacht tot de oven helemaal is afgekoeld."]),
    F("E0532 / E05-32 / E011", "Toets te lang ingedrukt of klemt", 1, "Toets.", ["Druk de toetsen één voor één in."]),
    F("E5116", "Lucht in het systeem", 1, "Vaak bij eerste gebruik van een stoomoven.", ["Laat de stoom- of regenereerstand 5 minuten draaien en herhaal zo nodig.", "Controleer stoomonderdelen op lekken.", "Stel de waterhardheid goed in en ontkalk."]),
    F("E6200", "Probleem met de ventilator", 2, "Ventilator geblokkeerd of los.", ["Haal weg wat de ventilator blokkeert.", "Controleer of de ventilator vast zit en niet scheef staat."]),
    F("E0511 / E8401", "Fout in de temperatuursensor", 2, "Sensor.", ["Zet de oven ongeveer 20 minuten uit.", "Komt de code terug, dan moet de printplaat vervangen worden."]),
    F("E115", "Binnentemperatuur te hoog", 1, "Oververhitting.", ["Zet de oven minstens 30 minuten uit; de deur blijft dan meestal op slot."])],
  src: ["bshOven"] },

{ id: "zanussi-oven", brand: "Zanussi", name: "Oven (alle modellen)", cat: "ovens", years: "Alle bouwjaren met display", unit: null,
  intro: "De bekendste Zanussi-ovencode is F908. Die los je meestal zelf op met een reset.", weak: [], parts: [], tasks: OVEN_TASKS,
  faults: [F("F908", "Storing in de zekeringen van de oven", 1, "Interne storing.", ["Haal de stekker uit het stopcontact.", "Wacht ongeveer een minuut en steek hem terug.", "Blijft de code, neem dan contact op met de verkoper."])],
  src: ["zanussiOven"] },

{ id: "panasonic-magnetron", brand: "Panasonic", name: "Magnetron en combi-oven", cat: "ovens", years: "Alle bouwjaren met display", unit: null,
  intro: "Panasonic-combimagnetrons met stoom tonen U- en H-codes.", weak: [], parts: [], tasks: [],
  faults: [
    F("U12", "Lekbak zit niet goed", 1, "Lekbak verschoven.", ["Schuif de lekbak terug onder de deur, tegen de voorste voetjes, en start opnieuw."]),
    F("U14", "Waterreservoir leeg", 1, "Geen water.", ["Vul het reservoir, plaats het terug en druk op start."]),
    F("H97 / H98", "Storing in het magnetronsysteem", 3, "De magnetron werkt niet meer.", ["Neem contact op met de verkoper."])],
  src: ["panaMagn"] },

{ id: "samsung-magnetron", brand: "Samsung", name: "Magnetron (alle modellen)", cat: "ovens", years: "Alle bouwjaren met display", unit: null,
  intro: "Samsung-magnetrons geven korte codes. De meeste los je op door de magnetron te laten afkoelen of opnieuw te starten.", weak: [], parts: [], tasks: [],
  faults: [
    F("SE", "Startknop half ingedrukt", 1, "Knop.", ["Druk de knop opnieuw in tot hij goed zit."]),
    F("C-F2 / CdO", "Communicatiefout", 1, "Storing.", ["Druk op Stop, haal de stekker eruit, laat afkoelen en start opnieuw."]),
    F("E24 / C21", "Binnentemperatuur te hoog", 1, "Oververhitting.", ["Stekker eruit, helemaal laten afkoelen en weer aanzetten."]),
    F("C-10 / C-20 / C-F0 / C-F1", "Probleem met de temperatuursensor", 1, "Sensor.", ["Stekker eruit, op Stop drukken en opnieuw starten.", "Komt de code terug, zet hem dan langer dan 30 seconden uit en stel hem opnieuw in."])],
  src: ["samsungMagn"] },

{ id: "bosch-siemens-magnetron", brand: "Bosch / Siemens", name: "Magnetron (alle modellen)", cat: "ovens", years: "Alle bouwjaren met display", unit: null,
  intro: "Bosch- en Siemens-magnetrons tonen E-codes.", weak: [], parts: [], tasks: [],
  faults: [
    F("E2", "Automatische veiligheidsuitschakeling", 1, "Geen storing.", ["Draai aan de knop of druk op een toets; de code verdwijnt."]),
    F("E11", "Vocht in het bedieningspaneel", 1, "Vocht.", ["Droog de buitenkant met een doek. Zit er vocht in, laat het dan eerst drogen."]),
    F("E3", "Fout in het deuropeningssysteem", 2, "Deur.", ["Zet uit, wacht 10 seconden en zet aan.", "Komt de code terug, neem contact op met de verkoper."]),
    F("E17", "Snel voorverwarmen mislukt", 2, "Interne storing.", ["Zet uit, laat volledig afkoelen, stekker eruit en opnieuw starten.", "Komt de code terug, neem contact op met de verkoper."])],
  src: ["bshMagn"] },

{ id: "aeg-zanussi-kookplaat", brand: "AEG / Zanussi / Electrolux", name: "Inductie- en elektrische kookplaat", cat: "kookplaten", years: "Alle bouwjaren", unit: null, also: "Ook gaskookplaten van deze merken",
  intro: "AEG, Zanussi en Electrolux gebruiken dezelfde meldingen op het display. Bij codes die met de stroomvoorziening te maken hebben: gebruik de kookplaat niet tot het is opgelost.", weak: ["Een la of kastje onder de kookplaat dat de ventilator blokkeert.", "Een te lichte zekering of een groep die gedeeld wordt met andere apparaten."], parts: [], tasks: [],
  faults: [
    F("E0 / E1", "Fout in de elektronische besturing", 2, "Tijdelijke communicatiefout, storing op het net of een defecte besturingsprint.", ["Haal de stekker eruit of zet de aardlekschakelaar/groep uit.", "Wacht ongeveer 1 minuut en zet de stroom weer aan.", "Komt de code direct terug of blijft hij terugkomen? Laat een monteur kijken."]),
    F("E2", "Fout in de ledverlichting (teppanyaki: temperatuursensor)", 2, "Defecte led-aansturing of, bij een teppanyaki, de temperatuursensor.", ["Zet de stroom minstens 30 seconden uit en zet de kookplaat weer aan.", "Blijft E2 staan? Noteer de code en vraag een monteur aan."]),
    F("E3", "Spanning te laag of te hoog", 3, "Meestal een verkeerde aansluiting.", ["Laat de elektrische aansluiting controleren door een erkend installateur."]),
    F("E4 / E401 / E421 / E431", "Oververhittingsbeveiliging", 1, "Een zone is te heet geworden, vaak door een drooggekookte of ongeschikte pan. Ook E402, E403, E422, E423, E432 en E433 horen hierbij.", ["Haal alle pannen van de zone.", "Zet de stroom minstens 30 seconden uit en zet weer aan.", "Laat de kookplaat afkoelen; de restwarmte-indicator kan nog even branden.", "Gebruik pannen die geschikt zijn voor inductie en zet geen hete pan terug op een koude zone.", "Komt de code terug? Vraag een monteur aan."]),
    F("E5", "Fase- of spanningsprobleem", 3, "De stroomvoorziening klopt niet.", ["Zet de stroom minstens 30 seconden uit en zet de kookplaat weer aan.", "Blijft E5 staan? Gebruik de kookplaat niet en vraag een monteur aan. Geef de code door."]),
    F("E6 / E641", "Fout in voedingsprint of inductiemodule", 3, "Defecte voedingsprint of inductiemodule, of de kookplaat is verkeerd aangesloten.", ["Laat een erkend installateur de aansluiting controleren.", "Klopt de aansluiting en blijft de code? Dan moet een monteur de print of module vervangen."]),
    F("E7", "Probleem met de ventilator", 1, "Ventilator geblokkeerd of te weinig ventilatie.", ["Controleer of niets in een la of kastje onder de kookplaat de ventilator blokkeert.", "Controleer of de kookplaat goed is ingebouwd."]),
    F("E8 / E822", "Probleem met de stroomvoorziening", 3, "Meestal een ontbrekende fase of een verkeerde spanning op de aansluiting.", ["Gebruik de kookplaat niet en schakel de stroom uit.", "Kijk in de meterkast: bij een aansluiting op meerdere fasen kan één zekering zijn doorgeslagen.", "Laat de installateur de spanning op het aansluitblok meten.", "Blijft het probleem? Vraag een monteur aan."]),
    F("E9", "Fout in de elektronica", 2, "Een storing in de elektronica; alleen een monteur kan de precieze oorzaak vinden.", ["Haal de stekker 1 minuut uit het stopcontact (of zet de groep uit) en zet weer aan.", "Komt E9 terug? Vraag een monteur aan en geef de code door."]),
    F("F", "Probleem met de pan", 1, "Pan niet geschikt, te klein of niet in het midden.", ["Zet de pan midden op de zone en gebruik een pan die geschikt is voor inductie.", "Op een flexibele zone met ProCook: maar één pan per zone."]),
    F("F2", "SenseBoil: lege pan of verkeerde vloeistof", 1, "De kookplaat ziet een lege pan of een andere vloeistof dan water, zoals olie.", ["Maak de kookplaat droog.", "Zet geen zone aan met een lege pan erop.", "Gebruik SenseBoil alleen met water."]),
    F("F3", "SenseBoil: te veel of te weinig water", 1, "Te veel of te weinig water in de pan, of iets anders dan water en aardappels.", ["Vul de pan met koud kraanwater tot tussen half en driekwart vol, ongeveer 4 cm onder de rand.", "Gebruik 1 tot 5 liter (water plus aardappels samen 1 tot 5 kg).", "Kook met SenseBoil alleen water of aardappels."]),
    F("H", "Restwarmte (geen storing)", 1, "De zone is nog heet. Dit is een waarschuwing tegen verbranden.", ["Laat de zone afkoelen.", "Staat H er nog als de kookplaat helemaal koud is? Dan is een sensor defect: vraag een monteur aan."]),
    F("A", "Automatische opwarmfunctie (geen storing)", 1, "De zone start op de hoogste stand en schakelt na een tijd terug naar de gekozen stand.", ["Dit is normaal. Uitzetten of instellen: zie de handleiding van je model."]),
    F("P", "Booster actief (geen storing)", 1, "De boosterfunctie geeft tijdelijk extra vermogen.", ["De booster schakelt na een tijd vanzelf uit."]),
    F("U / ||", "STOP+GO of warmhoudfunctie actief", 1, "Alle zones staan op de laagste warmhoudstand.", ["Druk op STOP+GO of op het pauzesymbool om verder te koken."]),
    F("3 67", "Defecte inductiemodule", 3, "Een inductiemodule is kapot.", ["Gebruik de zone niet en vraag een reparatie aan."]),
    F("L", "Toetsenblokkering of kinderslot aan", 1, "Geen storing.", ["Zet het kinderslot uit volgens de handleiding."]),
    N("De kookplaat laat de zekering of aardlek uitschakelen", 3, "Te lichte zekering, een groep die gedeeld wordt met andere apparaten, of een verkeerde aansluiting.", ["Gebruik de kookplaat niet tot het opgelost is.", "Laat een elektricien controleren of de zekering zwaar genoeg is en of de kookplaat een eigen groep heeft.", "Blijft het gebeuren? Vraag een monteur aan."]),
    N("Kookplaat doet niets meer na een kortsluiting", 2, "Een zekering of aardlekschakelaar is uitgeschakeld.", ["Controleer de zekeringen en de aardlekschakelaar in de meterkast.", "Slaat hij direct weer door? Laat een elektricien kijken."]),
    N("Inductiekookplaat fluit of zoemt", 1, "Oudere pannen of een pan die kleiner is dan de kookzone.", ["Probeer een andere, nieuwere pan.", "Gebruik een pan waarvan de bodem even groot is als de zone."]),
    N("Gasbrander ontsteekt niet of gaat uit", 1, "Branderdeksel scheef of nat, of de knop te kort ingedrukt.", ["Leg het branderdeksel recht en midden op de brander.", "Maak het deksel droog als het nat is.", "Houd de knop minstens 15 seconden ingedrukt, zodat het thermokoppel warm genoeg wordt.", "Ruik je gas? Draai de gaskraan dicht, zet ramen open en bel 0800-9009."])],
  src: ["aegKook", "elxKook", "aegSup"] },

{ id: "hoover-wasmachine", brand: "Hoover", name: "Wasmachine (alle modellen)", cat: "wasmachines", years: "Alle bouwjaren", unit: null, also: "Ook Candy",
  intro: "Hoover toont E-codes of laat een lampje knipperen: het aantal knipperingen is het codenummer.", weak: [], parts: [], tasks: FILTER_TASK,
  faults: [
    F("E2", "Geen watertoevoer (2 keer knipperen)", 1, "Kraan, slang of filter.", ["Draai de kraan helemaal open en controleer de slang op knikken.", "De afvoer mag maximaal 85 cm boven de vloer zitten.", "Maak het filter onderaan schoon."]),
    F("E3", "Geen afvoer (3 keer knipperen)", 1, "Verstopt filter of slang.", ["Maak het filter onderaan schoon en haal knoopjes of speldjes eruit.", "Controleer de afvoerslang op knikken en verstoppingen."]),
    F("E4", "Te veel schuim (4 keer knipperen)", 1, "Te veel wasmiddel.", ["Leeg de trommel en draai het reinigingsprogramma.", "Gebruik minder wasmiddel en wasverzachter."]),
    F("E7", "Probleem met de deur (7 keer knipperen)", 1, "Was tussen de deur of te vol.", ["Haal wasgoed weg en sluit de deur tot hij klikt.", "Zit hij op slot: stekker 2 minuten eruit, dan openen en opnieuw starten."])],
  src: ["hoover"] },

{ id: "yamaha-ebike", brand: "Yamaha", name: "PW-serie e-bike-motor", cat: "e-bikes", years: "Alle bouwjaren", unit: "km", also: "Giant, Haibike, Batavus, Sparta",
  intro: "Yamaha-motoren zitten onder andere in Giant- en Haibike-fietsen. Bij codes 61, 62 en 67 kun je beter niet verder fietsen.", weak: ["Vuil op magneet en snelheidssensor."], parts: [],
  tasks: [{ n: 300, t: "Ketting reinigen en smeren", v: 1 }, { n: 1000, t: "Magneet en snelheidssensor schoonmaken", v: 1 }],
  faults: [
    F("1 / E01", "Snelheidssensor", 1, "Vuil of verkeerde afstand.", ["Maak magneet en sensor schoon.", "Controleer de uitlijning en de afstand (ongeveer 5–17 mm) en de kabel."]),
    F("2 / E02", "Koppelsensor", 1, "Opgestart met voet op het pedaal.", ["Zet de fiets uit en aan zonder de pedalen aan te raken.", "Blijft de code, ga naar de dealer."]),
    F("3 / E03", "Trapsensor", 2, "Vuil of kabel.", ["Maak de omgeving van de trapas schoon en controleer de kabels.", "Blijft de code, ga naar de dealer."]),
    F("4 / E04", "Accu leeg of slecht contact", 1, "Contact.", ["Laad de accu volledig op.", "Neem de accu uit, maak de contacten schoon en plaats hem stevig terug."]),
    F("5 / E05", "Temperatuur", 1, "Te warm of te koud.", ["Laat de fiets afkoelen of opwarmen.", "Gebruik lichtere versnellingen bij klimmen."]),
    F("8 / E08", "Storing in het display", 1, "Kabel.", ["Controleer de kabel van het display."]),
    F("9 / E09", "Verkeerde spanning", 1, "Lader of bedrading.", ["Controleer lader en bedrading en start opnieuw."]),
    F("12", "Communicatie met display onderbroken", 1, "Stekkers.", ["Controleer de stekkers; vervang zo nodig kabel of display."]),
    F("31", "Koppelsensor geeft geen signaal", 3, "Sensor.", ["Start opnieuw; blijft de code, dan moet de dealer hem vervangen."]),
    F("61", "Storing in de controller", 3, "Ernstige storing.", ["Fiets niet verder met deze code.", "Start opnieuw; blijft de code, ga naar de dealer."]),
    F("62", "Overstroom in de motor", 3, "Ernstige storing.", ["Fiets niet verder; ga naar de dealer."]),
    F("64 / 65", "Temperatuursensor of printplaat", 1, "Temperatuur.", ["Laat de fiets op omgevingstemperatuur komen en start opnieuw."]),
    F("67", "Losse bedrading in de motor", 3, "Ernstige storing.", ["Fiets niet verder; ga naar de dealer."]),
    F("71", "Communicatie met de accu verloren", 1, "Contact.", ["Maak de contacten schoon, zet de accu stevig vast zonder speling en start opnieuw."]),
    F("73", "Accuspanning te hoog", 3, "Controller of accu.", ["Laat de dealer controller of accu vervangen."])],
  src: ["yamaha"] }
);

Object.assign(SRC, {
  samsungVaat: ["Coolblue – foutcodes Samsung vaatwasser", "https://www.coolblue.nl/advies/hoe-los-je-de-foutcodes-van-een-samsung-vaatwasser-op.html"],
  bekoVaat: ["Coolblue – foutcodes Beko vaatwasser", "https://www.coolblue.nl/advies/hoe-los-je-de-foutcodes-van-een-beko-vaatwasser-op.html"],
  inventumVaat: ["Coolblue – foutcodes Inventum vaatwasser", "https://www.coolblue.nl/advies/hoe-los-je-de-foutcodes-van-een-inventum-vaatwasser-op.html"],
  wisbergVaat: ["Coolblue – foutcodes Wisberg vaatwasser", "https://www.coolblue.nl/advies/hoe-los-je-foutcodes-van-een-wisberg-vaatwasser-op.html"],
  wisbergDroog: ["Coolblue – storingen Wisberg droger", "https://www.coolblue.nl/advies/hoe-los-je-een-wisberg-droger-storing-op.html"],
  bekoDroog: ["Coolblue – storingen Beko drogers", "https://www.coolblue.nl/advies/de-meest-voorkomende-storingen-van-beko-drogers.html"],
  candy: ["Coolblue – storingen Candy was-droogcombinaties", "https://www.coolblue.nl/advies/de-meest-voorkomende-storingen-van-candy-was-droogcombinaties.html"],
  irobot: ["Coolblue – foutcodes iRobot robotstofzuiger", "https://www.coolblue.nl/advies/hoe-los-je-foutcodes-van-jouw-irobot-robotstofzuiger-op.html"]
});

MODELS.push(
{ id: "samsung-vaatwasser", brand: "Samsung", name: "Vaatwasser (alle modellen)", cat: "vaatwassers", years: "Alle bouwjaren met display", unit: null,
  intro: "Samsung-vaatwassers tonen codes van twee tekens. 4C is de code die het vaakst voorkomt.", weak: [], parts: [], tasks: DISH_TASKS,
  faults: [
    F("4C", "Probleem met de watertoevoer", 1, "Kraan, slang of filter.", ["Draai de kraan helemaal open.", "Haal knikken en verstoppingen uit de toevoerslang en maak het filter schoon.", "Test de druk: 10 liter in een minuut. Lukt dat niet, schakel een loodgieter in."]),
    F("HC", "Controle van de verwarmingstemperatuur", 1, "Geen echte storing.", ["Draai een leeg programma met vaatwasmiddel."]),
    F("bc2", "Storing in het bedieningspaneel", 1, "Toets klemt.", ["Houd een toets 30 seconden ingedrukt en maak het bedieningspaneel schoon."]),
    F("LC / AC / tC / PC / EC", "Mogelijk een kapot onderdeel", 3, "Onderdeel defect.", ["Niet zelf repareren.", "Kraan dicht, stekker eruit en contact opnemen met Samsung."])],
  src: ["samsungVaat"] },

{ id: "beko-vaatwasser", brand: "Beko", name: "Vaatwasser (alle modellen)", cat: "vaatwassers", years: "Alle bouwjaren met display", unit: null,
  intro: "Beko-vaatwassers tonen E-codes. E01 en E02 los je zelf op; bij de rest is een onderdeel waarschijnlijk kapot.", weak: [], parts: [], tasks: DISH_TASKS,
  faults: [
    F("E01", "Water wordt niet weggepompt", 1, "Slang, filter of afvoer.", ["Haal knikken uit de toevoer- en afvoerslang.", "Spoel het filter schoon onder de kraan.", "Maak een verstopte afvoer vrij."]),
    F("E02", "Geen of te weinig water", 1, "Kraan of druk.", ["Draai de kraan helemaal open en test de druk: 10 liter in een minuut.", "Controleer de slangen op knikken en maak het filter schoon."]),
    F("E03 / E04 / E05 / E06 / E07 / E08", "Mogelijk een kapot onderdeel", 3, "Onderdeel defect.", ["Niet zelf repareren.", "Zet de vaatwasser uit en neem contact op met de verkoper of Beko."])],
  src: ["bekoVaat"] },

{ id: "inventum-vaatwasser", brand: "Inventum", name: "Vaatwasser (alle modellen)", cat: "vaatwassers", years: "Alle bouwjaren met display", unit: null,
  intro: "Inventum-vaatwassers tonen F-codes. F2 en F5 los je zelf op.", weak: [], parts: [], tasks: DISH_TASKS,
  faults: [
    F("F2", "Water wordt niet afgevoerd", 1, "Verstopte slang of filters.", ["Controleer afvoerslang en filters op verstoppingen en maak ze schoon.", "Blijft de code, reset het programma volgens de handleiding."]),
    F("F5", "Te weinig water", 1, "Kraan, druk of filter.", ["Draai de kraan helemaal open en test de druk: 10 liter in een minuut.", "Maak het filter van de toevoerslang schoon en haal knikken eruit."]),
    F("F1 / F3 / F6 / F7 / F8 / FE", "Mogelijk een kapot onderdeel", 3, "Onderdeel defect.", ["Niet zelf repareren.", "Kraan dicht, stekker eruit en contact opnemen met Inventum."])],
  src: ["inventumVaat"] },

{ id: "wisberg-vaatwasser", brand: "Wisberg", name: "Vaatwasser (alle modellen)", cat: "vaatwassers", years: "Alle bouwjaren", unit: null,
  intro: "Het Coolblue-huismerk. Een schoon filter onderin voorkomt de meeste storingen.", weak: [], parts: [], tasks: DISH_TASKS,
  faults: [
    F("E1", "Te weinig water", 1, "Kraan, slangen of Aquastop.", ["Controleer of de kraan open staat.", "Kijk of toevoer- en afvoerslang niet geknikt of verstopt zijn.", "Reset de Aquastop als die er is."]),
    F("E3", "Verwarmt te lang", 2, "Vuil filter of temperatuursensor.", ["Is het water koud of lauw, maak dan het filter schoon.", "Is het water heet, dan is de sensor mogelijk defect: uit, 5 minuten wachten, opnieuw starten.", "Komt de code terug, bel een monteur."]),
    F("E4", "Lek in de kuip", 2, "Lekkage of sensor.", ["De afvoerpomp gaat vanzelf draaien. Staat er nog water, controleer de afvoer op verstoppingen.", "Geen water te zien? Uit, 5 minuten wachten en opnieuw starten. Komt de code terug, bel een monteur."]),
    F("E6 / E7", "Fout in de temperatuursensor", 2, "Sensor.", ["Zet uit en laat de binnenkant volledig afkoelen.", "Komt de code terug, bel een monteur."])],
  src: ["wisbergVaat"] },

{ id: "wisberg-droger", brand: "Wisberg", name: "Droger (alle modellen)", cat: "drogers", years: "Alle bouwjaren", unit: null,
  intro: "Wisberg-drogers tonen E-codes. Afvoer en vochtsensor los je zelf op.", weak: [], parts: [], tasks: DRYER_TASKS,
  faults: [
    F("E20", "Probleem met de waterafvoer", 1, "Reservoir of slang.", ["Leeg het condensreservoir en plaats het terug.", "De afvoerslang mag maximaal 10 cm in de afvoer steken; haal knikken en lussen eruit."]),
    F("E32", "Vochtsensor", 1, "Vuile sensor.", ["Maak de vochtsensor boven de deuropening schoon met een doekje.", "Stekker 30 seconden eruit en opnieuw starten."]),
    F("E33", "Temperatuursensor", 3, "Sensor.", tech),
    F("E50", "Stroomtoevoer", 2, "Geen geaard stopcontact of defect.", ["Gebruik een geaard stopcontact.", "Is dat in orde, bel dan een monteur."]),
    F("E64 / E82", "Printplaat", 3, "Elektronica.", tech)],
  src: ["wisbergDroog"] },

{ id: "beko-droger", brand: "Beko", name: "Droger (alle modellen)", cat: "drogers", years: "Alle bouwjaren", unit: null,
  intro: "Beko-drogers geven weinig codes. De meeste klachten los je op met schone filters en condensor.", weak: ["De vochtsensor raakt vervuild, waardoor de droger te kort of te lang draait."], parts: [], tasks: DRYER_TASKS,
  faults: [
    N("Drogen duurt te lang", 1, "Vuile filters, condensor of vochtsensor.", ["Maak de pluizenfilters schoon.", "Maak de voorkant van de condensor en de vochtsensor schoon.", "Haal weg wat de ventilatieroosters blokkeert."]),
    N("Kleding komt vochtig uit de droger", 1, "Verkeerd programma, vol filter of te vol.", ["Kies het juiste programma.", "Maak de filters schoon en haal wat was eruit.", "Centrifugeer de was hoger in de wasmachine."]),
    N("Programma start niet", 1, "Stekker, deur of kinderslot.", ["Controleer de stekker en sluit de deur helemaal.", "Zet het kinderslot uit."]),
    N("Programma stopt zonder reden", 1, "Deur open of reservoir vol.", ["Sluit de deur, leeg het reservoir en druk opnieuw op start."])],
  src: ["bekoDroog"] },

{ id: "candy-wasmachine", brand: "Candy", name: "Wasmachine en was-droogcombinatie", cat: "wasmachines", years: "Alle bouwjaren", unit: null, also: "Ook Hoover (zelfde groep)",
  intro: "Candy en Hoover horen bij dezelfde groep en gebruiken dezelfde codes. Het afvoerfilter zit rechtsonder.", weak: [], parts: [], tasks: FILTER_TASK,
  faults: [
    F("E2", "Geen watertoevoer", 1, "Kraan, slang of filter.", ["Draai de kraan helemaal open en controleer de slang op knikken.", "Kraan dicht, slang los en het filtertje aan het eind schoonborstelen.", "Maak ook het afvoerfilter rechtsonder schoon."]),
    F("E3", "Water wordt niet afgevoerd", 1, "Verstopt filter of slang.", ["Open het klepje rechtsonder en zet een bak eronder.", "Draai het filter open, haal voorwerpen eruit en spoel het af.", "Controleer de afvoerslang op knikken en verstoppingen."]),
    F("E4", "Te veel schuim", 1, "Te veel wasmiddel.", ["Stop het programma en haal de was eruit.", "Draai een spoelprogramma met lege trommel.", "Gebruik voortaan minder wasmiddel."]),
    F("E7", "Probleem met de deur", 1, "Kleding tussen de deur of te vol.", ["Haal kleding uit de deuropening en sluit de deur tot hij klikt.", "Lukt het niet: stekker 3 minuten eruit, deur openen en opnieuw proberen."])],
  src: ["candy"] },

{ id: "irobot-roomba", brand: "iRobot", name: "Roomba (alle modellen)", cat: "stofzuigers", years: "Alle bouwjaren", unit: null, also: "Roomba i-, j- en s-serie, Combo",
  intro: "iRobot geeft een foutnummer, gesproken of in de app. Een reset doe je door CLEAN 20 seconden ingedrukt te houden.", weak: ["Vuile valsensoren laten de robot vastlopen op randen."], parts: [["Filter", "Niet met water reinigen"]],
  tasks: [{ m: 0.5, t: "Filter uitkloppen en stofbak legen" }, { m: 6, t: "Filter vervangen", v: 1 }],
  faults: [
    F("6", "Robot zit vast op een rand of drempel", 1, "Rand, drempel of te donker.", ["Zet de robot op een andere plek en druk op CLEAN.", "Maak de sensoren schoon met een droge microvezeldoek.", "Loopt hij vaak vast, maak dan een no-go-zone in de app."]),
    F("8", "Motor loopt zwaar of filter verstopt", 1, "Vuil filter.", ["Haal opvangbak en filter eruit.", "Tik het filter leeg, spoel de bak met water en laat alles drogen. Het filter niet nat maken."]),
    F("9", "Bumper zit vast", 1, "Bumper klemt.", ["Tik zacht tegen de bumper en druk op CLEAN.", "Blijft de fout, dan zit de bumper mogelijk los: klantenservice."]),
    F("26", "Zuigkracht te laag", 1, "Vuil filter of schoonmaakkop.", ["Reinig of vervang het filter.", "Houd CLEAN ongeveer 20 seconden ingedrukt om te resetten.", "Blijft de fout, vervang dan de schoonmaakkop."]),
    F("36", "Stofbak lijkt vol na legen", 1, "Vuile sensoren.", ["Spoel de bak af en laat drogen.", "Veeg de sensoren droog schoon.", "Reset met CLEAN 20 seconden ingedrukt."]),
    F("68", "Geen beeld van de camera", 2, "Camera.", ["Zet de robot in het laadstation, houd CLEAN 20 seconden ingedrukt en start opnieuw.", "Werkt het niet, neem contact op met de klantenservice."])],
  src: ["irobot"] }
);

CATS.splice(4, 0, { id: "cv-ketels", name: "Cv-ketels", one: "cv-ketel", intro: "Storingscodes van cv-ketels per merk. Wat je zelf mag doen (bijvullen, één keer resetten) en wanneer de installateur moet komen." });

Object.assign(SRC, {
  remeha: ["Remeha – installatie- en servicehandleiding Calenta", "https://documentation.remeha.nl/wp-content/uploads/sites/68/2025/12/Installatie-en-servicehandleiding-Calenta-25L-NL-119288-260110.pdf"],
  intergas: ["Intergas – installatievoorschrift HR eco", "https://www.intergas-verwarming.nl/app/uploads/2018/01/88399809-Installatievoorschrift-HReco.pdf"],
  vaillantF22: ["Vaillant – foutcode F22", "https://www.vaillant.com/en/advice/help-center/f22-fault-code/"],
  vaillantF28: ["Vaillant – foutcode F28", "https://www.vaillant.co.uk/advice/understanding-heating-technology/boilers/understanding-an-f28-fault-code-on-a-vaillant-boiler/"],
  selectraCv: ["Selectra – cv-ketel storing", "https://selectra.nl/energie/verwarming/cv-ketel-storing"],
  roborock: ["Roborock – foutmeldingen", "https://us.roborock.com/pages/errores-espanol-latinoamerica"],
  philipsVol: ["Coolblue – geen koffie uit Philips volautomaat", "https://www.coolblue.nl/advies/wat-doe-je-als-er-geen-koffie-in-je-kopje-komt-bij-een-philips-volautomaat.html"],
  boschKook: ["Bosch – foutcodes inductiekookplaat", "https://www.bosch-home.com/us/owner-support/cooktops/error-codes/induction"]
});

const CV_TASKS = [{ m: 1, t: "Waterdruk controleren", v: 1, s: "Koud systeem: meestal 1 tot 2 bar; kijk in je handleiding." }, { m: 12, t: "Onderhoudsbeurt door een erkend installateur" }];
const installer = ["Niet zelf aan de ketel sleutelen.", "Bel je installateur. Huur je? Meld het bij je verhuurder."];

MODELS.push(
{ id: "cv-ketel-waterdruk", brand: "Alle merken", name: "Cv-ketel: druk te laag en resetten", cat: "cv-ketels", years: "Alle bouwjaren", unit: null, also: "Remeha, Intergas, Nefit, Vaillant, ATAG, Itho Daalderop",
  intro: "Bijvullen en één keer resetten mag je zelf doen. Al het andere werk aan een gasketel hoort bij een erkend installateur.", weak: ["Druk die steeds weer zakt zonder zichtbaar lek: vaak het expansievat of overstortventiel."], parts: [["Vulslang", "Om bij te vullen vanaf de kraan"]],
  tasks: CV_TASKS,
  faults: [
    N("Waterdruk te laag", 1, "Te weinig water in de installatie.", ["Vul bij tot de druk uit je handleiding; bij een koud systeem meestal tussen 1 en 2 bar.", "Remeha Calenta: onder 0,8 bar verschijnt een waarschuwing. Intergas: onder 0,5 bar knippert de druk.", "Zakt de druk steeds terug zonder zichtbaar lek, laat dan een installateur kijken."]),
    N("Ketel in storing: mag ik resetten?", 1, "Een reset heft de blokkering op, maar lost de oorzaak niet op.", ["Reset hooguit één keer voor dezelfde storing.", "Komt dezelfde code binnen een dag terug, stop dan met resetten.", "Noteer de code en wat de ketel deed, en bel de installateur."]),
    N("Gaslucht", 3, "Mogelijk gaslek.", ["Open ramen en deuren.", "Draai de hoofdgaskraan dicht.", "Gebruik geen schakelaars of open vuur.", "Bel 0800-9009."])],
  src: ["selectraCv", "remeha", "intergas"] },

{ id: "remeha-calenta", brand: "Remeha", name: "Calenta", cat: "cv-ketels", years: "Alle bouwjaren", unit: null,
  intro: "Remeha Calenta toont storingscodes met een E en tijdelijke blokkeringen. Bij een blokkering start de ketel vaak vanzelf weer.", weak: ["Te weinig waterdruk: onder 0,8 bar komt er een waarschuwing.", "Lucht in de installatie of een vervuilde wisselaar."], parts: [],
  tasks: CV_TASKS,
  faults: [
    F("E04 / E05", "Temperatuur warmtewisselaar te laag of te hoog", 2, "Sensor, slechte verbinding of geen doorstroming.", ["Controleer de waterdruk en vul zo nodig bij.", "Reset één keer. Komt de code terug, bel de installateur."]),
    F("E08 / E09", "Retourtemperatuur te laag of te hoog", 2, "Sensor of geen doorstroming.", ["Controleer de waterdruk.", "Komt de code terug, bel de installateur."]),
    F("E10 / E11", "Te groot verschil tussen aanvoer en retour", 2, "Lucht, geen doorstroming, vuile wisselaar of pomp.", ["Controleer de waterdruk en ontlucht de radiatoren.", "Komt de code terug, bel de installateur."]),
    F("E12", "Temperatuur boven veilige grens", 3, "Geen doorstroming of vervuiling.", installer),
    F("E14", "Vijf keer mislukt starten van de brander", 2, "Geen vonk of vlam, of gastoevoer.", ["Controleer of de gaskraan open staat.", "Reset één keer. Komt de code terug, bel de installateur."]),
    F("E16", "Valse vlam gemeten", 3, "Ontsteking of gasblok.", installer),
    F("E34", "Storing in de ventilator", 3, "Ventilator of trek.", installer),
    F("E36", "Vlam vijf keer verloren", 2, "Gastoevoer, verstopte luchttoevoer of afvoer.", ["Controleer of de gaskraan open staat en of luchttoevoer en rookgasafvoer buiten vrij zijn.", "Komt de code terug, bel de installateur."]),
    F("E00 / E01 / E02 / E03 / E06 / E07 / E17 / E35 / E37 / E38", "Storing in sensor, printplaat of verbinding", 3, "Elektronica of sensor.", installer)],
  src: ["remeha"] },

{ id: "intergas-hre", brand: "Intergas", name: "HRE en HR eco", cat: "cv-ketels", years: "Alle bouwjaren", unit: null, also: "Kombi Kompakt HRE",
  intro: "Intergas toont een cijfer als storingscode. Code 4 (geen vlam) komt het vaakst voor.", weak: ["Verstopte condensafvoer.", "Lucht in de installatie."], parts: [],
  tasks: CV_TASKS,
  faults: [
    F("1", "Temperatuur te hoog", 2, "Lucht in het systeem of pomp draait niet.", ["Ontlucht de radiatoren en controleer de waterdruk.", "Komt de code terug, bel de installateur."]),
    F("2", "Sensoren S1 en S2 verwisseld", 3, "Bekabeling of sensor.", installer),
    F("4", "Geen vlamsignaal", 2, "Gaskraan dicht, te lage gasdruk, verstopte condensafvoer of ontsteking.", ["Controleer of de gaskraan open staat.", "Kijk of de condensafvoer niet verstopt of bevroren is.", "Reset één keer. Komt de code terug, bel de installateur."]),
    F("5", "Slecht vlamsignaal", 2, "Verstopte condensafvoer, gasdruk of luchttoevoer.", ["Controleer de condensafvoer.", "Komt de code terug, bel de installateur."]),
    F("6", "Fout in de vlamdetectie", 3, "Ontsteking.", installer),
    F("8", "Toerental ventilator onjuist", 3, "Ventilator of bedrading.", installer),
    F("10 / 11 / 12 / 13 / 14", "Fout in sensor S1", 2, "Lucht in het systeem of sensor.", ["Ontlucht de ketel en de radiatoren.", "Komt de code terug, bel de installateur."]),
    F("20 / 21 / 22 / 23 / 24", "Fout in sensor S2", 3, "Bekabeling of sensor.", installer),
    F("27", "Kortsluiting buitenvoeler", 3, "Buitenvoeler of bedrading.", installer),
    F("29 / 30", "Fout in de vlamdetectie", 3, "Terugslagklep of ontsteking.", installer)],
  src: ["intergas"] },

{ id: "vaillant-ecotec", brand: "Vaillant", name: "ecoTEC", cat: "cv-ketels", years: "Alle bouwjaren", unit: null,
  intro: "Vaillant gebruikt F-codes. Bij vorst is een bevroren condensafvoer een veelvoorkomende oorzaak van F28 en F29.", weak: ["Bevroren condensafvoer buiten bij vorst."], parts: [],
  tasks: CV_TASKS,
  faults: [
    F("F22 / F.022", "Geen of te weinig water, druk te laag", 2, "Te weinig water, of een defecte druksensor, pomp of expansievat.", ["Vul bij volgens je handleiding als de druk te laag is.", "Vaillant raadt aan de oorzaak niet zelf te repareren: bel de installateur als de code terugkomt."]),
    F("F28 / F.028", "Geen vlam bij ontsteken", 2, "Bevroren condensafvoer, gastoevoer of ontsteking.", ["Controleer of de gas aan staat en andere gasapparaten werken.", "Bij vorst: giet warm (geen kokend) water over de bevroren condensafvoer buiten.", "Reset de ketel volgens de handleiding.", "Komt de code terug, bel de installateur."]),
    F("F29 / F.029", "Vlam gaat uit", 2, "Vaak een bevroren condensafvoer bij vorst.", ["Ontdooi de condensafvoer met warm water en isoleer de leiding daarna.", "Komt de code terug, bel de installateur."])],
  src: ["vaillantF22", "vaillantF28"] },

{ id: "roborock", brand: "Roborock", name: "Robotstofzuiger (alle modellen)", cat: "stofzuigers", years: "Alle bouwjaren", unit: null, also: "S-, Q- en Saros-serie",
  intro: "Roborock geeft een foutnummer in de app of via een gesproken melding. Veel fouten los je op door borstels of sensoren schoon te maken.", weak: ["Haar rond de hoofd- en zijborstel."], parts: [],
  tasks: [{ m: 0.5, t: "Hoofdborstel en zijborstel vrijmaken van haar" }, { m: 1, t: "Sensoren en laadcontacten schoonvegen", v: 1 }],
  faults: [
    F("1", "Laserkoepel geblokkeerd", 1, "Iets blokkeert de lidar.", ["Haal weg wat de laserkoepel blokkeert en probeer opnieuw."]),
    F("2", "Bumper zit vast", 1, "Bumper klemt.", ["Maak de bumper schoon en tik hem zacht los."]),
    F("3", "Wielen hangen in de lucht", 1, "Robot opgetild of op een rand.", ["Zet de robot op een andere plek en start opnieuw."]),
    F("4", "Fout in de valsensor", 1, "Vuile valsensoren of een afgrond.", ["Maak de valsensoren schoon, zet de robot weg van de rand en start opnieuw."]),
    F("5", "Hoofdborstel vastgelopen", 1, "Haar of draad.", ["Maak de hoofdborstel en de lagers schoon."]),
    F("6", "Zijborstel vastgelopen", 1, "Haar of draad.", ["Haal de zijborstel eraf en maak hem schoon."]),
    F("7", "Wielen zitten vast", 1, "Vuil of obstakel.", ["Zet de robot op een andere plek en start opnieuw."]),
    F("8", "Robot zit vast", 1, "Obstakels.", ["Haal obstakels rond de robot weg."]),
    F("9", "Stofbak ontbreekt", 1, "Bak of filter niet geplaatst.", ["Plaats de stofbak met filter."]),
    F("12", "Accu bijna leeg", 1, "Lege accu.", ["Laad de robot op en probeer opnieuw."]),
    F("13", "Laadfout", 1, "Vuile laadcontacten.", ["Maak de laadcontacten schoon en probeer opnieuw."]),
    F("15", "Muursensor vuil", 1, "Vuile sensor.", ["Maak de muursensor schoon."]),
    F("16", "Robot staat scheef", 1, "Geen vlakke vloer.", ["Zet de robot op een vlakke vloer en start opnieuw."]),
    F("17", "Fout in de zijborstel", 1, "Storing.", ["Reset de robot."]),
    F("18", "Fout in de ventilator", 1, "Storing.", ["Reset de robot."]),
    F("21", "Bovenbumper ingedrukt", 1, "Robot zit onder meubel.", ["Zet de robot op een andere plek en probeer opnieuw."]),
    F("22", "Fout in de dockherkenning", 1, "Vuile sensor.", ["Maak de sensor schoon en probeer opnieuw."]),
    F("23", "Terugkeer naar dock mislukt", 1, "Vuil indicatielampje van het dock.", ["Maak het indicatielampje van het dock schoon en probeer opnieuw."]),
    F("27", "VibraRise-dweilsysteem zit vast", 1, "Obstakel.", ["Controleer het dweilsysteem op blokkades."]),
    F("28", "Robot staat op tapijt", 1, "Tapijt.", ["Zet de robot op een harde vloer en probeer opnieuw."])],
  src: ["roborock"] },

{ id: "philips-volautomaat", brand: "Philips", name: "Volautomaat 2200, 3200, 4300 en 5400", cat: "koffiemachines", years: "2019–heden", unit: null, also: "LatteGo- en stoompijpmodellen",
  intro: "Zeven oorzaken als er weinig of geen koffie uit je Philips-volautomaat komt. De zetgroep wekelijks afspoelen voorkomt de meeste problemen.", weak: ["Een ontbrekende of beschadigde O-ring in de zetgroep."], parts: [["Waterfilter", "AquaClean"], ["Reparatieset O-ring", "Gratis aan te vragen bij Philips Customer Care"]],
  tasks: [{ m: 0.25, t: "Zetgroep uitnemen en afspoelen" }, { w: "Als het ontkalklampje brandt", t: "Ontkalken" }, { w: "Als het display erom vraagt", t: "AquaClean-filter vervangen" }],
  faults: [
    N("Weinig of geen koffie: uitloop verstopt", 1, "Koffieresten in de twee gaatjes van de uitloop.", ["Prik de gaatjes voorzichtig open met een naald of satéprikker."]),
    N("Weinig of geen koffie: lucht in het filter", 1, "Lucht in het waterfilter.", ["Dompel het filter 10 seconden onder in een kom water en knijp zacht om de luchtbellen eruit te krijgen."]),
    N("Weinig of geen koffie: lucht in de leidingen", 1, "Lucht in de leidingen.", ["Tap een paar kopjes heet water."]),
    N("Machine gooit gemalen koffie weg", 1, "Te veel voorgemalen koffie.", ["Doe de gemalen koffie er pas in als de machine klaar is, en gebruik één afgestreken schepje."]),
    N("Koffie loopt slecht door de zetgroep", 2, "Vuile zetgroep of beschadigde O-ring.", ["Spoel de zetgroep wekelijks af onder de kraan.", "Is de O-ring beschadigd: vraag een gratis reparatieset aan bij Philips of laat hem repareren."])],
  src: ["philipsVol"] },

{ id: "bosch-siemens-kookplaat", brand: "Bosch / Siemens", name: "Inductiekookplaat", cat: "kookplaten", years: "Alle bouwjaren", unit: null, also: "Ook Neff (zelfde fabriek)",
  intro: "Bosch-inductiekookplaten tonen F- en E-codes. Houd de toets van de kookzone ingedrukt om de volledige code te zien.", weak: ["Hete pannen naast het bedieningspaneel."], parts: [],
  tasks: [],
  faults: [
    F("F1 / F6", "Kookzone oververhit en uitgeschakeld", 1, "Oververhitting.", ["Laat de zone afkoelen en zet hem weer aan."]),
    F("F2 / F4", "Elektronica oververhit", 1, "Oververhitting.", ["Laat afkoelen, raak een toets aan en ga verder als de melding weg is."]),
    F("F5", "Hete pan te dicht bij het bedieningspaneel", 1, "Warmte bij de elektronica.", ["Haal de pan weg, wacht een paar seconden en ga verder."]),
    F("F8", "Automatische tijdslimiet bereikt", 1, "Zone stond lang aan zonder bediening.", ["Raak een toets aan en stel de zone opnieuw in."]),
    F("U2 / U3", "Kookelement oververhit", 1, "Oververhitting.", ["Laat de elektronica afkoelen en zet de kookplaat weer aan."]),
    F("dE", "Demonstratiestand staat aan", 1, "Zones worden niet warm.", ["Zet de groep in de meterkast 30 seconden uit.", "Raak binnen 3 minuten een toets aan."])],
  src: ["boschKook"] }
);

CATS.push({ id: "kleine-apparaten", name: "Kleine apparaten", one: "apparaat", intro: "Strijkijzers, stoomgeneratoren en ander klein huishoudelijk apparaat: onderhoud en storingen." });

Object.assign(SRC, {
  nefit: ["Nefit – gebruikersinstructie TrendLine II", "https://portal.insmart.nl/downloads/nefit_trendline_ii_Gebruikersinstructie%2BTrendLine%2BII%2BHR-ketels.pdf"],
  atag: ["ATAG – gebruikershandleiding i Zone-serie", "https://atag.compano.com/Data/Environments/000001/Attachment/Bijlage/ATAG%20Belgie/Gebruikershandleiding/8H518100%20GEB%20HANDLEIDING%20i%20Zone-SERIE%20CBR3.0%20NL%20A5%20V1022.pdf"],
  sagePro: ["Sage – handleiding Barista Pro", "https://assets.sageappliances.com/BES878/SES878_EU_UG8_F22_FA_Online.pdf"],
  lgVaat: ["House Digest – foutcodes LG vaatwasser", "https://housedigest.com/1773527/ae-error-code-lg-dishwasher"],
  steel: ["Coolblue – betere zuigkracht steelstofzuiger", "https://www.coolblue.nl/advies/tips-voor-een-betere-zuigkracht-steelstofzuiger.html"],
  slede: ["Coolblue – betere zuigkracht sledestofzuiger", "https://www.coolblue.nl/advies/4-tips-voor-een-betere-zuigkracht-van-jouw-sledestofzuiger.html"],
  zak: ["Coolblue – onderhoud stofzuiger met zak", "https://www.coolblue.nl/advies/hulp-bij-het-onderhouden-van-een-stofzuiger-met-zak.html"],
  zonderzak: ["Coolblue – onderhoud stofzuiger zonder zak", "https://www.coolblue.nl/advies/hulp-bij-het-onderhouden-van-een-stofzuiger-zonder-zak.html"],
  kobold1: ["Vorwerk – Kobold VK7 codes 10, 11, 14, 63", "https://support-switzerland.vorwerk.com/hc/en-us/articles/26910728279068-Fixing-Kobold-VK7-Error-Codes-Code-10-11-14-63"],
  kobold2: ["Vorwerk – Kobold VK7 met SP7 codes 30–36", "https://support-switzerland.vorwerk.com/hc/en-us/articles/26910794826780-VK7-with-SP7-Vacuum-Mop-Troubleshooting-Code-30-36"],
  strijk: ["Coolblue – strijkijzer of stoomgenerator ontkalken", "https://www.coolblue.nl/advies/strijkijzer-stoomgenerator-ontkalken.html"]
});

MODELS.push(
{ id: "nefit-trendline", brand: "Nefit", name: "TrendLine II", cat: "cv-ketels", years: "Alle bouwjaren", unit: null,
  intro: "Nefit TrendLine II toont codes van een cijfer, een letter en drie cijfers, zoals 6A227. De waterdruk hoort tussen 1 en 2 bar te liggen.", weak: ["Te weinig radiatoren open, waardoor de ketel zijn warmte niet kwijt kan."], parts: [],
  tasks: [{ m: 1, t: "Waterdruk controleren", v: 1, s: "Tussen 1,0 en 2,0 bar; bijvullen tot 2,0 bar." }, { w: "Als H03 of H13 verschijnt", t: "Onderhoudsbeurt inplannen bij de installateur" }],
  faults: [
    F("H07", "Waterdruk te laag", 1, "Te weinig water in de installatie.", ["Sluit de vulslang aan, vul de slang met water en open de vulkraan en de vul- en aftapkraan tot 2,0 bar.", "Sluit de kranen, ontlucht de bovenste radiatoren en haal de slang weg."]),
    F("2E207", "Waterdruk te laag", 1, "Te weinig water in de installatie.", ["Vul bij tot 2,0 bar en ontlucht de radiatoren."]),
    F("6A227", "Brander ontsteekt niet", 2, "Gaskraan dicht of ontsteking.", ["Controleer of de gaskraan open staat.", "Reset: houd de resetknop ingedrukt tot Reset verschijnt.", "Komt de code terug, bel de installateur met het keteltype erbij."]),
    F("0A202 / 0Y204", "Ketel kan zijn warmte niet kwijt", 1, "Te weinig radiatoren open.", ["Zet meer radiatoren open."]),
    F("0Y276 / 0Y285", "Te hoge temperatuur gemeten", 2, "Sensoren.", ["Reset de ketel.", "Komt de code terug, bel de installateur."]),
    F("2F260 / 2F345", "Afwijkende temperatuur gemeten", 2, "Sensoren.", ["Reset de ketel.", "Komt de code terug, bel de installateur."]),
    F("H03 / H13", "Onderhoud nodig", 1, "Branderuren of onderhoudsperiode verstreken.", ["Plan een onderhoudsbeurt bij de installateur."])],
  src: ["nefit"] },

{ id: "atag-i-zone", brand: "ATAG", name: "i Zone-serie", cat: "cv-ketels", years: "Alle bouwjaren", unit: null, also: "i-serie",
  intro: "ATAG i Zone-ketels tonen codes van drie tekens. De normale waterdruk ligt tussen 1,5 en 1,7 bar.", weak: [], parts: [],
  tasks: [{ m: 1, t: "Waterdruk controleren", v: 1, s: "Normaal 1,5 tot 1,7 bar bij een koud systeem." }],
  faults: [
    F("108", "Waterdruk onder 0,7 bar", 1, "Te weinig water.", ["Vul de installatie bij tot 1,5–1,7 bar.", "Boven 1,3 bar start automatisch een ontluchtingsprogramma van ongeveer 7 minuten."]),
    F("1P4", "Waterdruk tussen 0,7 en 1,0 bar", 1, "Te weinig water.", ["Vul bij tot 1,5–1,7 bar."]),
    F("101", "Oververhitting", 2, "Te hoge temperatuur.", ["Druk op Reset.", "Komt de code terug, bel de installateur."]),
    F("102", "Fout in de druksensor", 2, "Sensor.", ["Druk op Reset; blijft de code, bel de installateur."]),
    F("104", "Te weinig doorstroming", 2, "Doorstroming.", ["Druk op Reset; blijft de code, bel de installateur."]),
    F("501", "Geen vlam gedetecteerd", 2, "Gastoevoer of ontsteking.", ["Controleer of de gaskraan open staat en druk op Reset.", "Blijft de code, bel de installateur."]),
    F("612", "Ventilator start niet", 2, "Ventilator.", ["Druk op Reset; blijft de code, bel de installateur."]),
    F("110 / 112 / 114 / 142 / 201 / 203 / 303", "Storing in sensor, pomp of printplaat", 3, "110: aanvoersensor, 112: retoursensor, 114: buitenvoeler, 142: pompcommunicatie, 201: warmwatersensor, 303: stuurautomaat.", installer),
    F("109", "Waterdruk te hoog (boven 3 bar)", 1, "Te veel bijgevuld of het expansievat werkt niet goed; de ketel staat uit.", ["Tap via een radiator water af tot de druk tussen 1,5 en 1,7 bar staat.", "Loopt de druk steeds weer op? Bel je installateur."]),
    F("304", "Te vaak gereset", 2, "Vijf resets binnen 15 minuten.", installer),
    F("P", "Ontluchtingsprogramma actief (geen storing)", 1, "Na bijvullen ontlucht de ketel zich ongeveer 7 minuten.", ["Even wachten; daarna werkt de ketel weer."])],
  src: ["atag"] },

{ id: "sage-barista-pro", brand: "Sage", name: "Barista Pro (SES878)", cat: "koffiemachines", years: "2019–heden", unit: null,
  intro: "Espressomachine met ingebouwde molen en een display dat vertelt wanneer reinigen of ontkalken nodig is.", weak: ["Olie van de bonen op de maalschijven."],
  parts: [["Pistonhouder", "54 mm"], ["Waterfilter", "Elke 3 maanden vervangen, eerst 5 minuten weken"]],
  tasks: [{ w: "Als FLUSH op het display staat", t: "Reinigingscyclus met tablet" }, { w: "Als DESCALE op het display staat", t: "Ontkalken (eerst het waterfilter eruit)" }, { m: 3, t: "Waterfilter vervangen" }, { m: 1, t: "Maalschijven en uitloop schoonborstelen", v: 1 }],
  faults: [
    N("ERROR op het display", 3, "Interne storing.", ["Neem contact op met de klantenservice van Sage."]),
    N("Machine stopt ineens", 1, "Thermische beveiliging.", ["Uitzetten, stekker eruit en 30–60 minuten laten afkoelen."]),
    N("FILL TANK of hard geluid zonder water", 1, "Reservoir leeg of niet goed geplaatst.", ["Vul het reservoir en duw het helemaal naar beneden."]),
    N("Shot loopt te snel of te traag", 1, "Maalgraad of dosis.", ["De eerste druppels horen na 8–12 seconden te komen.", "Te snel: fijner malen. Te traag: grover malen.", "Dosis 16–19 gram voor 2 kopjes; aandrukken met 10–15 kg."])],
  src: ["sagePro"] },

{ id: "lg-vaatwasser", brand: "LG", name: "Vaatwasser (alle modellen)", cat: "vaatwassers", years: "Alle bouwjaren met display", unit: null,
  intro: "LG-vaatwassers gebruiken dezelfde soort codes als LG-wasmachines: IE voor toevoer en OE voor afvoer.", weak: [], parts: [], tasks: DISH_TASKS,
  faults: [
    F("IE", "Probleem met de watertoevoer", 1, "Kraan, slang of inlaatventiel.", ["Controleer of de watertoevoer open staat.", "Haal knikken uit de slang."]),
    F("OE", "Probleem met de afvoer", 1, "Vuil filter of verstopte slang.", ["Maak het filter onderin schoon.", "Controleer de afvoerslang op verstoppingen."]),
    F("HE", "Probleem met de verwarming", 2, "Verwarmingselement.", ["Zet de vaatwasser en de groep minstens 10 seconden uit en weer aan.", "Blijft de code, bel een monteur."]),
    F("AE / E1", "Lekkage gedetecteerd", 2, "Lek in rubber, slang of pomp.", ["Zoek het lek: deurrubber, sproeiarmen, slangen en afvoerpomp.", "Vind je het niet, bel een monteur."]),
    F("LE", "Storing in de motor", 3, "Motor of printplaat.", ["Reset de vaatwasser. Blijft de code, bel een monteur."])],
  src: ["lgVaat"] },

{ id: "steelstofzuiger", brand: "Alle merken", name: "Steelstofzuiger zuigt slecht", cat: "stofzuigers", years: "Alle bouwjaren", unit: null, also: "Dyson, Philips, Bosch, Samsung, Miele, Shark, Rowenta, Xiaomi",
  intro: "Vijf oorzaken waardoor een snoerloze steelstofzuiger minder goed zuigt, voor alle merken.", weak: ["Haar rond de draaiende borstel."], parts: [["Filter", "Eén keer per jaar vervangen"]],
  tasks: [{ m: 1, t: "Stofbak schoonmaken en goed laten drogen", v: 1 }, { m: 1, t: "Filter schoonmaken volgens de handleiding", v: 1 }, { m: 12, t: "Filter vervangen" }],
  faults: [
    N("Zuigt slecht: stofbak vol", 1, "Volle of vuile stofbak.", ["Leeg de bak op tijd en maak hem af en toe schoon met water of wat zeep.", "Laat hem helemaal drogen."]),
    N("Zuigt slecht: filter verstopt", 1, "Stof in het filter.", ["Maak het filter schoon volgens de handleiding.", "Vervang het één keer per jaar."]),
    N("Borstel draait slecht", 1, "Haar rond de borstel.", ["Haal de borstel eruit en knip het haar voorzichtig los."]),
    N("Zuigt slecht: buis verstopt", 1, "Speelgoed of elastiekjes in de buis.", ["Controleer de buis op voorwerpen en opgehoopt stof."]),
    N("Zuigt minder als de accu bijna leeg is", 1, "Lage accu.", ["Laad de accu helemaal op voor een grote schoonmaakbeurt."])],
  src: ["steel"] },

{ id: "sledestofzuiger", brand: "Alle merken", name: "Sledestofzuiger met of zonder zak", cat: "stofzuigers", years: "Alle bouwjaren", unit: null, also: "Miele, Philips, Bosch, Nilfisk, Samsung, AEG",
  intro: "Onderhoudsschema en vier oorzaken van slechte zuigkracht. Een luidere stofzuiger wijst vaak op een oud motorfilter.", weak: ["Muffe lucht uit de stofzuiger: het uitblaasfilter is op."], parts: [["Stofzak", "Bij normaal gebruik ongeveer elke 3 maanden"]],
  tasks: [{ m: 3, t: "Stofzak vervangen", s: "Bij ongeveer twee keer per week stofzuigen; eerder met huisdieren." }, { m: 3, t: "Uitblaasfilter schoonmaken", s: "Zonder zak: elke 2 maanden, vervangen ongeveer elke 6 maanden." }, { m: 1, t: "Filter in de stofbak schoonmaken (zakloos)" }, { m: 12, t: "Motorfilter schoonmaken" }],
  faults: [
    N("Zuigt slecht: zak of bak vol", 1, "Te weinig luchtstroom.", ["Leeg een zakloze bak na elk gebruik.", "Vervang een stofzak ongeveer elke 3 maanden."]),
    N("Zuigt slecht: filters vuil", 1, "Stof in de filters.", ["Klop het filter uit en zuig of borstel het schoon.", "Minstens elke 6 maanden, vaker bij veel gebruik."]),
    N("Zuigt slecht: zuigmond vol haar", 1, "Haar en stof in de zuigmond.", ["Haal haar en vuil uit de zuigmond.", "Snij haar rond een turboborstel voorzichtig los."]),
    N("Zuigt slecht: slang of buis verstopt", 1, "Voorwerp in de buis.", ["Haal de buis los en duw de verstopping eruit met een lang, dun voorwerp."]),
    N("Stofzuiger ruikt muf of maakt meer lawaai", 1, "Uitblaasfilter of motorfilter op.", ["Muf: vervang het uitblaasfilter.", "Luider: vervang het motorfilter."])],
  src: ["slede", "zak", "zonderzak"] },

{ id: "vorwerk-kobold-vk7", brand: "Vorwerk", name: "Kobold VK7 en SP7", cat: "stofzuigers", years: "2021–heden", unit: null,
  intro: "De Kobold VK7 toont een codenummer. Veel storingen los je op met een fabrieksreset: accu eruit, aan-knop 10 seconden indrukken, accu terug.", weak: ["Vocht in de SP7-dweilmodule."], parts: [["Filter en filterzak", "Alleen originele Vorwerk-onderdelen"]],
  tasks: [{ w: "Na elk dweilen", t: "Schoonwatertank van de SP7 legen" }],
  faults: [
    F("10", "Communicatiefout", 1, "Storing.", ["Haal de accu één minuut eruit en plaats hem terug."]),
    F("11", "Oververhit", 1, "Te warm.", ["Zet uit en laat 60 minuten afkoelen op een koele plek, uit de zon."]),
    F("14", "Probleem met de motor", 1, "Vol filter of filterzak.", ["Controleer filter en filterzak.", "Doe een fabrieksreset. Komt de code terug, vervang filter en filterzak."]),
    F("63", "Opzetstuk niet herkend", 1, "Vuile contacten.", ["Maak de contacten van het opzetstuk schoon en reset het apparaat."]),
    F("30", "Fout in de pomp (SP7)", 1, "Storing.", ["Koppel de zuigmond los en weer vast."]),
    F("32", "Blokkade bij de trilplaat (SP7)", 1, "Voorwerp.", ["Controleer de trilplaat en haal voorwerpen weg."]),
    F("35", "Vocht gedetecteerd (SP7)", 1, "Vocht in de dweilmodule.", ["Leeg de watertank, leg het apparaat op zijn kant en laat de klep minstens 24 uur open op kamertemperatuur.", "Geen föhn gebruiken."]),
    F("36", "Fout in de sensor (SP7)", 1, "Vocht.", ["Laat drogen zoals bij code 35 en plaats daarna de accu opnieuw."])],
  src: ["kobold1", "kobold2"] },

{ id: "strijkijzer-stoomgenerator", brand: "Alle merken", name: "Strijkijzer en stoomgenerator", cat: "kleine-apparaten", years: "Alle bouwjaren", unit: null, also: "Philips, Tefal, Rowenta, Braun",
  intro: "Kalk is de grootste vijand van een strijkijzer: het verstopt de gaatjes in de zool en geeft bruine vlekken op je kleding.", weak: ["Water laten staan in het reservoir na het strijken."], parts: [["Anti-kalkcassette", "Ongeveer elke 3 maanden vervangen"]],
  tasks: [{ m: 3, t: "Anti-kalkcassette vervangen of kalkopvang uitspoelen" }, { m: 1, t: "Ontkalken bij hard water of vaker dan 3 keer per week strijken" }, { w: "Na elke strijkbeurt", t: "Reservoir leeg laten lopen" }],
  faults: [
    N("Bruine vlekken op de kleding", 1, "Kalk in de zool.", ["Reservoir vullen met water en een scheutje schoonmaakazijn.", "Op de hoogste stand minstens 4 minuten laten opwarmen en een paar keer op de stoomknop drukken.", "Uitzetten en 30 minuten laten staan.", "Zool en reservoir afnemen, naspoelen en leegstomen op een oude theedoek."]),
    N("Weinig stoom", 1, "Kalkaanslag.", ["Start het ontkalkprogramma volgens de handleiding, of ontkalk met de hand zoals hierboven.", "Gebruik voortaan ontkalkt water, bijvoorbeeld uit een filterkan."])],
  src: ["strijk"] }
);

Object.assign(SRC, {
  taStof: ["Test-Aankoop Repairguide – stofzuiger werkt niet", "https://www.test-aankoop.be/repairguide/stofzuigers/stofzuiger-werkt-niet"],
  taBrood: ["Test-Aankoop Repairguide – problemen broodrooster", "https://www.test-aankoop.be/repairguide/broodroosters/veelvoorkomende-problemen-broodrooster"],
  dysonBlock: ["Dyson – blokkadelampje V10", "https://support.dyson.co.nz/support/dyson-v10-vacuum/dyson-v10-absolute-plus-226420-01/troubleshooting/pick-up-issue/the-blockage-light-on-the-handle-lights-up"],
  dysonAccu: ["Home Vacuum Zone – Dyson houdt lading niet vast", "https://homevacuumzone.com/why-is-my-dyson-not-holding-its-charge/"]
});

const dyson = MODELS.find(m => m.id === "dyson-v-serie");
dyson.name = "V6, V7, V8, V10, V11, V12, V15";
dyson.faults.push(
  N("Blokkadelampje op de handgreep brandt", 1, "De stofzuiger ziet een verstopping.", ["Haal alle hulpstukken eraf.", "Zet de schakelaar op max en houd de trekker 10 seconden ingedrukt.", "Blijft het lampje branden, neem contact op met Dyson."]),
  N("Accu loopt snel leeg", 1, "Verstopping, oude accu of vuile contacten.", ["Een verstopte stofzuiger trekt de accu sneller leeg: leeg de bak, was het filter en laat het 24 uur drogen.", "Maak de laadcontacten schoon met een droge doek.", "Accu's ouder dan ongeveer 3 jaar zijn vaak aan vervanging toe. Onder 2 jaar valt de accu onder de garantie van Dyson."]),
  N("Accu knippert rood", 2, "Accufout of te warm.", ["Haal de lader eruit en laat minstens 30 minuten afkoelen.", "Blijft hij rood knipperen, dan moet de accu waarschijnlijk vervangen worden."])
);
dyson.src.push("dysonBlock", "dysonAccu");

MODELS.push(
{ id: "stofzuiger-werkt-niet", brand: "Alle merken", name: "Stofzuiger werkt niet", cat: "stofzuigers", years: "Alle bouwjaren", unit: null, also: "Sledestofzuigers, steelstofzuigers en robots",
  intro: "Zeven oorzaken als je stofzuiger het helemaal niet meer doet. Is hij jonger dan twee jaar, dan valt hij mogelijk onder de wettelijke garantie.", weak: [], parts: [],
  tasks: [],
  faults: [
    N("Stofzuiger gaat niet aan", 1, "Stekker, stopcontact of accu.", ["Stekker eruit, 30 seconden wachten en terug.", "Test het stopcontact met een ander apparaat.", "Laad de accu helemaal op."]),
    N("Hij draait, maar zuigt nauwelijks", 1, "Zak, bak of filters vol of verkeerd geplaatst, of de schuif op de buis staat open.", ["Controleer of zak of bak en filters goed zitten.", "Sluit de luchtschuif op de buis helemaal."]),
    N("Snoer beschadigd", 2, "Kapot snoer, soms met brandplekken.", ["Vervang de hele snoerhaspel. Daarvoor moet de stofzuiger open; volg de instructies voor jouw model of ga naar een Repair Café."]),
    N("Aan/uit-knop werkt niet", 2, "Slecht contact of kapotte schakelaar.", ["Haal de stofzuiger uit elkaar en kijk of de schakelaar te vervangen is. Maak eerst foto's van hoe alles vastzit."]),
    N("Snoerloze stofzuiger: accu doet het niet", 1, "Versleten of defecte accu.", ["Laad volledig op.", "Probeer een vervangende accu. Werkt die, dan lag het aan de oude.", "Een specialist kan soms nieuwe cellen in de oude accu plaatsen."]),
    N("Robotstofzuiger laadt niet op", 1, "Laadstation defect.", ["Controleer of het station in een werkend stopcontact zit.", "Laad je met een andere accu ook niet op, vervang dan het station."]),
    N("Motor of elektronica kapot", 3, "Motor- of elektronicafout.", ["Laat het testen door een reparateur; de motor hoeft vaak niet vervangen te worden."])],
  src: ["taStof"] },

{ id: "broodrooster", brand: "Alle merken", name: "Broodrooster werkt niet", cat: "kleine-apparaten", years: "Alle bouwjaren", unit: null, also: "Philips, Tefal, Bourgini, Smeg, Inventum",
  intro: "Een broodrooster heeft weinig onderdelen. Vaak zijn het kruimels, soms het verwarmingselement of de elektromagneet die de hendel omlaag houdt.", weak: ["Kruimels tussen de elektromagneet en het metalen plaatje."], parts: [],
  tasks: [{ m: 1, t: "Kruimellade legen en rooster ondersteboven uitschudden", v: 1 }],
  faults: [
    N("Hendel blijft niet omlaag", 1, "Kruimels bij de elektromagneet.", ["Leeg de kruimellade en schud de rooster ondersteboven uit, dan testen.", "Helpt dat niet: stekker eruit, open maken tot bij de elektromagneet en het kruimellaagje wegborstelen."]),
    N("Hendel blijft omlaag maar wordt niet warm", 3, "Verwarmingselement doorgebrand.", ["Houd je hand boven de rooster terwijl je de hendel omlaag houdt: geen warmte wijst op het element.", "Een element met gloeidraad is soms te repareren, een glazen buis niet. Laat het doen door een reparateur of Repair Café."]),
    N("Warm, maar de hendel springt meteen terug", 2, "Elektromagneet defect.", ["Stekker eruit en meet de spoel met een multimeter op ohm: een paar honderd ohm is goed.", "Geeft de meter OL, dan is de spoel kapot; vervangen is dan meestal handiger dan repareren."])],
  src: ["taBrood"] }
);

CATS.splice(5, 0,
  { id: "ventilatie", name: "Ventilatie en WTW", one: "ventilatiesysteem", intro: "Mechanische ventilatie en warmteterugwinning: filters, storingscodes en wat je zelf onderhoudt." },
  { id: "warmtepompen", name: "Warmtepompen", one: "warmtepomp", intro: "Onderhoud en storingen van (hybride) warmtepompen: wat je zelf controleert en wanneer de installateur moet komen." }
);

Object.assign(SRC, {
  itho: ["Itho Daalderop – handleiding CVE ECO RFT", "https://www.lueftungsfabrik.de/media/ventilatieshop/downloads/pdf/handleiding-cve-eco-rft-nl.pdf"],
  brinkHR: ["Brink – storingen Renovent HR", "https://www.brinkclimatesystems.nl/documenten/7-storing-611175.pdf"],
  brinkExc: ["Brink – informatie over uw Renovent Excellent", "https://www.brinkclimatesystems.nl/documenten/informatie-over-uw-renovent-excellent-614027.pdf"],
  brinkExcOnd: ["Brink – onderhoud Renovent Excellent 300/400", "https://www.brinkclimatesystems.nl/documenten/9-onderhoud-612010.pdf"],
  brinkFlair: ["Brink – displayweergave Flair 300", "https://www.brinkclimatesystems.nl/documenten/6-display-weergave-616226.pdf"],
  daikin: ["Daikin – bedieningshandleiding Altherma", "https://www.daikin.nl/content/dam/document-library/operation-manuals/heat/air-to-water-heat-pump-low-temperature/ehfz-d3v/EHFZ-D3V_Operation%20manual_4PNL596819-1B_Dutch.pdf"],
  mieleHandl: ["Miele – gebruiksaanwijzing wasmachine (TwinDos)", "https://media.miele.com/downloads/90/8f/00_C7F12828F9521FE199C6AE6B8FC7908F.pdf"],
  intergasKK: ["Intergas – installatievoorschrift Kombi Kompakt HRE", "https://www.intergas-verwarming.nl/app/uploads/2018/01/88557809-Installatievoorschrift-Kombi-Kompakt-HRE.pdf"]
});

const mw = MODELS.find(m => m.id === "miele-wasmachine");
mw.faults.push(
  F("F10", "Watertoevoer: waterdruk te laag", 1, "De waterdruk is lager dan 1 bar.", ["Controleer de waterdruk aan de kraan.", "Kan de druk niet hoger, zet dan de functie Lage waterdruk aan bij Instellingen > Functies."]),
  F("F210", "Circulatie: afvoerpompen vervuild", 1, "Vuile afvoerpompen en spuitmond in het deurrubber.", ["Maak de afvoerpompen en de spuitmond in het deurrubber schoon.", "Start het programma opnieuw. Komt de melding terug, bel Miele."]),
  F("F585", "Spuitmond en afvoerfilter vervuild", 1, "Vuile spuitmond in het deurrubber en afvoerfilter.", ["Maak de spuitmond en het afvoerfilter schoon.", "Start het programma opnieuw. Helpt het niet, bel Miele."]),
  N("Machine reinigen?", 1, "Lang geen programma boven 60 °C gedraaid.", ["Draai het programma Machine reinigen met machinereiniger of waspoeder."]),
  N("Dosering controleren", 1, "Te veel schuim.", ["Controleer de hoeveelheid wasmiddel en verlaag de basisdosering in stappen van 10%."]),
  N("TwinDos reinigen of gebruiken", 1, "TwinDos lang niet gebruikt.", ["Gebruik TwinDos bij een van de volgende wasbeurten, of start direct de TwinDos-reiniging."])
);
mw.src.push("mieleHandl");

const ig = MODELS.find(m => m.id === "intergas-hre");
ig.faults.push(
  N("Druk knippert op het display", 1, "CV-druk lager dan 0,5 bar.", ["Vul de installatie bij tot 1–2 bar (koud systeem). Maximaal 3 bar."]),
  N("Display toont 80 en 1", 3, "De cv-pomp draait niet.", installer)
);
ig.also = "Kombi Kompakt HRE, HR eco";
ig.src.push("intergasKK");

MODELS.push(
{ id: "itho-cve", brand: "Itho Daalderop", name: "CVE mechanische ventilatie", cat: "ventilatie", years: "Alle bouwjaren", unit: null, also: "CVE ECO RFT, CVE-S",
  intro: "De mechanische ventilatiebox die in veel Nederlandse woningen zit. Zelf maak je de ventielen schoon en vervang je de batterij van de afstandsbediening.", weak: ["Vuile ventielen en roosters in keuken en badkamer."], parts: [["Batterij afstandsbediening", "CR2032 3V, gaat ongeveer 7 jaar mee"]],
  tasks: [{ m: 2.5, t: "Ventielen en roosters controleren en schoonmaken", s: "Elke 2 à 3 maanden. Terugplaatsen in hetzelfde kanaal, niet verdraaien." }, { m: 48, t: "Kanalen laten controleren" }, { m: 54, t: "Waaier laten reinigen door installateur", s: "Na ongeveer 4 à 5 jaar." }],
  faults: [
    N("Ventilator draait niet", 1, "Geen stroom of vervuilde waaier.", ["Controleer of de stekker in het stopcontact zit en er spanning is.", "Is de waaier vuil, laat die dan reinigen door een installateur."]),
    N("Reageert niet op de afstandsbediening", 1, "Lege batterij of te ver weg.", ["Vervang de batterij (CR2032). Opnieuw aanmelden is niet nodig.", "Ga dichter bij de unit staan of meld de bediening opnieuw aan."]),
    N("Stand verandert vanzelf", 1, "Timer afgelopen of bediening van de buren aangemeld.", ["Na de timer gaat de unit terug naar de vorige stand.", "Reageert hij op de bediening van de buren, reset dan volgens de handleiding."])],
  src: ["itho"] },

{ id: "brink-renovent-hr", brand: "Brink", name: "Renovent HR WTW", cat: "ventilatie", years: "Alle bouwjaren", unit: null, also: "Renovent HR Medium en Large",
  intro: "Warmteterugwinunit met een display dat F-codes toont. FIL is geen storing maar een filtermelding.", weak: ["Vuile filters veroorzaken onbalans (F8)."], parts: [["Filters", "Originele Brink-filters"]],
  tasks: [{ w: "Als FIL op het display staat", t: "Filters schoonmaken", s: "Daarna F en − samen 3 seconden indrukken om te resetten." }, { m: 6, t: "Filters vervangen", v: 1 }],
  faults: [
    F("FIL", "Filters schoonmaken of vervangen", 1, "Geen storing.", ["Maak de filters schoon.", "Houd F en − samen 3 seconden ingedrukt om de melding te resetten."]),
    F("F8", "Onbalans tussen toevoer en afvoer", 1, "Vaak vuile filters.", ["Maak de filters schoon en druk op OK.", "Blijft de code, bel de installateur."]),
    F("F1 / F2", "Toevoerventilator gestopt of geen verbinding", 3, "Ventilator.", ["Bel de installateur."]),
    F("F4 / F5", "Afvoerventilator gestopt of geen verbinding", 3, "Ventilator.", ["Bel de installateur."]),
    F("F9 / F10", "Temperatuursensor defect", 2, "Sensor; de unit draait door, maar zonder bypass.", ["Bel de installateur."])],
  src: ["brinkHR"] },

{ id: "brink-renovent-excellent", brand: "Brink", name: "Renovent Excellent en Flair", cat: "ventilatie", years: "Alle bouwjaren", unit: null, also: "Renovent Excellent 180/300/400/450, Flair 300",
  intro: "Op het display verschijnt FILTER als de filters schoon moeten. Vervang ze minstens twee keer per jaar.", weak: ["Een droge sifon geeft rioollucht, vooral in de zomer.", "Veel bouwstof in de eerste weken in een nieuwbouwwoning."], parts: [["Filters", "Originele Brink-filters, minstens 2 keer per jaar"]],
  tasks: [{ w: "Als FILTER op het display staat", t: "Filters schoonmaken" }, { m: 6, t: "Filters vervangen" }, { m: 3, t: "Sifon met water vullen", v: 1, s: "Vooral in de zomer, tegen rioollucht." }, { m: 36, t: "Warmtewisselaar en ventilatoren laten reinigen door installateur" }],
  faults: [
    N("FILTER op het display", 1, "Filters moeten schoon of vervangen.", ["Houd − 5 seconden ingedrukt om de filterklep te openen.", "Haal de filters eruit, maak ze schoon en plaats ze in dezelfde richting terug.", "Sluit de klep en zet de unit aan door − 5 seconden in te drukken.", "Druk kort op o om de filterteller te resetten."]),
    N("Rioollucht in huis", 1, "Droge sifon.", ["Vul de sifon van de condensafvoer met water."]),
    N("Storingssymbool op het display", 2, "Storing in de unit.", ["Zoek de melding op in de Brink Service App.", "Lukt het niet, bel de installateur."])],
  src: ["brinkExc", "brinkExcOnd", "brinkFlair"] },

{ id: "daikin-altherma", brand: "Daikin", name: "Altherma warmtepomp", cat: "warmtepompen", years: "Alle bouwjaren", unit: null, also: "Ook hybride Altherma",
  intro: "Bij een storing verschijnt een melding op het startscherm; met de infoknop lees je de beschrijving. De waterdruk hoort boven 1 bar te liggen.", weak: [], parts: [],
  tasks: [{ m: 1, t: "Waterdruk controleren (boven 1 bar)" }, { m: 12, t: "Jaarlijks onderhoud door de installateur" }],
  faults: [
    N("Storingsmelding op het startscherm", 2, "Storing in de warmtepomp.", ["Druk op de infoknop voor de beschrijving.", "Bij een warmtepompstoring kun je kiezen of de reserveverwarming het overneemt. Dat kost veel meer stroom.", "Neem contact op met je installateur."]),
    N("Koudemiddellek", 3, "Lek in het koelcircuit.", ["Zet verbrandingstoestellen uit, ventileer de ruimte en gebruik de warmtepomp niet.", "Bel je installateur."])],
  src: ["daikin"] }
);

Object.assign(SRC, {
  cbAfvoer: ["Coolblue – afvoer wasmachine verstopt", "https://www.coolblue.nl/advies/afvoer-wasmachine-verstopt.html"],
  cbStankWas: ["Coolblue – stank verwijderen uit wasmachine", "https://www.coolblue.nl/advies/stank-verwijderen-wasmachine.html"],
  cbLekWas: ["Coolblue – waarom lekt mijn wasmachine", "https://www.coolblue.nl/advies/hoe-weet-ik-waarom-mijn-wasmachine-lekt.html"],
  cbHerrie: ["Coolblue – wasmachine maakt herrie", "https://www.coolblue.nl/advies/wasmachine-maakt-herrie.html"],
  idWas: ["ID.nl – meest voorkomende wasmachinestoringen", "https://id.nl/huis-en-entertainment/huishouden/wassen-en-drogen/de-meest-voorkomende-wasmachinestoringen-en-oplossingen"],
  cbVaatSchoon: ["Coolblue – vaatwasser maakt niet goed schoon", "https://www.coolblue.nl/advies/hoe-verzorg-ik-mijn-vaatwasser.html"],
  cbVaatStank: ["Coolblue – stinkende vaatwasser", "https://www.coolblue.nl/advies/tips-voor-stinkende-vaatwassers.html"],
  cbVaatDroog: ["Coolblue – vaatwasser droogt niet goed", "https://www.coolblue.nl/advies/vaatwasser-droogt-niet-goed.html"],
  cbWaterstop: ["Coolblue – waterstop van vaatwasser resetten", "https://www.coolblue.nl/advies/hoe-reset-je-de-waterstop-van-een-vaatwasser.html"],
  cbVaatWater: ["Coolblue – vaatwasser krijgt geen water", "https://www.coolblue.nl/advies/waarom-krijgt-je-vaatwasser-geen-water.html"],
  cbVaatLek: ["Coolblue – lekkage vaatwasser", "https://www.coolblue.nl/advies/hoe-los-je-lekkage-bij-je-vaatwasser-op.html"],
  cbVaatWerkt: ["Coolblue – vaatwasser werkt niet", "https://www.coolblue.nl/advies/de-vaatwasser-werkt-of-reageert-niet.html"],
  cbVaatKalk: ["Coolblue – vaatwasser ontkalken", "https://www.coolblue.nl/advies/tips-ontkalken-vaatwasser.html"],
  cbDroogt: ["Coolblue – droger droogt niet goed", "https://www.coolblue.nl/advies/wasdroger-droogt-niet-goed.html"],
  cbDroogStank: ["Coolblue – stank in wasdroger", "https://www.coolblue.nl/advies/hoe-los-je-de-stank-in-je-wasdroger-op.html"],
  cbDroogLawaai: ["Coolblue – lawaai van wasdroger", "https://www.coolblue.nl/advies/hoe-los-je-het-lawaai-van-een-wasdroger-op.html"]
});

const AM = "Alle merken";
const G = (id, name, cat, intro, faults, src, extra = {}) => ({ id, brand: AM, name, cat, years: "Alle bouwjaren", unit: null, intro, weak: [], parts: [], tasks: [], faults, src, ...extra });

MODELS.push(
G("wasmachine-pompt-niet-af", "Wasmachine pompt niet af", "wasmachines", "Blijft er water in de trommel staan? Vaak zit de verstopping niet in de machine maar in de sifon of afvoer. Zo spoor je hem op, van makkelijk naar lastig.", [
  N("Water blijft in de trommel staan", 1, "Verstopt pompfilter, sifon of afvoer, of een geknikte slang.", ["Zet een bak voor de machine, open het klepje onderaan en draai het pompfilter los. Haal knoopjes en munten eruit en spoel het filter af.", "Controleer de afvoerslang op knikken.", "Maak de sifon (zwanenhals) schoon: emmer eronder, losdraaien en uitspoelen.", "Giet langzaam een emmer kokend water met een pak soda door een trechter in de afvoer, wacht 10 minuten en spoel na.", "Helpt dat niet: gebruik een trekveer of ontstopper, of bel een loodgieter (vraag vooraf de prijs)."])],
  ["cbAfvoer", "idWas"], { also: "Bosch, Siemens, Samsung, LG, AEG, Miele, Whirlpool, Beko", tasks: [{ m: 2, t: "Pompfilter schoonmaken", v: 1 }] }),

G("wasmachine-stinkt", "Wasmachine stinkt", "wasmachines", "Een stinkende wasmachine komt door zeepresten, huidschilfers en vuil in het rubber, filter en zeepbakje. Bacteriën gaan pas dood boven 60 °C.", [
  N("Wasmachine of was ruikt muf", 1, "Vuil in trommel, rubber, filter en zeepbakje.", ["Draai met lege trommel een programma op 90 of 95 °C, met een kopje azijn in het zeepbakje.", "Maak het deurrubber schoon met heet water en afwasmiddel; gebruik een oude tandenborstel voor hardnekkig vuil.", "Spoel het pompfilter schoon.", "Haal het zeepbakje eruit en spoel het onder warm water.", "Laat na het wassen de deur open zodat de trommel droogt."]),
  N("Nieuwe wasmachine ruikt naar plastic", 1, "Plastic onderdelen warmen op.", ["Draai een paar wasbeurten; de geur verdwijnt vanzelf."])],
  ["cbStankWas"], { tasks: [{ m: 1, t: "Kookwas op 90 °C met lege trommel" }, { m: 1, t: "Deurrubber, filter en zeepbakje schoonmaken" }] }),

G("wasmachine-lekt", "Wasmachine lekt", "wasmachines", "Waar het water vandaan komt, vertelt wat de oorzaak is. Zo vind je het lek.", [
  N("Lek bij de slangen", 1, "Losse of beschadigde slang.", ["Controleer of beide slangen aan beide kanten vastzitten.", "Vervang een beschadigde slang direct."]),
  N("Lek bij de afvoerpijp", 1, "Slang te diep in de afvoer of verstopte afvoer.", ["De afvoerslang mag maximaal 15 cm in de afvoer steken; een beugel houdt hem op zijn plek.", "Maak de sifon schoon en spoel de afvoer door met kokend water en soda."]),
  N("Water aan de voorkant", 1, "Wasgoed tussen deur en trommel, of een gescheurde manchet.", ["Stekker eruit en kraan dicht, de machine met een handdoek eronder 40 seconden achterover kantelen en het wasgoed weghalen.", "Is het rubber rond de trommel gescheurd, laat het dan vervangen."]),
  N("Water onder de machine", 2, "Pompfilter niet dicht of lek binnenin.", ["Controleer of het pompfilter rechtsonder goed dicht zit.", "Lekt het binnenin: kraan dicht, stekker eruit en een monteur bellen."]),
  N("Zeepbakje loopt over", 1, "Opgehoopt wasmiddel.", ["Haal het zeepbakje eruit en schrob het schoon onder de kraan."])],
  ["cbLekWas"]),

G("wasmachine-maakt-herrie", "Wasmachine maakt herrie of loopt", "wasmachines", "Schudden, piepen of bonken: aan het geluid hoor je wat er mis is.", [
  N("Wasmachine wiebelt of loopt", 1, "Niet waterpas.", ["Zet de machine waterpas met een waterpas en draai de pootjes bij.", "Zet de borgmoeren vast met een steeksleutel; controleer ze af en toe."]),
  N("Trilt bij centrifugeren", 1, "Ongelijk verdeelde of te volle trommel.", ["Haal wat was eruit, verdeel de rest en start opnieuw.", "Probeer een ander centrifugetoerental."]),
  N("Piept of jankt bij centrifugeren", 3, "Versleten lagers.", ["Draai de lege trommel met de hand. Loopt hij stroef of hobbelig, dan zijn de lagers versleten. Laat ze vervangen."]),
  N("Bonkt bij centrifugeren", 2, "Transportbouten nog aanwezig of versleten schokdempers.", ["Controleer of de transportbouten achterop zijn verwijderd.", "Laat versleten schokdempers of veren vervangen."]),
  N("Tikt onderin", 1, "Voorwerp in het pompfilter.", ["Maak het pompfilter schoon; knoopjes, speldjes of ritsen zijn vaak de oorzaak."]),
  N("Klapt in de waterleiding", 2, "Lucht in de leiding (waterslag).", ["Draai de hoofdkraan dicht en de kraan van de machine dicht en weer open.", "Laat zo nodig een waterslagdemper plaatsen."])],
  ["cbHerrie"]),

G("vaatwasser-wordt-niet-schoon", "Vaatwasser maakt niet goed schoon", "vaatwassers", "Zes oorzaken als de vaat vuil uit de vaatwasser komt, van inruimen tot onderhoud.", [
  N("Vaat komt vuil uit de machine", 1, "Inruimen, sproeiarmen, zout of onderhoud.", ["Zet pannen onderin en kopjes boven, schuin zodat water erbij kan, en niet te vol.", "Prik verstopte gaatjes in de sproeiarmen open met een tandenstoker en spoel ze af.", "Vul zout en glansspoelmiddel apart bij; tabletten zijn niet genoeg.", "Maak de filters schoon, veeg het deurrubber af en ontkalk regelmatig.", "Kies bij erg vuile vaat een intensief programma en draai af en toe een heet programma."])],
  ["cbVaatSchoon"], { also: "Bosch, Siemens, Miele, AEG, Samsung, Beko", tasks: DISH_TASKS }),

G("vaatwasser-stinkt", "Vaatwasser stinkt", "vaatwassers", "Een stinkende vaatwasser komt door etensresten in filter, sproeiarmen, deurrubber en leidingen.", [
  N("Vaatwasser ruikt vies", 1, "Etensresten, vuil rubber of kalk.", ["Schraap borden af voor je ze inruimt.", "Spoel filter en sproeiarmen af onder de kraan.", "Veeg de deurrubbers af met een vochtige doek.", "Ontkalk zo nodig en draai een vaatwasserreiniger.", "Een geurverfrisser maskeert alleen; gebruik die pas als laatste stap."])],
  ["cbVaatStank"]),

G("vaatwasser-droogt-niet", "Vaatwasser droogt niet goed", "vaatwassers", "Natte vaat na afloop? Vijf oorzaken en oplossingen.", [
  N("Vaat is nat na het programma", 1, "Te weinig glansspoelmiddel, deur dicht, inruimen of programma.", ["Vul glansspoelmiddel zelf bij en zet de dosering laag.", "Zet de deur ongeveer 15 minuten na afloop open, alleen als je werkblad vochtbestendig is.", "Ruim niet te vol in en zet vaat schuin zodat water eraf loopt.", "Kies een programma met droogfase; snel- en spoelprogramma's drogen vaak niet.", "Maak sproeiarmen en filter schoon."])],
  ["cbVaatDroog"]),

G("vaatwasser-geen-water", "Vaatwasser krijgt geen water of lekt", "vaatwassers", "Geen water of juist water op de vloer? Meestal ligt het aan de kraan, slang of waterstop.", [
  N("Vaatwasser krijgt geen water", 1, "Kraan dicht, slang geknikt of waterstop geactiveerd.", ["Draai de kraan open; werkt hij niet, vervang de kraan.", "Volg de slang en haal knikken eruit.", "Controleer en reset de waterstop."]),
  N("Waterstop resetten", 1, "De waterstop heeft een lek of kortsluiting gezien.", ["Kraan dicht, emmer eronder en stekker eruit.", "Schroef de slang helemaal los van de kraan.", "Losse waterstop: druk het gekleurde (meestal rode) pinnetje in. In de slang: dop eraf met een tang, schoonmaken en dop terug.", "Slang terug, kraan langzaam open en op lekken controleren."]),
  N("Vaatwasser lekt", 1, "Versleten sifon of kraan, knik, verstopte afvoer of gedeelde afvoer.", ["Lekt het bij sifon of kraan: vervang het onderdeel.", "Haal knikken uit de toevoerslang en maak een verstopte afvoerslang vrij.", "Zet de plastic bocht weer op de slang.", "Delen wasmachine en vaatwasser één afvoer, plaats dan een Y-stuk."])],
  ["cbVaatWater", "cbWaterstop", "cbVaatLek"]),

G("vaatwasser-werkt-niet", "Vaatwasser werkt niet of ontkalken", "vaatwassers", "Doet de vaatwasser niets? Vier controles. Plus: zo ontkalk je hem, ongeveer twee keer per jaar.", [
  N("Vaatwasser start niet of reageert niet", 1, "Stroom, blokkade, deur of filter.", ["Controleer stekker, kabel en meterkast.", "Reset de vaatwasser volgens de handleiding.", "Brandt het lampje maar start er niets: sluit de deur goed.", "Maak het filter onderin schoon."]),
  N("Vaatwasser ontkalken", 1, "Kalkaanslag; doe dit ongeveer twee keer per jaar.", ["Maak de machine en het filter leeg.", "Start een programma van minstens 65 °C zonder vaatwasmiddel.", "Zet na 30 minuten de deur een klein stukje open om te pauzeren.", "Strooi ontkalker over de bodem volgens de verpakking, sluit de deur en laat het programma afmaken.", "Gebruik geen azijn; dat beschadigt de vaatwasser."])],
  ["cbVaatWerkt", "cbVaatKalk"], { tasks: [{ m: 6, t: "Vaatwasser ontkalken" }] }),

G("droger-droogt-niet", "Droger droogt niet goed", "drogers", "Natte was uit de droger? Acht oorzaken, van een vol filter tot een vuile vochtsensor.", [
  N("Was blijft vochtig", 1, "Te vol, vol filter, vuile condensor of vochtsensor, te weinig centrifugeren of verkeerd programma.", ["Blijf onder de maximale belading en droog katoen en synthetisch apart.", "Leeg het pluizenfilter na elke droogbeurt.", "Maak de condensor schoon: condensdroger afspoelen, warmtepompdroger stofzuigen met een borstel.", "Maak de vochtsensor (metalen strip bij de deuropening) elke maand schoon met een vochtige doek.", "Centrifugeer de was op 1400 of 1600 toeren.", "Kies voor handdoeken extra droog of kastdroog extra.", "Controleer een afvoerslang op knikken en verstoppingen."])],
  ["cbDroogt"], { also: "Bosch, Siemens, Miele, AEG, Samsung, Whirlpool, Beko", tasks: [{ m: 1, t: "Vochtsensor schoonmaken" }, ...DRYER_TASKS] }),

G("droger-stinkt-of-maakt-lawaai", "Droger stinkt of maakt lawaai", "drogers", "Brandlucht, muffe geur, klappen of piepen: wat normaal is en wat je moet oplossen.", [
  N("Brandlucht", 2, "Verstopt pluizenfilter; ook een veiligheidsrisico.", ["Leeg het pluizenfilter na elke droogbeurt en zuig de filteropening maandelijks uit."]),
  N("Muffe geur", 1, "Vuile condensor.", ["Condensdroger: condensor elke 2 à 3 maanden uitnemen en afspoelen.", "Warmtepompdroger: voorkant van de condensor stofzuigen met een borstel."]),
  N("Klap bij de eerste keer starten", 1, "Transportslot wordt losgemaakt.", ["Dat is normaal."]),
  N("Zoemen", 1, "Compressor of ventilatoren.", ["Dat is normaal."]),
  N("Metalen geklingel", 1, "Munt, speld of knoop in de trommel.", ["Kijk met een spiegeltje langs de rand van de trommel en haal het voorwerp weg."]),
  N("Piepen of schuren", 1, "Vol filter of vuile condensor.", ["Maak het pluizenfilter en de condensor schoon."]),
  N("Trillen", 1, "Losse stapelset.", ["Zet de banden van de stapelset vast, of plaats een stapelset."])],
  ["cbDroogStank", "cbDroogLawaai"])
);

CATS.splice(CATS.findIndex(c => c.id === "warmtepompen") + 1, 0, { id: "airco", name: "Airco's", one: "airco", intro: "Split-airco's: filters schoonmaken, storingen en wat je zelf mag doen." });

Object.assign(SRC, {
  daikinAirco: ["Daikin – bedieningshandleiding FTXM/CTXM", "https://www.daikin.eu/content/dam/document-library/operation-manuals/ac/split/FTXM-N,CTXM-N_3PNL485919-8S_Operation%20manual_Dutch.pdf"],
  vertuoFaq: ["Nespresso – Vertuo Next knippert oranje of rood", "https://www.contact.nespresso.com/faq/au/en/detail/8884"],
  vertuoKalk: ["Coolblue – Nespresso Vertuo Next ontkalken", "https://www.coolblue.nl/advies/hoe-ontkalk-je-jouw-nespresso-vertuo-next.html"],
  compacto: ["Inventum – gebruikershandleiding Compacto", "https://downloads.inventum.com/wp-content/uploads/2025/11/210466-09008-Gebruikershandleiding-Compacto_v1.1.pdf"]
});

MODELS.push(
{ id: "daikin-split-airco", brand: "Daikin", name: "Split-airco (FTXM, CTXM)", cat: "airco", years: "Alle bouwjaren", unit: null, also: "Perfera, Emura, Comfora",
  intro: "Het belangrijkste onderhoud doe je zelf: de luchtfilters elke twee weken schoonmaken. Een foutcode geef je door aan de installateur.", weak: ["Vuile filters: minder koeling en meer stroomverbruik."], parts: [["Titaniumapatietfilter", "Om de 3 jaar vervangen (KAF970A46)"]],
  tasks: [{ m: 0.5, t: "Luchtfilters schoonmaken" }, { m: 6, t: "Titaniumapatietfilter schoonmaken" }, { m: 36, t: "Titaniumapatietfilter vervangen" }],
  faults: [
    N("Luchtfilters schoonmaken", 1, "Elke twee weken nodig.", ["Zet de airco uit en schakel de stroom uit.", "Druk het lipje in het midden van elk filter in, trek het omlaag en haal het eruit.", "Spoel af of stofzuig. Week 10–15 minuten in lauw water, eventueel met een mild middel.", "Laat drogen in de schaduw en plaats terug."]),
    N("Bedieningslampje knippert met een foutcode", 2, "De unit meldt een storing.", ["Noteer de code en het unitnummer op de afstandsbediening.", "Geef de code door aan je installateur."]),
    N("Water lekt uit de binnenunit", 2, "Lekkage.", ["Stop de airco en neem contact op met je installateur."]),
    N("Brandlucht of zekering slaat steeds af", 3, "Elektrische storing.", ["Stop direct, schakel de stroom uit en neem contact op met je dealer."])],
  src: ["daikinAirco"] },

{ id: "nespresso-vertuo-next", brand: "Nespresso", name: "Vertuo Next", cat: "koffiemachines", years: "2020–heden", unit: null, also: "Krups en Magimix-uitvoeringen",
  intro: "Een knipperend oranje of rood lampje heeft meestal een eenvoudige oorzaak. Drie keer oranje en één keer wit betekent ontkalken.", weak: ["De koffieknop blijft knipperen als de hendel niet helemaal dicht is."], parts: [["Ontkalker", "Nespresso-ontkalker of universele ontkalker"]],
  tasks: [{ m: 3, t: "Ontkalken", s: "Of zodra de knop 3 keer oranje en 1 keer wit knippert." }],
  faults: [
    N("Knop knippert oranje of rood", 1, "Hendel open, tank leeg, oude cup of geblokkeerde zetkop.", ["Duw de hendel helemaal naar links tot hij klikt.", "Vul het waterreservoir.", "Haal de gebruikte cup eruit.", "Open de kop en draai het bovenste ronde deel voorzichtig heen en weer."]),
    N("Cup wordt niet herkend", 1, "Resten op de cupherkenning.", ["Voer de reinigingsprocedure twee keer uit."]),
    N("Elektronische fout", 1, "Storing.", ["Stekker eruit, 10 seconden wachten en terugsteken.", "Blijft het probleem, doe een fabrieksreset."]),
    N("Ontkalken (3 keer oranje, 1 keer wit)", 1, "Kalk; duurt ongeveer 20 minuten.", ["Haal de laatste cup eruit, leeg de lekbak en vul de tank met 0,5 liter water plus ontkalker.", "Duw de kop omlaag zonder te vergrendelen en houd de knop 7 seconden in. Hendel dicht en open, opnieuw 7 seconden.", "Zet een bak van minstens 1 liter eronder, sluit de hendel en druk op de knop.", "Spoel de tank, vul met schoon water en spoel na. Houd de knop 7 seconden in om de ontkalkstand te verlaten."])],
  src: ["vertuoFaq", "vertuoKalk"] },

{ id: "inventum-compacto", brand: "Inventum", name: "Compacto ventilatiewarmtepomp", cat: "warmtepompen", years: "2023–heden", unit: null,
  intro: "Een warmtepomp die warmte haalt uit de ventilatielucht. Elke 90 dagen vraagt hij om het filter schoon te maken.", weak: ["Een vergeten filter vermindert het rendement."], parts: [["Filter", "Jaarlijks vervangen; bij nieuwbouw na 6 maanden"]],
  tasks: [{ m: 3, t: "Filter controleren en schoonmaken" }, { m: 12, t: "Filter vervangen" }],
  faults: [
    N("Melding Filter vervangen / schoonmaken", 1, "Elke 90 dagen.", ["Zet de hoofdschakelaar uit.", "Schuif het frontpaneel omhoog en trek het naar je toe; draai de bouten van de filterkap los.", "Klop of borstel het filter schoon, zonder water.", "Plaats het terug met de pijl naar beneden en zet de unit aan.", "Reset: tik op het filtericoon, dan het vinkje en bevestig met Ja."]),
    N("Belletje rechtsboven (algemeen alarm)", 1, "Algemene storing.", ["Tik op het belletje en het vinkje om te resetten.", "Komt het terug, bel de installateur."]),
    N("Alarm oververhitting elektrische verwarmer", 3, "Elektrisch element defect; legionellabescherming werkt niet.", ["Neem direct contact op met je installateur."]),
    N("Koelt of verwarmt niet genoeg", 1, "Instellingen.", ["Kijk bij Prestatie informatie of de compressor draait.", "Controleer thermostaat, vakantieprogramma, koelstand en stooklijn."])],
  src: ["compacto"] }
);

Object.assign(SRC, {
  elxKoel: ["Electrolux – support koel-vriescombinaties", "https://support.electrolux.nl/support-articles/koelen/koel-vriescombinaties?locale=nl-NL"],
  mieleKook: ["Coolblue – foutcodes Miele inductiekookplaten", "https://coolblue.nl/en/advice/errors-miele-induction-cooktops.html"],
  aegMagn: ["Coolblue – foutcodes AEG magnetron", "https://www.coolblue.nl/advies/hoe-los-je-de-foutcodes-bij-een-aeg-magnetron-op.html"],
  smeg: ["Coolblue – knipperende cijfers SMEG-fornuis", "https://www.coolblue.nl/en/advice/how-do-you-fix-the-flashing-numbers-of-your-smeg-stove.html"],
  boschVriezer: ["Keukenloods – Bosch vriezer piept", "https://www.keukenloods.nl/advies/vriezers/mijn-bosch-vriezer-piept-wat-nu/"]
});

const serviceElx = ["Neem contact op met de service van Electrolux en maak een afspraak voor een monteur."];
MODELS.push(
{ id: "electrolux-aeg-koelkast", brand: "Electrolux / AEG / Zanussi", name: "Koel-vriescombinatie", cat: "koelkasten", years: "Alle bouwjaren met display", unit: null,
  intro: "Electrolux, AEG en Zanussi gebruiken dezelfde codes op koelkasten. E09 en E10 los je meestal zelf op; F-codes wijzen vaak op een kapotte sensor.", weak: [], parts: [],
  tasks: [{ m: 6, t: "Temperatuur controleren met een thermometer in een glas water", v: 1, s: "Normaal is +4 tot +5 °C in het koelgedeelte." }],
  faults: [
    F("E09", "Vriesgedeelte niet koud genoeg", 1, "Meestal na een lange stroomstoring.", ["Zet de vriezer kouder of zet Super Freeze aan; de code verdwijnt als de temperatuur goed is.", "Houd de deuren dicht.", "Gebruik ontdooid eten snel en doe er pas nieuw eten in als de code weg is."]),
    F("E10", "Koelgedeelte niet koud genoeg", 1, "Stroomstoring of warm eten in de koelkast.", ["Zet de koelkast kouder of zet Super Cool aan.", "Houd de deuren dicht.", "Zet niets voor de luchtopeningen of tegen de temperatuursensor."]),
    F("F6 / F7", "Temperatuurfout", 1, "Tijdelijk te warm.", ["Houd de deur dicht en controleer of hij goed sluit.", "Meet de temperatuur met een thermometer in een glas water: +4 tot +5 °C is goed.", "Ontstond het door een tijdelijke stijging, dan verdwijnt de code binnen een paar uur.", "Blijft de code, bel de service."]),
    F("F1 / F2", "Storing in de thermostaat", 3, "Thermostaat.", serviceElx),
    F("F3 / F4 / F5", "Storing in een temperatuursensor", 3, "Sensor.", serviceElx),
    F("F8", "Probleem met het ontdooisysteem", 3, "Ontdooisysteem.", serviceElx),
    N("Knipperende 0 of vierkantje op het display", 3, "Temperatuursensor defect.", serviceElx),
    N("Streepjes (—) op het display", 1, "Temperatuur onder 0 °C.", ["Controleer de temperatuur met een thermometer in een glas water.", "Zet de temperatuur hoger. Blijft het, bel de service."])],
  src: ["elxKoel"] },

{ id: "bosch-vriezer-piept", brand: "Bosch", name: "Vriezer of koelkast piept", cat: "koelkasten", years: "Alle bouwjaren", unit: null, also: "Ook Siemens",
  intro: "Een piepende vriezer geeft meestal een deur-, temperatuur- of stroomalarm aan.", weak: [], parts: [], tasks: [],
  faults: [
    N("Vriezer piept", 1, "Deur open, te warm na het inladen, stroomstoring of ijsvorming.", ["Controleer of de deur helemaal sluit en niets in de weg zit.", "Laad snel in en houd de deur kort open.", "Na een stroomstoring: wacht tot de temperatuur weer goed is.", "Haal overtollig ijs weg en maak de deurrubbers schoon.", "Blijft hij piepen of staat er een foutcode op het display, laat een monteur kijken."])],
  src: ["boschVriezer"] },

{ id: "miele-kookplaat", brand: "Miele", name: "Inductiekookplaat", cat: "kookplaten", years: "Alle bouwjaren", unit: null,
  intro: "Miele-kookplaten tonen FE- of Err-codes. Oververhitting en een geblokkeerde ventilator los je zelf op.", weak: ["Spullen in een la onder de kookplaat die de ventilator blokkeren."], parts: [], tasks: [],
  faults: [
    F("FE37 / FE44", "Oververhittingsbeveiliging", 1, "Oververhit.", ["Laat een paar minuten afkoelen.", "Komt het terug: stekker 30 minuten eruit en weer aanzetten."]),
    F("FE47 / FE48", "Ventilator geblokkeerd", 1, "Iets blokkeert de ventilator.", ["Haal weg wat de ventilator aan de onderkant blokkeert, ook in een la eronder.", "Controleer of de kookplaat goed is ingebouwd."]),
    F("FE91 / FE92 / FE93 / FE94", "Spanningsprobleem", 3, "Verkeerde aansluiting.", ["Laat de aansluiting controleren door een erkende installateur."]),
    F("F", "Toetsen geblokkeerd", 1, "Vuil of een voorwerp op de toetsen.", ["Haal voorwerpen weg en maak aangekoekt vuil van de toetsen."]),
    F("LC / LOC", "Kinderslot aan", 1, "Geen storing.", ["Zet het kinderslot uit volgens de handleiding."]),
    F("dE", "Demonstratiestand", 1, "Geen storing.", ["Zet de demonstratiestand uit volgens de handleiding."])],
  src: ["mieleKook"] },

{ id: "aeg-magnetron", brand: "AEG", name: "Magnetron en combi-oven", cat: "ovens", years: "Alle bouwjaren met display", unit: null,
  intro: "AEG-magnetrons tonen codes als F104 en ECON. Veel meldingen zijn geen echte storing.", weak: [], parts: [], tasks: [],
  faults: [
    F("F104 / ERRM / ERRC", "Probleem met de temperatuursensor", 1, "Vaak een te koude keuken.", ["Zorg dat het minstens 16 °C is in de keuken.", "Laat de magnetron eerst afkoelen als hij net aan stond."]),
    F("F215", "Probleem met de bedieningselektronica", 1, "Storing.", ["Zet uit en wacht een paar minuten.", "Werkt de bediening nog niet, haal de stekker eruit of zet de groep uit."]),
    F("E15", "Te heet voor de gekozen functie", 1, "Oververhit.", ["Zet de deur open om af te koelen en zet hem daarna weer aan."]),
    F("ECON", "Eco- of standbystand", 1, "Geen storing.", ["Stekker kort eruit; stel binnen 3 minuten de klok in."]),
    F("--C", "Deur niet goed dicht", 2, "Deur of deurhaken.", ["Controleer de deur. Zijn de deurhaken kapot, laat ze vervangen."]),
    F("PLAT OFF", "Draaiplateau staat uit", 1, "Geen storing.", ["Druk tijdens een programma op de twee buitenste knoppen om het plateau weer aan te zetten."])],
  src: ["aegMagn"] },

{ id: "smeg-fornuis", brand: "SMEG", name: "Fornuis en oven", cat: "ovens", years: "Alle bouwjaren", unit: null,
  intro: "Knipperende cijfers op een SMEG-fornuis betekenen dat de klok niet is ingesteld. Zonder ingestelde klok werkt de oven niet.", weak: [], parts: [], tasks: [],
  faults: [N("Cijfers knipperen en de oven werkt niet", 1, "Klok niet ingesteld, vaak na een stroomstoring of bij een nieuw fornuis.", ["Houd de klokknop ongeveer 2 seconden ingedrukt tot de punt tussen uren en minuten knippert.", "Stel de tijd in met plus en min.", "Laat los en wacht 7 seconden; als de punt stopt met knipperen is de tijd opgeslagen."])],
  src: ["smeg"] }
);

Object.assign(SRC,{ elxOven: ["Electrolux support – foutcodes ovens", "https://support.electrolux.be/support-articles/koken/ovens?locale=nl-BE"] });
MODELS.push({ id: "electrolux-oven", brand: "Electrolux / AEG", name: "Oven en stoomoven (foutcodes)", cat: "ovens", years: "Alle bouwjaren met display", unit: null, also: "Ook SteamBake, SteamCrisp, SteamPro en pyrolyse-ovens",
  intro: "Electrolux en AEG gebruiken dezelfde F-codes. Zet de oven eerst uit via de groep of aardlekschakelaar en weer aan. Komt de code terug, dan is het meestal werk voor een monteur.", weak: ["Sensoren in de ovenruimte en in het stoomgedeelte."], parts: [["Ovenlamp", "Zoek met het PNC-nummer van je oven in de webshop"]], tasks: OVEN_TASKS,
  faults: [
    F("C1", "Pyrolyse start niet: telescopische geleiders in de oven", 1, "Met de rails erin kan de zelfreiniging niet starten.", ["Haal de telescopische geleiders en alle accessoires uit de oven.", "Start de pyrolyse opnieuw."]),
    F("C2", "Pyrolyse start niet: kerntemperatuurvoeler aangesloten", 1, "De voeler zit nog in het contact.", ["Haal de kerntemperatuurvoeler eruit en start opnieuw."]),
    F("C3", "Pyrolyse start niet: deur open", 1, "De deur is niet goed dicht.", ["Sluit de deur goed en start opnieuw."]),
    F("C4", "Reiniging start niet: SteamPlus staat aan", 1, "SteamPlus en reinigen gaan niet samen.", ["Zet SteamPlus uit en start de reiniging opnieuw."]),
    F("F21", "Starttemperatuur te hoog", 2, "De oven is bij het starten al te heet.", ["Zet het bedieningspaneel uit en weer aan.", "Blijft de code? Vraag een monteur aan."]),
    F("F81", "Vochtprobleem", 3, "Technische storing; niet zelf op te lossen.", ["Zet de oven uit via de groep en weer aan.", "Komt F81 terug? Vraag een monteur aan."]),
    F("F105", "Sensor in de ovenruimte meet te hoge temperatuur", 3, "Defecte temperatuursensor of oververhitting.", ["Zet de oven uit en laat hem afkoelen.", "Vraag een monteur aan en geef de code door."]),
    F("F131", "Sensorprobleem in het stoomgedeelte", 3, "Defecte sensor van de stoomfunctie.", ["Gebruik de stoomfunctie niet en vraag een monteur aan."]),
    F("F143", "Vochtsensor van de stoomoven defect", 3, "De vochtigheidssensor geeft een fout.", ["Vraag een monteur aan en geef de code door."]),
    F("F194", "Storing temperatuursensor", 3, "Een temperatuursensor is defect.", ["Vraag een monteur aan en geef F194 door."]),
    F("F239", "Besturingsmodule communiceert niet goed", 3, "Technische storing in de elektronica.", ["Zet de oven uit via de groep en weer aan.", "Komt F239 terug? Vraag een monteur aan."]),
    F("F241", "Storing in de functiekeuzeschakelaar", 3, "De draaiknop of schakelaar voor de ovenfuncties is defect.", ["Niet zelf op te lossen; vraag een monteur aan."]),
    F("F601 / F604", "Wifi-probleem", 1, "F601: zwak of geen wifi-signaal. F604: eerste verbinding mislukt.", ["F601: controleer je wifi-netwerk en de afstand tot de router.", "F604: zet de oven uit en aan en probeer opnieuw te verbinden.", "De oven blijft gewoon werken zonder wifi. Blijft de code? Vraag service aan."]),
    F("400", "Oven aangesloten op 400 volt (constante pieptoon)", 3, "De oven krijgt een te hoge spanning: verkeerde aansluiting.", ["Gebruik de oven niet.", "Laat een erkend installateur de aansluiting controleren.", "Blijft de melding daarna? Vraag een monteur aan."]),
    N("De oven toont een F met een nummer", 2, "Algemene storingsmelding van de elektronica.", ["Zet de oven uit via de groep of aardlekschakelaar en zet hem weer aan.", "Blijft de code? Gebruik de oven niet en vraag een monteur aan."]),
    N("Koelventilator blijft draaien na het uitzetten", 1, "Normaal: de ventilator koelt de elektronica tot 45 minuten na gebruik.", ["Wacht tot 45 minuten.", "Draait hij nog als de oven helemaal koud is? Zet de groep even uit en weer aan.", "Blijft het? Vraag een monteur aan."]),
    N("Ovenverlichting brandt niet", 1, "Lamp uitgezet (3 seconden op de lampknop), een functie waarbij het licht uit blijft, of een doorgebrande lamp.", ["Houd de lampknop 3 seconden ingedrukt om het licht weer aan te zetten.", "Bij Multi Hot Air vochtig, Yoghurt, Ontkalken en Stoomreiniging blijft het licht uit: dat is normaal.", "Lamp vervangen: stroom eraf, lampkapje met rubberen handschoenen linksom losdraaien, lamp vervangen, kapje rechtsom vastdraaien."])],
  src: ["elxOven"] });
Object.assign(SRC,{ elxWas: ["Electrolux support – foutcodes wasmachines en was-droogcombinaties", "https://support.electrolux.be/support-articles/wassen-en-drogen/wasmachines?locale=nl-BE"], elxKoel: ["Electrolux support – koel-vriescombinaties", "https://support.electrolux.be/support-articles/koelen/koel-vriescombinaties?locale=nl-BE"] });
(m => { m.faults.push(
  F("E50 / C9 / F9", "Motorstoring", 3, "Defect aan de motor of de motorsturing. Ook E5E.", ["Gebruik de machine niet meer.", "Haal de stekker eruit en draai de kraan dicht.", "Vraag een monteur aan."]),
  F("E60", "Verwarmingselement defect", 3, "Technische storing in het verwarmingselement of de aansturing ervan (ook bij was-droogcombinaties).", ["Zet de machine uit en weer aan.", "Blijft E60 staan? Vraag een monteur aan."]),
  F("E80 / E82", "Programmaknop verkeerd ingesteld", 1, "De programmaknop stond tussen twee programma's toen je op Start drukte. Knippert 8 keer.", ["Zet de machine uit en weer aan.", "Draai de knop helemaal op één programma en start opnieuw.", "Blijft de code? Dan is de programmaschakelaar mogelijk defect: vraag een monteur aan."]),
  F("EA0", "Trommelpositie bovenlader", 3, "De bovenlader kan de trommel niet goed positioneren.", ["Zet de machine uit en weer aan.", "Komt EA0 terug? Vraag een monteur aan."]),
  F("dEn", "Demostand (geen storing)", 1, "De machine staat in de winkel- of demostand.", ["Haal de stekker 30 seconden uit het stopcontact en steek hem terug.", "Blijft dEn staan? Vraag service aan."]));
  if (!m.src.includes("elxWas")) m.src.push("elxWas"); })(MODELS.find(m => m.id === "aeg-wasmachine"));
(m => { m.faults.push(
  F("Streepjes —", "Streepjes op het display: kouder dan het display kan tonen", 1, "De temperatuur ligt onder het bereik van het display.", ["Meet de echte temperatuur met een thermometer in een glas water: 4 tot 5 °C is goed.", "Zet de koelkast een stand warmer.", "Blijven de streepjes staan? Vraag een monteur aan."]),
  F("0 / vierkantje knippert", "Probleem met de temperatuursensor", 3, "Een knipperende 0 of een knipperend vierkantje wijst op een defecte sensor.", ["Vraag een monteur aan."]),
  N("Temperatuuralarm: rood lampje, knipperend driehoekje of piepjes", 1, "Het is te warm in de koelkast of vriezer, of de koeling werkt niet goed.", ["Druk op een knop om het alarm uit te zetten.", "Nieuwe koelkast of net veel boodschappen erin? Wacht tot 12 uur.", "Controleer of de deur goed sluit en of de deurrubber schoon en heel is.", "Zet de koelkast waterpas en controleer of de ventilatie voldoet aan de handleiding.", "Meet de temperatuur met een thermometer in een glas water: 4 tot 5 °C is goed.", "Controleer of de kamertemperatuur past bij de klimaatklasse op het typeplaatje.", "Ontdooi het apparaat en zet het weer aan. Blijft het alarm? Vraag een monteur aan."]));
  if (!m.src.includes("elxKoel")) m.src.push("elxKoel"); })(MODELS.find(m => m.id === "electrolux-aeg-koelkast"));
Object.assign(SRC,{ elxVaat: ["Electrolux support – foutcodes vaatwassers", "https://support.electrolux.be/support-articles/vaatwas/vaatwassers?locale=nl-BE"] });
(m => { m.faults.push(
  F("i28", "Afvoerpomp defect, water wordt niet weggepompt", 3, "Storing van de afvoerpomp.", ["Draai de waterkraan dicht.", "Controleer of het filter en de afvoerslang niet verstopt zijn.", "Blijft i28? Vraag een monteur aan."]),
  F("iF0 / iFo", "Probleem met het waterniveau", 2, "De vaatwasser krijgt of meet te weinig water.", ["Draai de kraan helemaal open.", "Stekker eruit en kraan dicht, haal de toevoerslang los en maak het zeefje in de aansluiting kalkvrij.", "Test de waterdruk: een emmer van 10 liter moet in 1 minuut vol zijn.", "Haal knikken uit de slang en maak filters en sproeiarmen schoon.", "Stekker 1 minuut eruit, daarna opnieuw starten. Komt de code terug? Vraag een monteur aan."]),
  F("d:On / Demo mode", "Demostand: programma start niet", 1, "De vaatwasser staat in de showroomstand.", ["Zet de vaatwasser aan en wacht tot het display oplicht.", "Kies het Quick-programma.", "Houd de knoppen ECO en Auto samen 5 seconden ingedrukt tot d:Of of Demo mode OFF verschijnt.", "Gaat het Quick-lampje uit? Dan drukte je niet tegelijk: begin opnieuw."]),
  F("E1 (compact)", "Compacte vaatwasser krijgt geen water", 1, "De kraan staat dicht of is verstopt, of de waterdruk is te laag. Hij piept ongeveer 30 seconden.", ["Draai de kraan helemaal open en controleer of de toevoer niet verstopt is.", "Test de waterdruk: 10 liter in ongeveer 1 minuut."]),
  F("E2 (compact)", "Compacte vaatwasser: verwarmingselement defect", 3, "Technische storing aan het verwarmingselement.", ["Vraag een monteur aan."]),
  F("E3 (compact)", "Compacte vaatwasser: verwarming of waterlek", 3, "Vrijstaand model: verwarmingselement. Inbouwmodel: te veel water of een lek.", ["Draai de waterkraan dicht en laat hem dicht.", "Vraag een monteur aan."]),
  N("Zoutlampje blijft branden", 1, "De vaatwasser meet het zoutniveau alleen tijdens een programma.", ["Vul het zoutreservoir.", "Start een programma; na afloop hoort het lampje uit te gaan.", "Brandt het daarna nog? Vraag service aan."]));
  if (!m.src.includes("elxVaat")) m.src.push("elxVaat"); })(MODELS.find(m => m.id === "aeg-vaatwasser"));
Object.assign(SRC,{ bkQuooker: ["Bemmel & Kroon – Quooker veelgestelde vragen", "https://www.bemmelenkroon.nl/merken/quooker/veelgestelde-vragen/"], bkQuookerPdf: ["Bemmel & Kroon – Quooker tips voor het gebruik (pdf)", "https://images.bemmelenkroon.nl/media/tips_voor_het_gebruik_be_5_Bemmel_Kroon.pdf"] });
MODELS.push({ id: "quooker", brand: "Quooker", name: "Kokendwaterkraan (PRO3, COMBI, CUBE)", cat: "kleine-apparaten", years: "Alle bouwjaren", unit: null, also: "Flex, Fusion, Front, Nordic",
  intro: "Een Quooker meldt een storing met een snel knipperend lampje op het reservoir. Langzaam pulseren is normaal (stand-by), continu branden betekent opwarmen.", weak: ["Kalk in het kraanzeefje (perlator).", "Kalk in het reservoir na een paar jaar."], parts: [["Onderhoudsset reservoir", "Via de Quooker-servicedienst"], ["CUBE-filter en CO2-cilinder", "Via Quooker of de dealer"]],
  tasks: [{ m: 6, t: "Kraanzeefje (perlator) ontkalken", v: true }, { m: 12, t: "CUBE-filter vervangen" }, { m: 60, t: "Reservoironderhoud: ontkalken en HiTAC-filter vervangen", s: "Bij water harder dan 10 °dH eerder", v: true }],
  faults: [
    N("Lampje op het reservoir knippert snel", 2, "Het reservoir heeft een storing. Langzaam pulseren is géén storing.", ["Zet het reservoir uit met de rode Q bovenop.", "Haal de stekker uit het stopcontact en trek de stekker van de kraan uit de rode kap achterop.", "Wacht 10 seconden, sluit alles weer aan en zet het reservoir aan met de Q.", "Brandt het lampje continu? Dan warmt hij op: wacht tot 25 minuten.", "Komt de storing na drie pogingen terug? Bel Quooker-service met het serienummer en vertel of het lampje 2 of 4 keer knippert."]),
    N("Geen kokend water of geen stoom meer", 1, "Voorraad op, reservoir uit, kraanstekker los, geen stroom of onderhoud nodig.", ["Wacht even: een PRO3 (3 liter) warmt in ongeveer 10 minuten op, een COMBI (7 liter) in ongeveer 20 minuten.", "Controleer of het lampje op het reservoir pulseert; zo niet, druk op de rode Q.", "Controleer of de stekker van de kraan in de rode kap zit.", "Controleer stopcontact en zekering.", "Komt het water niet meer krachtig bruisend uit de kraan, ook na ontkalken van het zeefje? Dan is reservoironderhoud nodig."]),
    N("Kraan werkt niet", 1, "Reservoir uit, geen stroom of de stekker van de kraan zit los.", ["Controleer of het reservoir aan staat.", "Controleer de stroom.", "Druk de stekker van de kraan goed in de rode kap achterop het reservoir."]),
    N("Dun straaltje of kraan spat", 1, "Kalk in het kraanzeefje (perlator).", ["Draai de metalen huls aan het eind van de uitloop los (Flex: aan het eind van de uittrekslang).", "Haal het zeefje eruit en leg alleen het zeefje een uur in schoonmaakazijn.", "Spoel af, zet het zeefje met de zwarte O-ring terug en draai de huls vast.", "Houd je pan of glas zo dicht mogelijk bij de uitloop."]),
    N("Mengkraan geeft alleen lauw water (COMBI)", 1, "Voorraad van 7 liter op, reservoir uit of de temperatuur op de mengklep staat verkeerd.", ["Wacht ongeveer 20 minuten tot het reservoir is opgewarmd.", "Stel de temperatuurknop op de mengklep onder het aanrecht bij.", "Blijft het lauw? Dan is de mengklep mogelijk aan vervanging toe: bel de service."]),
    N("Druk-en-draaibeveiliging werkt niet (Flex)", 1, "De slang hangt niet goed in de kraan. Met uitgetrokken slang geeft de Flex bewust geen kokend water.", ["Trek de slang zo ver mogelijk uit en laat hem langzaam terugveren.", "Probeer het opnieuw."]),
    N("Hendel loopt stroef", 1, "Vuil in de kraan.", ["Til de hendel op en spuit hooguit twee keer glasreiniger in de opening.", "Beweeg de hendel voorzichtig op en neer en heen en weer.", "Gebruik geen andere schoonmaakmiddelen."]),
    N("CUBE geeft weinig bruisend of gefilterd water", 1, "Filter niet goed geplaatst, CO2-cilinder los of leeg.", ["Open het witte klepje bovenop de CUBE en druk het filter in tot het klikt.", "Draai de CO2-cilinder met de klok mee vast.", "Draai hem iets los: hoor je geen sissen, dan is hij leeg. Vervang de cilinder.", "Piept het reservoir? Dan moet het CUBE-filter vervangen worden (ongeveer eens per jaar). Lever het oude filter in bij het klein chemisch afval."])],
  src: ["bkQuooker", "bkQuookerPdf"] });
Object.assign(SRC,{ dlOntv: ["De'Longhi – veelgestelde vragen luchtbehandeling", "https://www.delonghi.com/nl-be/faqs/Luchtbehandeling/t/22829"] });
MODELS.push({ id: "delonghi-luchtontvochtiger", brand: "De'Longhi", name: "Luchtontvochtiger (Tasciugo en DEX)", cat: "kleine-apparaten", years: "Alle bouwjaren", unit: null, also: "Ook nuttig voor andere merken ontvochtigers",
  intro: "Veel 'storingen' van een luchtontvochtiger zijn normaal gedrag: hij start met vertraging en blaast warme lucht uit.", weak: ["De vlotter in het waterreservoir."], parts: [], tasks: [{ m: 1, t: "Luchtfilter stofzuigen of uitspoelen", v: true }],
  faults: [
    N("Reservoirlampje gaat niet uit", 1, "Reservoir niet goed geplaatst of de vlotter zit verkeerd.", ["Haal het reservoir eruit, leeg het en zet het stevig terug.", "Controleer of de vlotter in het reservoir goed zit; je kunt hem eruit halen om schoon te maken.", "Nieuw apparaat? De vlotter kan tijdens transport verschoven zijn: zet hem goed terug.", "Lukt dat niet? Bel De'Longhi-klantenservice."]),
    N("Start niet meteen na het aanzetten", 1, "Normaal: de compressor heeft ongeveer 3 minuten nodig om op te starten.", ["Wacht ongeveer 3 minuten."]),
    N("Blaast warme lucht uit", 1, "Normaal: een ontvochtiger geeft lucht af die iets warmer is dan de kamer. Het is geen airco.", ["Niets aan doen."]),
    N("Werkt slecht in een koude ruimte", 1, "Bij lage temperaturen werkt een ontvochtiger minder goed. Dat is niet schadelijk.", ["Gebruik hem bij voorkeur in een verwarmde ruimte."])],
  src: ["dlOntv"] });
Object.assign(SRC,{ husqSelf: ["Husqvarna self-service – foutmeldingen Automower", "https://www.husqvarna.com/nl/ondersteuning/robotmaaiers/zoeken/?tags=foutmelding"] });
(m => { m.faults.push(
  F("Geen lussignaal", "Maaier vangt geen signaal van de begrenzingsdraad", 2, "Draadbreuk, losse aansluiting, geen stroom op het laadstation, of storing door metaal of kabels. Kijk naar het lampje op het laadstation.", ["Blauw knipperend: controleer of de draaduiteinden goed vastzitten. Meet de weerstand van de lus met een multimeter: ongeveer 0,8 ohm per 100 meter is goed, honderden ohms betekent een draadbreuk.", "Lampje uit: controleer voeding, laagspanningskabel, stopcontact en aardlekschakelaar.", "Rood: haal de stroom 30 seconden weg. Blijft het rood, dan is de print defect: naar de dealer.", "Groen maar toch de melding: de maaier staat te ver van de draad, de draad is langer dan 800 meter of er ligt metaal in de buurt. Maak daarna een nieuw lussignaal via de app: Meer > Instellingen > Beveiliging > Nieuw lussignaal.", "Groen knipperend: ECO-modus. Start de maaier vanuit het laadstation.", "Na onweer: controleer lampje en draad; blijft de fout, dan naar de dealer."]),
  F("Draadbreuk", "Draadbreuk in de begrenzingsdraad vinden en repareren", 2, "Een beschadigde draad, vaak door spitten, kantensnijden of dieren. Het laadstation knippert blauw.", ["Controleer eerst alle aansluitingen en bekende verbindingen.", "Zet de ECO-modus uit (maaier in het laadstation, Instellingen > ECO-modus).", "Wissel de aansluitingen AL en G1: wordt het lampje groen, dan zit de breuk tussen AL en het punt waar de geleidedraad aansluit.", "Halveer het verdachte stuk steeds met een nieuwe hulpdraad tot je de breuk hebt gevonden.", "Knip 60 cm rond de breuk weg, steek beide uiteinden in een Automower-connector, knijp hem dicht met een tang en begraaf of zet hem vast."]),
  F("Buiten werkgebied", "Maaier denkt dat hij buiten het werkgebied staat", 1, "Draad te dicht bij een helling of obstakel, draad op de verkeerde pen van het laadstation, of de draad loopt verkeerd om een eiland.", ["Houd minstens 35 cm afstand tussen draad en hellingen of obstakels.", "Controleer of de draad op de juiste pen van het laadstation zit.", "Controleer de looprichting van de draad rond eilanden.", "EPOS-modellen: leg de virtuele grens verder van hellingen."]),
  F("Vastgelopen", "Maaier loopt steeds vast", 1, "Obstakels, smalle doorgangen, te lang gras of graspollen onder de maaischijf.", ["Zet de maaier op een open plek, haal obstakels weg en start opnieuw.", "Loopt hij steeds op dezelfde plek vast? Maak daar een eiland of vermijdingszone.", "Maak de onderkant schoon.", "Houd het gras korter dan de maximale hoogte van je model (4, 6 of 10 cm)."]),
  F("Opgetild", "Alarm: maaier opgetild", 1, "Te laag maaien, wortels of stenen, trillingen op grind of bestrating, vuil onder de kap, een losse kap of vuile joysticks.", ["Zet de maaier op een vlakke plek en onthoud waar hij stopte.", "Voer je pincode in en start opnieuw.", "Zet de maaihoogte op maximaal en verlaag geleidelijk.", "Maak de onderkant, de wielen en de rand tussen kap en chassis schoon.", "Druk alle hoeken van de kap stevig vast en controleer de rubber balgen van de joysticks.", "Blijft het? Naar de dealer: water kan de sensoren hebben beschadigd."]),
  F("Ondersteboven", "Maaier staat te scheef of ondersteboven", 1, "De maaier is gekanteld, opgetild of rijdt op een te steile helling.", ["Zet de maaier rechtop op de grond.", "Sluit de steile helling uit met een eiland (draad) of verboden zone (EPOS)."]),
  F("Laadstation geblokkeerd", "Maaier kan niet aanmeren", 1, "Vuil voor het laadstation, ongelijke ondergrond, vuile of geoxideerde laadcontacten, losse kabels of een rechte geleidedraad ontbreekt.", ["Haal alles weg tussen maaier en laadstation.", "Maak de grond onder het laadstation vlak met zand of aarde.", "Stroom eraf en maak de contactplaten van maaier en laadstation schoon met een fijn schuursponsje of contactspray.", "Controleer de kabelaansluitingen.", "Met geleidedraad: leg die minstens 2 meter recht voor het laadstation."]),
  F("Probleem met botssensor", "Botssensor blijft geactiveerd", 1, "De maaier staat tegen een obstakel, er zit vuil tussen kap en chassis of de kap zit niet goed.", ["Til de maaier van het obstakel af.", "Borstel het vuil tussen kap en chassis weg.", "Controleer of de kap vrij beweegt en goed vastzit.", "Verhoog de maaihoogte en controleer of de wielen vrij draaien.", "Zet de maaier uit en aan. Blijft de fout? Naar de dealer."]),
  F("Wielmotor geblokkeerd", "Gras of iets anders om een aandrijfwiel", 1, "Gras of een voorwerp zit om een wiel gedraaid.", ["Zet de maaier uit.", "Maak de wielen en de ruimte eromheen schoon.", "Start opnieuw. Komt de fout terug? Naar de dealer."]),
  F("Geen aandrijving (13)", "Wielen draaien maar de maaier komt niet vooruit", 1, "Vast in een kuil, te steile helling, nat gras op een helling of de draad loopt recht omhoog in plaats van schuin.", ["Maak de maaier los en haal obstakels weg.", "Laat het gras opdrogen voordat hij weer op de helling maait.", "Leg de draad schuin over de helling."]),
  F("Buiten GeoFence", "Alarm: maaier buiten GeoFence", 1, "De maaier is echt verplaatst of gestolen, of de GeoFence-straal of het middelpunt klopt niet.", ["Zet GeoFence uit voordat je de maaier zelf verplaatst.", "Pas de straal aan in de Automower Connect-app: Instellingen > Beveiliging > GeoFence.", "Voer je pincode in om het alarm te stoppen en start opnieuw."]));
  if (!m.src.includes("husqSelf")) m.src.push("husqSelf"); })(MODELS.find(m => m.id === "husqvarna-automower"));
Object.assign(SRC,{ gardenaSileno: ["GARDENA – handleiding SILENO city en SILENO life (2020), via Kees van der Spek", "https://content.keesvanderspek.nl/1770668828/dossier-art/_15103-26.000.00/Handleiding%20Gardena%20SILENO%20city,%20smart%20SILENO%20city,%20SILENO%20life,%20smart%20SILENO%20life%20-%202020.pdf"] });
MODELS.push({ id: "gardena-sileno", brand: "Gardena", name: "Robotmaaier SILENO city, life en smart", cat: "tuin", years: "Alle bouwjaren", unit: null, also: "Ook de smart-uitvoeringen met app",
  intro: "De SILENO toont foutmeldingen in tekst op het display of in de GARDENA smart-app. Bij een tijdelijke elektronicafout helpt opnieuw opstarten meestal.", weak: ["Messen: gaan 4 tot 7 weken mee.", "Begrenzingsdraad en geleidingsdraad: breuk door spitten of kantensnijden."], parts: [["Messen en schroeven", "Altijd alle 3 messen en 3 schroeven tegelijk, origineel GARDENA"]],
  tasks: [{ m: 0.25, t: "Maaischijf en messen controleren" }, { m: 1.5, t: "Alle 3 messen en schroeven vervangen", s: "Normaal na 4 tot 7 weken" }],
  faults: [
    F("Geen lussignaal", "Geen signaal van de begrenzingsdraad", 2, "Geen stroom of aardlek, laagspanningskabel los, begrenzingsdraad los of gebroken, ECO-modus of storing door metaal.", ["Controleer stopcontact, aardlekschakelaar en laagspanningskabel.", "Controleer de aansluitklemmen van de begrenzingsdraad; vervang beschadigde connectoren.", "Zoek een draadbreuk en vervang het stuk met een originele koppeling.", "ECO-modus: zet de maaier in het laadstation en druk op STOP.", "Zet de maaier in het laadstation en maak een nieuw lussignaal."]),
    F("Buiten maaigebied", "Maaier staat buiten het maaigebied", 1, "Draadaansluitingen gekruist, draad te dicht bij de rand, te steil terrein, verkeerde richting om een eiland of storing door metaal.", ["Controleer de aansluiting op het laadstation.", "Leg de draad volgens de handleiding en isoleer steile stukken.", "Zet de maaier in het laadstation en maak een nieuw lussignaal."]),
    F("Maaisysteem geblokkeerd", "Maaischijf zit vast", 1, "Gras rond de maaischijf, de schijf staat in water of het gras is te lang.", ["Zet de maaier uit en maak de maaischijf vrij.", "Voorkom plassen in het maaigebied.", "Maai het gras eerst kort (maximaal 4 cm)."]),
    F("Lege accu", "Accu leeg, maaier vond het laadstation niet", 2, "Geleidingsdraad gebroken of los, laadstation niet goed geïnstalleerd, accu versleten of antenne van het laadstation defect.", ["Controleer laadstation en geleidingsdraad.", "Lampje laadstation geel knipperend: zoek de breuk in de geleidingsdraad.", "Lampje rood knipperend: laat het laadstation controleren.", "Gaat de accu steeds korter mee? Vervang de accu."]),
    F("Wielmotor geblokkeerd", "Gras of vuil rond een aandrijfwiel", 1, "Ook: 'Wielmotor overbelast' of 'Aandrijfwiel probleem' (links of rechts).", ["Zet de maaier uit en maak de wielen schoon.", "Overbelast door nat gras: wacht tot het droog is."]),
    F("Laadstation geblokkeerd", "Maaier kan niet aanmeren", 1, "Slecht contact, obstakel, scheef laadstation of verkeerd gelegde geleidingsdraad.", ["Zet de maaier opnieuw in het laadstation en controleer de contactplaatjes.", "Haal obstakels weg en zet het laadstation vlak en horizontaal."]),
    F("Op zijn kop", "Maaier ligt ondersteboven of helt te ver", 1, "De maaier is gekanteld.", ["Zet de maaier rechtop."]),
    F("Accuprobleem", "Accu te warm of te koud", 1, "De accutemperatuur ligt buiten de grenzen.", ["Wacht tot de temperatuur weer normaal is.", "Zet het laadstation niet in de volle zon."]),
    F("Verkeerde PIN-code", "Vijf keer een verkeerde pincode", 1, "Het toetsenbord is 5 minuten vergrendeld.", ["Wacht 5 minuten en voer de juiste pincode in.", "Pincode vergeten? Bel de GARDENA-klantenservice."]),
    F("Tijdelijk probleem", "Tijdelijke elektronica- of firmwarefout", 1, "Ook: 'Elektronisch probleem', 'Kantelsensorprobleem', 'Lussensorprobleem', 'Laadsysteem probleem' of 'Tijdelijk accuprobleem'.", ["Start de maaier opnieuw.", "Bij een accumelding: haal de accu los en sluit hem weer aan.", "Komt de melding steeds terug? Laat een servicemonteur kijken."]),
    N("Vastgelopen, opgetild of geen aandrijving", 1, "Obstakels, nat gras of een te steile helling.", ["Maak de maaier los en haal obstakels weg, of maak een eiland om de plek.", "Bij nat gras: wacht tot het droog is.", "Leg de geleidingsdraad schuin over een helling.", "Opgetild: controleer of de kap vrij kan bewegen."])],
  src: ["gardenaSileno"] });
Object.assign(SRC,{ vaillantIM: ["Vaillant – installatie- en onderhoudshandleiding ecoTEC plus (foutcodes en statuscodes)", "https://www.vaillant.nl/api/download/product/nl/_ecotec-plus_1410230.pdf"] });
(m => { const I = installer; m.faults.push(
  F("F.00 / F.000 / F.01 / F.02 / F.03", "Signaal temperatuursensor onderbroken", 2, "F.000 aanvoersensor, F.001 retoursensor, F.002 warmwatersensor, F.003 boilersensor: kabel, stekker of sensor defect.", I),
  F("F.10 / F.010 / F.11 / F.12 / F.13", "Temperatuursensor kortgesloten", 2, "F.010 aanvoer, F.011 retour, F.012 warm water, F.013 boiler: kabel of sensor defect.", I),
  F("F.20 / F.020", "Maximaalthermostaat heeft de gasklep onderbroken", 3, "Te heet geworden: vaak te weinig water, maar ook pomp, 3-wegklep, sensoren of ontsteking.", ["Controleer de waterdruk en vul bij als die onder 1 bar staat.", "Reset de ketel één keer.", ...I]),
  F("F.23 / F.023 / F.24 / F.024", "Temperatuurverschil te groot of temperatuur stijgt te snel", 2, "Lucht in de installatie, te lage druk, pomp geblokkeerd of zwak, 3-wegklep of expansievat.", ["Controleer de waterdruk en vul bij als die te laag is.", "Ontlucht de radiatoren en controleer daarna de druk opnieuw.", "Komt de code terug? Bel je installateur."]),
  F("F.25 / F.025", "Rookgastemperatuur te hoog", 3, "Storing in de rookgasbewaking of de kabelboom.", I),
  F("F.27 / F.027", "Vlamsignaal terwijl de brander uit is", 3, "Lekkend gasmagneetventiel of defecte printplaat.", ["Ruik je gas? Draai de gaskraan dicht, zet ramen open en bel 0800-9009.", ...I]),
  F("F.32 / F.032", "Ventilatortoerental klopt niet", 3, "Ventilator geblokkeerd of defect, kabel of printplaat.", I),
  F("F.40 / F.040", "Te weinig verbrandingslucht", 3, "Luchttoevoer, rookgasafvoer, condens, ventilator of luchtmassasensor.", I),
  F("F.75 / F.075", "Druk stijgt niet bij het starten van de pomp", 2, "Waterdruksensor, pomp, te lage druk, expansievat of lucht.", ["Controleer de waterdruk en vul bij als die te laag is.", "Ontlucht de radiatoren.", "Komt de code terug? Bel je installateur."]),
  F("F.83 / F.083", "Temperatuur stijgt niet bij het starten van de brander", 2, "Te lage druk, te weinig water of sensoren zonder contact.", ["Controleer de waterdruk en vul bij als die te laag is.", ...I]),
  F("F.195 / F.196", "Netspanning te laag of te hoog", 2, "F.195 onderspanning, F.196 overspanning: netspanning, pomp of pompkabel.", ["Controleer of er geen spanningsstoring in huis of de buurt is.", "Komt de code terug? Bel je installateur."]),
  F("F.320 / F.321 / F.322 / F.323 / F.325", "Storing in de cv-pomp", 3, "Pomp geblokkeerd door vuil, oververhit, droogloop door lucht of pompelektronica defect.", ["Controleer de waterdruk en ontlucht de radiatoren (droogloop door lucht).", ...I]),
  F("F.347", "Condenswater in de verbrandingskamer", 2, "Verstopte of bevroren condensafvoer.", ["Bij vorst: giet warm (geen kokend) water over de bevroren condensafvoer buiten.", "Controleer of de condensafvoer niet verstopt is.", ...I]),
  F("F.707", "Geen communicatie tussen display en printplaat", 2, "Verbinding, kabel, display of printplaat.", I),
  F("S.34 / S.034", "Vorstbeveiliging actief (geen storing)", 1, "De ketel beschermt zichzelf tegen bevriezen.", ["Niets aan doen."]),
  F("S.41 / S.041", "Waterdruk te hoog", 1, "Te veel bijgevuld of het expansievat werkt niet goed.", ["Laat via een radiator wat water af tot de druk tussen 1,0 en 2,0 bar staat.", "Loopt de druk steeds weer op? Bel je installateur."]),
  F("S.54 / S.054", "Watergebrek, ketel wacht", 1, "De waterdruk is te laag.", ["Vul cv-water bij tot 1,0 tot 2,0 bar volgens de gebruiksaanwijzing."]),
  F("S.88 / S.088", "Ontluchtingsprogramma actief (geen storing)", 1, "De ketel ontlucht zichzelf, bijvoorbeeld na bijvullen.", ["Wacht tot het programma klaar is en controleer daarna de waterdruk."]),
  F("S.30 / S.030", "Geen warmtevraag van de thermostaat (geen storing)", 1, "De thermostaat vraagt niet om warmte.", ["Zet de thermostaat hoger als je verwarming wilt.", "Werkt het daarna niet? Controleer de batterijen of verbinding van de thermostaat."]));
  m.intro = "Vaillant gebruikt F-codes voor storingen en S-codes voor de status. Nieuwere ecoTEC-ketels tonen ze met drie cijfers (F.022), oudere met twee (F.22). Zelf mag je alleen water bijvullen, ontluchten en één keer resetten. Bij vorst is een bevroren condensafvoer een veelvoorkomende oorzaak van F28 en F29.";
  if (!m.src.includes("vaillantIM")) m.src.push("vaillantIM"); })(MODELS.find(m => m.id === "vaillant-ecotec"));
Object.assign(SRC,{ ecoT8: ["ECOVACS – handleiding DEEBOT OZMO T8 (Nederlands, pdf)", "https://site-static.ecovacs.com/upload/be/file/support/2023/02/15/190910_1175-DEEBOTOZMOT8-Nederlands-Dutch.pdf"], ecoHelp: ["ECOVACS helpcentrum – opladen en terugkeren naar het station", "https://help.ecovacs.com/nl/support/faq-detail?id=48"] });
MODELS.push({ id: "ecovacs-deebot", brand: "Ecovacs", name: "DEEBOT robotstofzuiger (OZMO, T- en X-serie)", cat: "stofzuigers", years: "Alle bouwjaren", unit: null, also: "Met en zonder automatisch leegstation",
  intro: "Bij een storing knippert de AUTO-knop rood; in de ECOVACS HOME-app zie je de melding. Wekelijks borstels, filter en sensoren schoonmaken voorkomt de meeste problemen.", weak: ["Haar rond de hoofdborstel.", "Verstopte afvoeropening naar het leegstation."], parts: [["Zijborstels, filters, stofzakken", "Via ECOVACS of de verkoper"]],
  tasks: [{ m: 0.25, t: "Hoofdborstel, filters en sensoren schoonmaken" }, { m: 0.5, t: "Zijborstels schoonmaken" }, { m: 4.5, t: "Zijborstels en filters vervangen", s: "Elke 3 tot 6 maanden" }, { m: 9, t: "Hoofdborstel vervangen", s: "Elke 6 tot 12 maanden" }],
  faults: [
    N("Robot laadt niet op", 1, "Robot staat uit, laadcontacten maken geen contact, geen stroom of accu leeg.", ["Open de bovenklep en controleer of de aan/uit-schakelaar aan staat.", "Controleer stopcontact en snoer van het laadstation.", "Maak de laadcontacten van robot en station schoon en controleer of ze elkaar raken.", "Laadt hij nog steeds niet? Dan is de accu mogelijk versleten: bel de klantenservice."]),
    N("Robot vindt het laadstation niet", 1, "Station verplaatst of uitgeschakeld, route geblokkeerd, of de robot stond langer dan 90 minuten op pauze.", ["Zet het station terug op de plek waar de robot startte en laat het staan.", "Maak de route naar het station vrij en veeg water op de vloer droog.", "Zet de robot voor het station en druk op de Recall-knop.", "Pauzeer niet langer dan 90 minuten."]),
    N("Robot zit vast", 1, "Kabels, gordijnen, franjes of een laag meubel.", ["Haal obstakels weg en start opnieuw.", "Stel een virtuele grens in de app in of plaats een fysieke barrière."]),
    N("Leegstation zuigt het stof niet af", 1, "Stofzak ontbreekt of is vol, deksel open, of afvoeropening of slang verstopt.", ["Plaats of vervang de stofzak en sluit het deksel.", "Maak de afvoeropeningen en de slang vrij."]),
    N("Wifi-verbinding mislukt", 1, "Verkeerd wachtwoord, robot buiten bereik of een 5 GHz-netwerk.", ["Gebruik een 2,4 GHz-netwerk en de ECOVACS HOME-app.", "Zet de robot dichter bij de router.", "Zet de robot uit en aan en druk op RESET."]),
    N("Robot slaat plekken over of maakt lawaai", 1, "Obstakels, een gladde vloer, een vuile sensor of haar in de borstels.", ["Ruim de vloer op en laat vloerwas eerst drogen.", "Maak de navigatiesensor vrij.", "Maak borstels en wielen schoon."])],
  src: ["ecoT8", "ecoHelp"] });
Object.assign(SRC,{ panaAq: ["Panasonic Pro Club – Aquarea storingsanalyse (2022, pdf)", "https://www.panasonicproclub.com/uploads/NL/catalogues/2022_Aquarea%20IBS%20en%20storingsanalyse.pdf"], igXtend: ["Intergas – bedieningsvoorschrift Xtend (pdf)", "https://www.intergas-verwarming.nl/app/uploads/2022/09/88009400-IG-Bedieningsvoorschrift-Xtend.pdf"] });
{ const I = installer; const K = (c, t, d, cause) => F(c, t, d, cause, ["Noteer de code en geef hem door aan je installateur.", ...I]);
MODELS.push({ id: "panasonic-aquarea", brand: "Panasonic", name: "Aquarea warmtepomp", cat: "warmtepompen", years: "Alle bouwjaren", unit: null, also: "Monoblock, split en All-in-One",
  intro: "De Aquarea toont H-codes en F-codes op de bediening. H00 betekent dat er geen storing is. Aan het koelcircuit mag alleen een erkend installateur werken.", weak: ["Sensoren (thermistors) in binnen- en buitenunit.", "Waterstroom: een vuil filter of lucht geeft een flowstoring."], parts: [],
  tasks: [{ m: 12, t: "Jaarlijks onderhoud door de installateur" }],
  faults: [
    F("H00", "Geen storing", 1, "Er is geen onregelmatigheid gevonden.", ["Niets aan doen."]),
    K("H12", "Binnen- en buitendeel passen niet bij elkaar", 3, "Combinatiefout tussen binnen- en buitenunit."),
    K("H15", "Compressorsensor buitenunit defect", 3, "Temperatuursensor van de compressor is defect."),
    K("H20", "Waterpomp werkt niet goed", 3, "Onjuiste werking van de circulatiepomp."),
    K("H23", "Sensor vloeistofleiding binnenunit defect", 3, "Defecte temperatuursensor in de koudemiddelleiding."),
    K("H36", "Buffertanksensor defect", 2, "Defecte sensor in het buffervat."),
    K("H42", "Lagedrukbeveiliging compressor", 3, "Te lage druk in het koelcircuit."),
    K("H43 / H44", "Zonesensor defect", 2, "H43: sensor zone 1, H44: sensor zone 2."),
    K("H62", "Flowstoring: te weinig of geen waterstroom", 2, "Onjuiste of geen waterstroom gemeten."),
    K("H63 / H64", "Druksensor koelcircuit", 3, "H63: lagedruksensor, H64: hogedrukstoring."),
    K("H65", "Fout bij het ontdooien", 2, "Het ontdooien van de buitenunit ging niet goed."),
    K("H70", "Storing in de reserveverwarming (back-up heater)", 2, "Overstroombeveiliging van het elektrische element."),
    K("H72", "Sensor warmwatertank defect", 2, "Storing in de tanksensor voor warm tapwater."),
    K("H74 / H76 / H90", "Communicatiefout", 2, "H74: tussen de printen, H76: tussen binnendeel en bediening, H90: tussen binnen- en buitenunit."),
    K("H91", "Verwarmingselement in de tank oververhit", 2, "Thermische beveiliging van het tankelement."),
    K("H95", "Verkeerde spanning tussen binnen- en buitenunit", 3, "De voedingsspanning klopt niet."),
    K("H98 / F95", "Hogedrukstoring koelcircuit", 3, "H98: hoge druk in het koelcircuit, F95: hogedrukbeveiliging tijdens koelen."),
    K("H99", "Vorstbeveiliging warmtewisselaar binnendeel", 2, "De warmtewisselaar in de binnenunit wordt tegen bevriezen beschermd."),
    K("F12 / F27", "Hogedrukschakelaar buitendeel", 3, "De hogedrukschakelaar in de buitenunit is aangesproken."),
    K("F14", "Afwijking in compressortoerental", 3, "De compressor draait niet op het juiste toerental."),
    K("F29", "Persgastemperatuur te laag", 3, "Lage temperatuur van het persgas uit de compressor."),
    K("F36", "Buitentemperatuursensor defect", 2, "Storing in de buitenvoeler."),
    K("F30 / F37 / F45", "Watertemperatuursensor defect", 2, "F30: aanvoersensor na de back-up heater, F37: retoursensor, F45: aanvoersensor binnenunit."),
    K("F40 / F42 / F43 / F48 / F49", "Sensor in de buitenunit defect", 3, "F40: persgas, F42: condensor boven, F43: ontdooisensor, F48: condensoruitgang, F49: bypass."),
    K("F41 / F46", "Elektrische storing buitenunit", 3, "F41: vermogensfactorcorrectie (PFC), F46: stroomtransformator.")],
  src: ["panaAq"] });
MODELS.push({ id: "intergas-xtend", brand: "Intergas", name: "Xtend hybride warmtepomp", cat: "warmtepompen", years: "Alle bouwjaren", unit: null, also: "Werkt samen met een Intergas-cv-ketel",
  intro: "De Xtend meldt storingen met een gekleurde led en bovenaan het wifi-bedieningsscherm. Bij een blokkerende storing neemt de cv-ketel het verwarmen over; je hebt dus warmte, maar je gasverbruik stijgt.", weak: ["Vuil, bladeren en sneeuw rond de buitenunit.", "Verstopte condensafvoer van de buitenunit."], parts: [],
  tasks: [{ m: 1, t: "Buitenunit controleren op bladeren, vuil en sneeuw" }, { m: 3, t: "Condensafvoer buitenunit controleren", v: true }, { m: 12, t: "Jaarlijkse controle door de installateur" }],
  faults: [
    N("Led brandt continu rood", 1, "Een notificatie: de warmtepomp blijft werken en probeert het zelf op te lossen.", ["Lees de melding bovenaan het wifi-bedieningsscherm.", "Komt de melding steeds terug? Bel je installateur."]),
    N("Led knippert rood", 2, "Een blokkerende storing: de warmtepomp staat stil en de cv-ketel verwarmt in een noodprogramma.", ["Druk op 'Reset' in het bedieningsscherm, of houd de knop boven de led ingedrukt.", "Lukt dat niet of komt de storing terug? Bel je installateur. Laat het niet te lang duren, want de ketel verbruikt meer gas."]),
    N("Buitenunit vuil of ondergesneeuwd", 1, "Bladeren, vuil of sneeuw belemmeren de luchtstroom.", ["Haal bladeren en vuil weg en veeg sneeuw rond en op de buitenunit weg.", "Reinig met een vochtige doek, zonder schurende middelen of oplosmiddelen.", "Controleer de condensafvoer op verstopping."])],
  src: ["igXtend"] }); }
Object.assign(SRC,{ igXtreme: ["Intergas – bedieningsvoorschrift Xtreme (pdf)", "https://intergas-verwarming.nl/app/uploads/2018/01/84008402-Bedieningsvoorschrift-Xtreme.pdf"] });
{ const W = ["Reset de ketel: houd de knipperende servicetoets 2 seconden vast.", "Komt de melding vaker terug? Waarschuw je installateur."];
MODELS.push({ id: "intergas-xtreme", brand: "Intergas", name: "Xtreme cv-ketel", cat: "cv-ketels", years: "Alle bouwjaren", unit: null, also: "Xtreme 30, 36 en 36 CW6",
  intro: "De Xtreme toont storingen met een F-code en meldingen met een N-code op het linker display. Zelf mag je alleen bijvullen en één keer resetten. Ruik je gas? Bel 0800-9009.", weak: [], parts: [], tasks: CV_TASKS,
  faults: [
    F("F004", "Brander ontsteekt niet", 2, "Vaak staat de gaskraan dicht.", ["Controleer of de gaskraan open staat.", "Reset: houd de knipperende servicetoets 2 seconden vast.", "Blijft de storing na de reset? Bel je installateur."]),
    F("N030", "Tapwatervraag geblokkeerd", 1, "Melding: de ketel blokkeert tijdelijk het warme tapwater.", W),
    F("N152", "Fout in de rookgassensor", 2, "Melding van de rookgassensor.", W),
    F("N202", "Brander uitgeschakeld", 1, "Melding: de brander is uitgeschakeld.", W),
    F("N245", "Ventilatortoerental aangepast", 1, "Melding: de ketel heeft het ventilatortoerental aangepast.", W),
    N("Display knippert: waterdruk te laag", 1, "De druk is onder 0,5 bar gezakt; de ketel werkt beperkt.", ["Zet de ketel uit en laat de installatie afkoelen.", "Vul bij met schoon drinkwater via de vul- en aftapkraan tot 1,5 à 2 bar.", "Ontlucht de radiatoren, controleer de druk opnieuw en zet de ketel weer aan.", "Moet je een paar keer per jaar bijvullen? Laat de installateur zoeken naar een lek."])],
  src: ["igXtreme"] }); }
Object.assign(SRC,{ remehaAce: ["Remeha – gebruikershandleiding Calenta Ace (pdf)", "https://documentation.remeha.nl/wp-content/uploads/sites/68/2025/12/Calenta-Ace-Gebruikershandleiding-NL-V8.pdf"] });
(m => { m.faults.push(
  F("A.02.33 / A0233", "Calenta Ace: bijvullen duurt te lang", 1, "De automatische bijvulling krijgt te weinig water.", ["Controleer of de hoofdwaterkraan open staat.", "Kijk of de ketel of installatie ergens lekt.", "Blijft de waarschuwing? Bel je installateur."]),
  F("A.02.34 / A0234", "Calenta Ace: ketel vult te vaak bij", 1, "De ketel blijft werken, maar moet vaak water bijvullen: waarschijnlijk een lek.", ["Zoek naar lekkage bij radiatoren, leidingen en de ketel.", "Blijft de melding? Bel je installateur."]),
  F("H01.14 / H0114", "Calenta Ace: blokkering", 1, "Een tijdelijke blokkering door een ongewone toestand; de ketel start vanzelf weer als de oorzaak weg is. Andere H-codes werken hetzelfde.", ["Controleer of de gaskraan open staat.", "Herstart de ketel.", "Blijft de blokkering? Bel je installateur."]),
  F("E04.08 / E0408", "Calenta Ace: vergrendeling (display knippert rood)", 2, "De ketel is vergrendeld en start pas weer na een reset als de oorzaak is opgeheven. Andere E-codes werken hetzelfde.", ["Reset de ketel één keer met de resettoets.", "Komt de code terug? Bel je installateur."]));
  m.also = (m.also ? m.also + "; " : "") + "Ook Calenta Ace (codes als A.02.33, H01.14, E04.08)";
  if (!m.src.includes("remehaAce")) m.src.push("remehaAce"); })(MODELS.find(m => m.id === "remeha-calenta"));
Object.assign(SRC,{ tqHpr: ["TQ – foutcodes HPR50 (Nederlands, pdf via Simplon)", "https://www.simplon.com/Downloads/Manuals/Komponenten/TQ_HPR50/Error_Codes/TQ_HPR50_Errorcodes_NL.pdf"] });
{ const R = ["Zet het systeem uit en weer aan.", "Komt de code terug? Ga naar je TQ-dealer."];
MODELS.push({ id: "tq-hpr50", brand: "TQ", name: "HPR50 e-bike-motor", cat: "e-bikes", years: "Alle bouwjaren", unit: null, also: "Onder andere in Trek Fuel EXe en Simplon",
  intro: "De TQ HPR50 toont ERR-codes (storing) en WRN-codes (waarschuwing) met een hexadecimaal nummer, zoals ERR 04A8. De meeste softwarefouten verdwijnen na opnieuw opstarten.", weak: ["Snelheidssensor en magneet op het achterwiel.", "Vuil in de laadpoort (CAN-bus)."], parts: [],
  tasks: [{ m: 3, t: "Laadpoort en accuconnector schoonhouden", v: true }, { m: 12, t: "Software laten bijwerken bij de dealer" }],
  faults: [
    F("0401 / 040B / 0483 / 04A9 / 04C8", "ERR: algemene softwarefout", 1, "Een softwarefout in de aandrijving.", R),
    F("0408 / 0445 / 047D", "ERR: overstroom in de aandrijving", 2, "De motor trok te veel stroom.", ["Start het systeem opnieuw op en zorg dat de motor niet onbedoeld meetrapt.", "Komt de code terug? Ga naar je TQ-dealer."]),
    F("0451 / 047F / 0602", "ERR/WRN: motor te warm of te koud", 1, "De toegestane bedrijfstemperatuur is overschreden.", ["Zet de aandrijving uit en laat hem afkoelen.", ...R]),
    F("0458", "ERR: overspanning op de motor", 2, "Vaak een verkeerde of defecte lader.", ["Gebruik alleen de originele lader.", "Komt de code terug? Ga naar je TQ-dealer."]),
    F("0480 / 049C", "ERR: fout in ondersteuning of koppelsensor", 2, "De trapkrachtsensor of de ondersteuning geeft een fout.", ["Start opnieuw op en zorg dat de motor niet onbedoeld meetrapt.", "Komt de code terug? Ga naar je TQ-dealer."]),
    F("04A0 / 0603", "ERR/WRN: CAN-buscommunicatie", 1, "Communicatiefout, vaak door vuil in de laadpoort.", ["Controleer de laadpoort op vuil en maak hem schoon.", ...R]),
    F("04A8 / 0601 / 0605", "ERR/WRN: snelheidssensor", 1, "De magneet staat te ver van de snelheidssensor, of er is aan de sensor geknoeid.", ["Controleer de afstand tussen de magneet op het wiel en de sensor.", ...R]),
    F("04B0", "ERR: mechanische fout in de aandrijving", 2, "Er zit iets klem in of rond het kettingblad.", ["Controleer of er iets vastzit bij het kettingblad en haal het weg.", "Komt de code terug? Ga naar je TQ-dealer."]),
    F("0604", "WRN: update koppelsensor", 1, "De encoder van de koppelsensor wordt bijgewerkt.", ["Wacht ongeveer 1 minuut en zet het systeem niet uit.", "Blijft de melding? Ga naar je TQ-dealer."]),
    F("4409 / 440A / 5009 / 500A", "ERR: accu of range extender diep ontladen", 2, "De spanning is te laag of een cel is defect.", ["Laad de accu meteen op.", ...R]),
    F("441C / 441E / 4420 / 442F / 4474 / 4491", "ERR: accu te warm", 1, "De celtemperatuur van de accu is te hoog. Bij de range extender: 501C, 501E, 5020, 502F, 5074, 5091.", ["Laat de accu afkoelen tot kamertemperatuur.", ...R]),
    F("441D / 441F / 4422", "ERR: accu te koud", 1, "De celtemperatuur van de accu is te laag. Bij de range extender: 501D, 501F, 5022.", ["Laat de accu op kamertemperatuur komen.", ...R]),
    F("440F / 4411", "ERR: accuspanning te laag", 1, "Vaak door kou.", ["Laat de accu op kamertemperatuur komen.", ...R]),
    F("442D / 4436 / 502D / 5036", "ERR: hardwarefout accu of range extender", 2, "Vaak een slecht contact in de connector of kabel.", ["Controleer of de connector of kabel goed vastzit en schoon is.", "Probeer het eventueel zonder range extender.", ...R]),
    F("4485 / 4487 / 5085 / 5087", "ERR: software accu en range extender passen niet", 1, "De software van accu of range extender is niet bijgewerkt of niet compatibel.", ["Probeer het zonder range extender.", "Laat de software bijwerken door je TQ-dealer."]),
    F("5401", "ERR: geen communicatie tussen motor en display", 2, "Verbinding tussen aandrijving en display verbroken.", R),
    F("5402", "ERR: knop ingedrukt bij het opstarten", 1, "Een knop op de afstandsbediening werd ingedrukt of zit vast tijdens het opstarten.", ["Druk niet op de bediening tijdens het opstarten.", "Controleer of een knop vastzit of vuil is en maak hem schoon."]),
    F("5404", "WRN: loophulp verkeerd gebruikt", 1, "De loophulp werd niet goed bediend.", ["Druk op UP (Walk) tot 'Walk' verschijnt, laat los en druk opnieuw om de loophulp te gebruiken."])],
  src: ["tqHpr"] }); }
CATS.push({ id: "laadpalen", name: "Laadpalen", one: "laadpaal", intro: "Lampjes en foutcodes van laadpalen voor je elektrische auto: wat je zelf kunt resetten en wanneer de installateur moet komen." });
Object.assign(SRC,{ easeeLed: ["Easee support – kleuren en knipperen van de lichtstrip", "https://support.easee.com/hc/en-gb/articles/4413179724433-Easee-charger-LED-colours-blinking-and-errors"], alfenEve: ["Alfen – gebruikershandleiding Eve Single Plus (pdf)", "https://eu-assets.contentstack.com/v3/assets/blt08d332658a89f766/blt0694d59a72703dbf/692ec392c2c1e826ac437878/90446022x-evc-ma-1102-2.0-nl_gebruikershandleiding_eve_single_plus.pdf"], goE: ["go-e – hulp bij problemen", "https://go-e.com/nl-nl/support/probleemoplossing"], zpCharge: ["Zonneplan – Charge laadpaal resetten", "https://www.zonneplan.nl/laadpaal/charge-reset"] });
{ const SVC = ["Noteer de code.", "Neem contact op met de servicedienst van Alfen of je leverancier."]; const INST = ["Noteer de code.", "Laat een erkend installateur de installatie controleren."];
MODELS.push({ id: "easee-laadpaal", brand: "Easee", name: "Easee Home, Charge en One", cat: "laadpalen", years: "Alle bouwjaren", unit: null, also: "Ook Equalizer",
  intro: "De Easee laat zijn status zien met de lichtstrip. Kijk bij een rode strip altijd eerst in de Easee-app voor de precieze melding, voordat je de stroom eraf haalt.", weak: [], parts: [], tasks: [],
  faults: [
    N("Lichtstrip knippert wit", 1, "De lader wacht op autorisatie.", ["Houd je Easee Key of RFID-pas tegen het RFID-vlak, of geef de lader vrij in de app."]),
    N("Lichtstrip knippert rood na pas of app", 1, "De autorisatie is niet geaccepteerd.", ["Controleer of de pas aan het juiste account, de juiste locatie of lader is gekoppeld.", "Controleer of je account toegang heeft en probeer opnieuw."]),
    N("Lichtstrip knippert rood", 2, "Het laden is gestopt, bijvoorbeeld door een veiligheidsstop of te hoge temperatuur.", ["Kijk in de app wat de precieze waarschuwing is.", "Bij te hoge temperatuur: stop met laden en volg de aanwijzingen van Easee.", "Herstart niet steeds opnieuw. Geen melding in de app? Neem contact op met Easee."]),
    N("Lichtstrip brandt continu rood", 3, "Veiligheidsvergrendeling.", ["Stop de sessie en haal de kabel eerst uit de auto, daarna uit de lader. Forceer niets.", "Herstart één keer via de groep in de meterkast.", "Slaat de groep of aardlekschakelaar opnieuw af? Laat hem uit en bel een elektricien.", "Blijft de strip rood? Neem contact op met Easee."]),
    N("Wit of blauw, maar de auto laadt niet", 1, "Auto aangesloten maar niet aan het laden. Blauw betekent dat slim laden aan staat.", ["Controleer of er een laadschema, belastingsbeperking of een instelling in de auto actief is.", "Kijk in de app naar de status."]),
    N("Onderste lampje knippert geel of wit", 1, "Geel: de installatie is niet afgerond. Wit: een secundaire lader bereikt de primaire niet.", ["Geel: neem contact op met je installateur.", "Wit: controleer of de primaire lader stroom heeft en herstart eerst de primaire, dan de secundaire."]),
    N("Lichtstrip helemaal uit", 1, "De lader is gedeactiveerd, offline of de helderheid staat op nul.", ["Kijk in de app: gedeactiveerd? Activeer hem via Bluetooth.", "Offline: controleer stroom en verbinding.", "Controleer of de ledhelderheid hoger dan nul staat."])],
  src: ["easeeLed"] });
MODELS.push({ id: "alfen-eve", brand: "Alfen", name: "Eve Single Plus en Pro-line", cat: "laadpalen", years: "Alle bouwjaren", unit: null,
  intro: "De Alfen Eve toont een foutcode op het display. Codes die met de auto te maken hebben (101, 302, 303) los je vaak op door te testen of het bij een andere auto ook gebeurt.", weak: ["Laadkabel en stekker.", "Vergrendelmotor van de socket."], parts: [],
  tasks: [{ m: 12, t: "Behuizing reinigen met water en milde zeep (geen hogedrukreiniger)" }],
  faults: [
    F("101", "DC-foutstroom boven 6 mA", 2, "Lekstroom aan de DC-kant, vaak door de auto.", ["Gebeurt het bij één auto? Ga naar je autodealer.", "Bij alle auto's: neem contact op met de servicedienst."]),
    F("102 / 103", "Interne fout in de voedingskaart", 3, "Geen of onverwachte spanning op de voedingskaart.", SVC),
    F("104", "12V-voeding of meetcircuit defect", 3, "Defect in de 12V-voeding of het CP-meetcircuit.", INST),
    F("105", "Geen communicatie met de interne kWh-meter", 2, "Aansluiting of configuratie van de meter.", SVC),
    F("106", "Interne aardlekbeveiliging heeft uitgeschakeld", 2, "De interne RCD (30 mA AC) heeft de stroom onderbroken.", INST),
    F("109 / 110", "Verbinding met interne onderdelen verloren", 2, "109: RFID-lezer, 110: een of meer interne apparaten.", SVC),
    F("113", "Interne aardlekschakelaar defect", 3, "De ingebouwde aardlekschakelaar werkt niet.", SVC),
    F("201", "Randaarde ontbreekt of is instabiel", 3, "Probleem met de aarding van de installatie.", ["Laad niet en laat een erkend installateur de aarding controleren."]),
    F("202 / 208", "Netspanning te laag of te hoog", 2, "202: lager dan 205 V, 208: hoger dan 260 V.", INST),
    F("209 / 210", "Geen verbinding met slimme meter of energiebeheer", 1, "209: P1-poort van de slimme meter, 210: Modbus-meter of energiemanagementsysteem.", ["Controleer de P1-kabel of de verbinding met de meter.", "Blijft het? Neem contact op met de servicedienst."]),
    F("211 / 404", "Kabel kan niet worden vergrendeld", 1, "Meestal zit de stekker niet helemaal in de socket, of de vergrendelmotor loopt vast.", ["Haal de stekker eruit en steek hem er volledig in.", "Controleer socket en stekker op vuil.", "Blijft het? Neem contact op met de servicedienst."]),
    F("212", "Fase ontbreekt", 2, "Een fase van de installatie ontbreekt.", ["Controleer de groepen in de meterkast.", "Laat de installateur de spanningen meten."]),
    F("302", "Auto trekt meer stroom dan toegestaan", 2, "Veiligheidsstop.", ["Gebeurt het bij één auto? Ga naar je autodealer.", "Bij alle auto's: neem contact op met de servicedienst."]),
    F("303", "Auto start en stopt te vaak", 1, "De auto start en stopt binnen een minuut te vaak.", ["Controleer de auto en de laadkabel.", "Blijft het? Neem contact op met de servicedienst."]),
    F("304", "Kabel aangesloten zonder laadsessie", 1, "De kabel zat meer dan 2 minuten in zonder dat er een sessie startte.", ["Haal de kabel eruit, steek hem er opnieuw in en start binnen 2 minuten (pas of app)."]),
    F("401 / 402", "Binnentemperatuur te hoog of te laag", 2, "401: boven 70 °C, 402: onder −25 °C.", ["In de volle zon op een hete dag kan 401 voorkomen: bespreek met de installateur of de paal in de schaduw kan.", "Onverwacht? Neem contact op met de servicedienst."]),
    F("405 / 406", "Probleem met de laadkabel", 2, "405: kortsluiting op de Proximity Pilot, 406: geen communicatie met de auto.", ["Probeer een andere laadkabel: werkt die wel, dan is de kabel kapot.", "Controleer socket en stekker.", "Bij meerdere kabels: neem contact op met de servicedienst."])],
  src: ["alfenEve"] });
MODELS.push({ id: "go-e-charger", brand: "go-e", name: "go-eCharger (Gemini en HOMEfix)", cat: "laadpalen", years: "Alle bouwjaren", unit: null, also: "Ook de mobiele go-eCharger",
  intro: "De go-eCharger toont zijn status met een ledring. Bij een algemene fout (rood knipperend) staat de foutcode in de go-e-app.", weak: [], parts: [], tasks: [],
  faults: [
    N("Ledring geel", 1, "De auto is aangesloten maar laadt niet.", ["Controleer de auto en de laadinstellingen in de app."]),
    N("Ledring blauw/wit", 1, "De lader moet nog worden vrijgegeven.", ["Geef de lader vrij met je RFID-chip of in de app."]),
    N("Bovenaan rood, onderaan roze", 2, "De foutstroombeveiliging heeft 6 mA of meer lekstroom gemeten.", ["Bevestig met 'herstarten' in de app, of haal de stekker eruit en steek hem terug.", "Verlaag eventueel de laadstroom en laat het stopcontact controleren."]),
    N("Ledring blauw/rood", 2, "Fasefout: mogelijk zijn er maar 2 fasen.", ["Controleer de voedingskabel en test op een ander stopcontact."]),
    N("Bovenaan rood knipperend, onderaan geel/groen", 3, "Aardfout.", ["Laad niet en laat de aarding van het stopcontact controleren door een elektricien."]),
    N("Rood knipperend", 1, "Algemene fout.", ["Lees de foutcode in de go-e-app."]),
    N("5 leds bovenaan rood", 1, "Onbekende RFID-chip.", ["Leer de chip eerst aan in de app."]),
    N("Regenboogkleuren blijven hangen", 1, "De lader start op, maar wifi wordt gestoord.", ["Zet mogelijke stoorbronnen uit, zoals apparaten in een wifi-mesh."])],
  src: ["goE"] });
MODELS.push({ id: "laadpaal-resetten", brand: "Alle merken", name: "Laadpaal resetten (algemeen)", cat: "laadpalen", years: "Alle bouwjaren", unit: null, also: "Voorbeeld: Zonneplan Charge",
  intro: "Een geel of rood lampje, of helemaal geen lampje, wijst bij de meeste laadpalen op een storing. Een volledige herstart via de meterkast lost veel storingen op.", weak: [], parts: [], tasks: [],
  faults: [
    N("Laadpaal herstarten via de meterkast", 1, "Een tijdelijke storing of de paal is offline.", ["Haal de laadkabel uit de auto.", "Zet de groep van de laadpaal in de meterkast uit (vaak een aardlekautomaat met een EV-sticker).", "Wacht 10 minuten.", "Zet de groep weer aan. Binnen ongeveer 10 minuten hoort de paal weer in de app te staan.", "Slaat de groep meteen weer af? Laat hem uit en bel een elektricien."]),
    N("Auto laadt niet volgens de app-instellingen", 1, "Sommige auto's hebben een eigen slim laadsysteem dat voorgaat op de app van de laadpaal.", ["Zet het laadschema in de auto uit en probeer opnieuw."]),
    N("Laadpaal is offline", 1, "Geen internetverbinding met de paal.", ["Na een herstart kun je bij veel palen gewoon laden via plug & charge: steek de kabel in de auto en het laden start.", "Kijk of de wifi of de netwerkkabel van de paal werkt."])],
  src: ["zpCharge"] }); }
Object.assign(SRC,{ wallboxLed: ["Wallbox Help Center – Pulsar Plus status-leds", "https://support.wallbox.com/en/knowledge-base/pulsar-plus-status-leds-colours-meaning/"], zaptecLed: ["Zaptec help – lampjes Zaptec Go", "https://help.zaptec.com/hc/en-001/articles/4409016473617"], teslaMC: ["Tesla service – statuslampjes Gen 3 Mobile Connector", "https://service.tesla.com/docs/Public/diy/modely/nl_nl/GUID-A3E80EDD-EC39-4717-A2DF-C6ADF04D0F63.html"] });
MODELS.push({ id: "wallbox-pulsar", brand: "Wallbox", name: "Pulsar Plus en Pulsar Max", cat: "laadpalen", years: "Alle bouwjaren", unit: null,
  intro: "De Wallbox Pulsar laat zijn status zien met de ledring. Rood betekent een storing: laad dan niet.", weak: [], parts: [], tasks: [],
  faults: [
    N("Led brandt rood", 3, "Storing aan lader, auto of stroomnet.", ["Laad niet.", "Neem contact op met de klantenservice van Wallbox."]),
    N("Led geel", 1, "De lader is vergrendeld.", ["Ontgrendel hem in de Wallbox-app met een geautoriseerde gebruiker.", "Automatisch vergrendelen kan hem na een tijd weer op slot zetten."]),
    N("Led turquoise knippert", 1, "Een gepland laadmoment staat klaar, of bij Power Boost: wachten op genoeg stroom.", ["Steek de stekker in de auto.", "Bij Power Boost: wacht tot er genoeg vermogen beschikbaar is."]),
    N("Led oranje knippert", 2, "De communicatie met de MID-meter is mislukt.", ["Laat de installatie en instelling van de MID-meter controleren."]),
    N("Witte ronddraaiende led", 1, "Software-update bezig.", ["Niets doen; volg de voortgang in de app."]),
    N("Led 30 seconden rood of groen/wit/turquoise afwisselend", 1, "Probleem met dynamische of statische belastingverdeling tussen meerdere laders.", ["Controleer de instellingen van Load Management in de app.", "Lukt het niet? Neem contact op met Wallbox."])],
  src: ["wallboxLed"] });
MODELS.push({ id: "zaptec-go", brand: "Zaptec", name: "Zaptec Go en Go 2", cat: "laadpalen", years: "Alle bouwjaren", unit: null,
  intro: "De Zaptec Go toont zijn status met één lichtstrook.", weak: [], parts: [], tasks: [],
  faults: [
    N("Lampje rood", 2, "Er is een fout gevonden.", ["Haal de kabel uit de auto en herstart de lader.", "Blijft het rood? Neem contact op met je installateur."]),
    N("Lampje geel", 1, "Wacht op autorisatie.", ["Geef de lader vrij met de app of je NFC/RFID-pas."]),
    N("Lampje groen", 1, "Laden gepauzeerd of gepland (Eco-modus, laag vermogen of een schema).", ["Controleer het laadschema en de instellingen in de app."]),
    N("Lampje oranje", 1, "De installateur heeft de lader niet helemaal ingesteld.", ["Neem contact op met je installateur of Zaptec."]),
    N("Paars knipperend", 1, "Firmware-update bezig (ongeveer 3 minuten).", ["Wachten tot de update klaar is."]),
    N("Geen lampje", 1, "Geen stroom.", ["Controleer de groep in de meterkast en de aansluiting.", "Lost het niet op? Neem contact op met je installateur."])],
  src: ["zaptecLed"] });
MODELS.push({ id: "tesla-mobile-connector", brand: "Tesla", name: "Mobile Connector Gen 3 (laadkabel)", cat: "laadpalen", years: "Alle bouwjaren", unit: null, also: "Mobiele laadkabel voor het stopcontact",
  intro: "De Mobile Connector toont storingen met groene leds en een rode led die een aantal keer knippert. Tel het aantal keer knipperen.", weak: ["Te warme wandcontactdoos of stekker."], parts: [],
  tasks: [],
  faults: [
    N("Rode led knippert continu, groene uit", 2, "Gestopt door een aardfout (lekstroom).", ["Ontkoppel en sluit opnieuw aan.", "Probeer een ander stopcontact.", "Blijft het? Neem contact op met Tesla Service."]),
    N("Rode led knippert 2 keer", 2, "Gestopt door verlies van aarde.", ["Zorg dat het stopcontact goed geaard is en probeer een ander stopcontact.", "Laat zo nodig een elektricien kijken."]),
    N("Rode led knippert 3 keer", 2, "Groen uit: relaisfout. Groen knippert of aan: te heet in de regelaar.", ["Ontkoppel en sluit opnieuw aan.", "Bij te hoge temperatuur: laad op een koelere plek.", "Blijft het? Neem contact op met Tesla Service."]),
    N("Rode led knippert 4 keer", 2, "Te heet in de wandstekker; de laadstroom is verlaagd of gestopt.", ["Controleer of het stopcontact geschikt is en de stekker goed vastzit.", "Probeer een ander stopcontact en laat zo nodig een elektricien kijken."]),
    N("Rode led knippert 5 keer", 1, "Storing in de adapter.", ["Controleer of de adapter goed vastzit."]),
    N("Rode led knippert 6 of 7 keer", 1, "6 keer: geen communicatie met de auto. 7 keer: softwarefout of verkeerde versie.", ["Ontkoppel en sluit opnieuw aan.", "Bij 7 keer: installeer een beschikbare software-update van de auto."]),
    N("Alle leds aan, rood aan", 2, "Gestopt door over- of onderspanning.", ["Controleer stopcontact en stekker en probeer een ander stopcontact.", "Laat zo nodig een elektricien kijken."])],
  src: ["teslaMC"] });
Object.assign(SRC,{ siWasFc: ["Siemens – foutcodes en symbolen wasmachines", "https://www.siemens-home.bsh-group.com/nl/service/ondersteuning/problemen/wasmachines/foutcodes-en-symbolen"], siVaatFc: ["Siemens – foutcodes vaatwassers", "https://www.siemens-home.bsh-group.com/nl/service/ondersteuning/problemen/vaatwassers/foutcodes"], siEq9: ["Siemens – displaymeldingen EQ9 plus", "https://www.siemens-home.bsh-group.com/nl/service/ondersteuning/problemen/koffiemachines/eq9/displaymeldingen"] });
(m => { const SVC = ["Niet zelf op te lossen.", "Neem contact op met de klantenservice of maak een reparatieafspraak."]; m.faults.push(
  F("E:00", "Algemene storing", 1, "Een algemene elektronicastoring.", ["Zet de machine uit, wacht vijf seconden en zet hem weer aan.", "Komt de melding terug? Neem contact op met de klantenservice."]),
  F("E10-00 / E10-10 / E10-20", "Pomp van i-DOS geblokkeerd", 1, "De doseerpomp van het automatische doseersysteem zit vast.", ["Maak de wasmiddellade schoon volgens de gebruiksaanwijzing.", "Blijft de storing? Zet i-DOS uit en doseer met de hand tot de monteur is geweest."]),
  F("E19", "Verwarmingstijd overschreden", 3, "Het water wordt niet op tijd warm.", SVC),
  F("E20", "Onverwachte verwarming", 2, "De machine verwarmt terwijl dat niet de bedoeling is.", ["Zet de machine uit en weer aan.", "Lukt dat niet? Maak een reparatieafspraak."]),
  F("E27", "Druksensor of niveauregelaar defect", 3, "De sensor die het waterniveau meet werkt niet.", SVC),
  F("E33 / E:30-20", "Te veel schuim", 1, "Te veel wasmiddel, vooral bij zacht water en weinig vuile was.", ["Gebruik minder wasmiddel."]),
  F("E:80-31 / E34", "Deur sluit niet goed", 1, "Er zit wasgoed klem of de deur is niet goed dicht. Ook E16 en E61.", ["Open de deur, haal klemmend wasgoed weg en druk de deur goed dicht.", "Druk op Start/bijvullen.", "Lukt het niet? Zet de machine uit en aan en start het programma opnieuw."]),
  F("E:35-10", "Lekkage: water in de bodemplaat", 2, "Water in de bodem van de machine (ook E23).", ["Draai direct de waterkraan dicht.", "Zoek het lek of neem contact op met de klantenservice."]),
  N("Kraansymbool op het display", 1, "Waterdruk te laag, of de toevoerslang is geknikt of verstopt.", ["Controleer de waterdruk met een emmer: een volledig open kraan geeft ongeveer 10 liter per minuut.", "Controleer of de slang vrij is en niet geknikt.", "Maak de zeefjes in de toevoerslang schoon."]),
  N("Sleutelsymbool, rr8 of CL op het display", 1, "Het kinderslot staat aan.", ["Zet het kinderslot uit volgens de handleiding (vaak een knop of combinatie een paar seconden ingedrukt houden)."]));
  if (!m.src.includes("siWasFc")) m.src.push("siWasFc"); })(MODELS.find(m => m.id === "bosch-siemens-wasmachine"));
(m => { const SVC = ["Noteer de code.", "Neem contact op met de klantenservice of maak een reparatieafspraak."]; m.faults.push(
  F("E06 / E:80-00", "Deursensor of elektronica defect", 3, "De deursensor of de elektronica geeft een fout.", SVC),
  F("E07 / E10 / E31", "Storing in het droogsysteem", 2, "E07 (E:63-70) en E10 (E:20-10): droogsysteem. E31: het water wordt niet warm en de vaatwasser droogt niet.", SVC),
  F("E08 / E:31-10", "Waterniveau in het spoelbad te laag", 1, "Servies staat verkeerd: een gekantelde schaal of pan met water, of servies dat de toevoer afdekt.", ["Ruim het servies anders in en zorg dat er geen water in schalen blijft staan.", "Komt het vaker voor? Neem contact op met de klantenservice."]),
  F("E11 / E:84-32", "Storing in het verwarmingssysteem", 3, "De verwarming werkt niet goed.", SVC),
  F("E12 / E:20-60", "Verwarmingselement verkalkt of vuil", 1, "Kalk of vuil op het verwarmingselement.", ["Ontkalk de vaatwasser volgens de handleiding."]),
  F("E19 / E:32-30 / E:69-00 / F19", "Storing in het vaatwasmiddelbakje of een interne klep", 2, "Storing aan de dispenser of een interne klep.", ["Draai de waterkraan dicht en zet de vaatwasser uit.", "Probeer het niet zelf te repareren en vraag een monteur aan."]),
  F("E20 / E21", "Storing in het spoelcircuit", 3, "Mogelijk een defecte circulatiepomp (E:60-01, E:60-02).", SVC),
  F("E23 / E:61-01", "Afvoerpomp defect", 3, "Storing in de afvoerpomp; alleen een monteur kan dit verhelpen.", SVC),
  F("E26 / E:66-00", "Defect onderdeel in het watercircuit", 3, "Een onderdeel in het watercircuit is defect.", SVC),
  F("E27 / E29 / E30", "Netvoeding te laag", 1, "Fout in de netvoeding of te lage spanning; de vaatwasser zelf is niet defect.", ["Controleer stopcontact, verlengsnoer en groep.", "Blijft de fout terugkomen? Neem contact op met de klantenservice."]),
  N("Display knippert", 1, "De deur is niet goed dicht.", ["Sluit de deur voorzichtig opnieuw.", "Controleer of er bestek of een geurhanger uit het mandje steekt."]),
  N("Zout- of glansmiddelindicator blijft branden", 1, "Geen zout of glansmiddel, of de sensor herkent zouttabletten niet.", ["Vul glansmiddel en speciaal vaatwaszout bij.", "Gebruik grof zout, geen zouttabletten."]));
  if (!m.src.includes("siVaatFc")) m.src.push("siVaatFc"); })(MODELS.find(m => m.id === "bosch-siemens-vaatwasser"));
(m => { m.faults.push(
  N("Melding 'Bonenreservoir vullen' terwijl er bonen in zitten", 1, "De bonen vallen niet in het maalwerk, vaak door vette bonen.", ["Tik licht tegen het bonenreservoir.", "Probeer een andere, minder vette koffiesoort.", "Maak het reservoir leeg en veeg het droog schoon."]),
  N("Melding 'Lekschaal legen' bij een lege lekschaal", 1, "Je leegde de schaal terwijl het apparaat uit stond, of de schaal is vuil.", ["Haal de lekschaal eruit terwijl het apparaat aan staat en plaats hem terug.", "Maak de lekschaal grondig schoon."]),
  N("Melding 'Water bijvullen' of 'Filter verwijderen'", 1, "Watertank niet goed geplaatst, koolzuurhoudend water, vastzittende vlotter, of lucht in of een oud waterfilter.", ["Plaats de watertank goed en vul hem met vers kraanwater.", "Maak de tank schoon zodat de vlotter vrij beweegt.", "Dompel het waterfilter onder tot er geen luchtbellen meer opstijgen, of plaats een nieuw filter."]),
  N("Vaak een ontkalkmelding", 1, "Het water bevat veel kalk.", ["Plaats een waterfilter en activeer het volgens de gebruiksaanwijzing."]),
  N("Melding 'Zetgroep reinigen'", 1, "Vuile zetgroep, te veel gemalen koffie of een stroef mechanisme.", ["Reinig de zetgroep.", "Gebruik maximaal twee afgestreken maatlepels gemalen koffie.", "Vet de afdichtingen licht in met voedselveilig siliconenvet."]));
  if (!m.src.includes("siEq9")) m.src.push("siEq9"); })(MODELS.find(m => m.id === "siemens-eq-volautomaat"));
Object.assign(SRC,{ siDroger: ["Siemens – probleemoplossing drogers", "https://www.siemens-home.bsh-group.com/nl/service/ondersteuning/problemen/drogers"] });
(m => { m.faults.push(
  F("E:20-A0 / E:20-A1 / E:20-22", "Pluizenfilter mogelijk vervuild", 1, "Nieuwere Siemens-drogers tonen deze codes in plaats van E01 of E02.", ["Maak het pluizenfilter in de deur schoon na elke droogbeurt.", "Spoel het filter af als er een waslaagje op zit en laat het drogen."]),
  F("E03 / E:30-40", "Condenswaterreservoir vol of afvoerslang verstopt", 1, "Het reservoir is vol of de afvoerslang is geknikt of verstopt.", ["Leeg het condenswaterreservoir.", "Maak het filter in het reservoir schoon.", "Bij een vaste afvoer: controleer of de slang niet geknikt of verstopt is."]),
  F("E04 / E:91-00", "Te veel wasgoed of wasgoed te nat", 1, "De trommel is te vol of de was is niet goed gecentrifugeerd.", ["Doe minder wasgoed in de trommel.", "Centrifugeer de was op een hoger toerental voordat je droogt."]),
  F("CArE / CrE", "Melding apparaatverzorging (geen storing)", 1, "Automatische herinnering om onderhoud te doen.", ["Maak pluizenfilter, condensor of warmtewisselaar schoon volgens de gebruiksaanwijzing."]));
  if (!m.src.includes("siDroger")) m.src.push("siDroger"); })(MODELS.find(m => m.id === "siemens-droger"));
Object.assign(SRC,{ siKook: ["Siemens – foutcodes en meldingen kookplaten", "https://www.siemens-home.bsh-group.com/nl/service/ondersteuning/problemen/kookplaten"] });
(m => { m.faults.push(
  F("Er / E knippert", "Bedieningsveld vochtig of er staat iets op", 1, "Knipperende indicaties of een knipperende E: vocht of een voorwerp op het bedieningsveld.", ["Droog het bedieningsveld af en haal voorwerpen weg."]),
  F("F0 / F9", "Interne fout", 2, "Ook 'Er' of 'd' met een nummer: storing in de elektronica.", ["Maak de kookplaat een paar minuten stroomloos (zet de groep uit).", "Blijft het? Neem contact op met de klantenservice."]),
  F("E7015 / E8207 / E8208", "Elektronica oververhit", 1, "De betreffende kookzone is uitgeschakeld.", ["Wacht tot de elektronica is afgekoeld en raak een symbool aan."]),
  F("F10 / F11", "Vetfilter of koolstoffilter (afzuigkookplaat)", 1, "Het vetfilter moet worden gereinigd of het koolstoffilter is verzadigd. Ook alleen 'F'.", ["Reinig het vetfilter of vervang het koolstoffilter.", "Zet daarna de verzadigingsaanduiding terug volgens de handleiding."]),
  F("E7010", "Geen verbinding met thuisnetwerk of afzuigkap", 1, "Home Connect of de koppeling met de afzuigkap werkt niet.", ["Bevestig de melding; koken kan gewoon.", "Komt de melding terug? Verbind opnieuw."]),
  F("E9000 / E9010 / U1", "Netspanning buiten bereik", 2, "De bedrijfsspanning is te hoog of te laag.", ["Neem contact op met je netbeheerder of laat een elektricien meten."]),
  F("U400 / E513 / E0513 / E9011", "Kookplaat niet goed aangesloten", 3, "De aansluiting komt niet overeen met het schakelschema.", ["Gebruik de kookplaat niet.", "Laat een erkend installateur de aansluiting volgens het schakelschema controleren."]));
  if (!m.src.includes("siKook")) m.src.push("siKook"); })(MODELS.find(m => m.id === "bosch-siemens-kookplaat"));
Object.assign(SRC,{ dgRed: ["Nescafé Dolce Gusto – startknop blijft rood (n2-error-10001)", "https://www.dolce-gusto.be/nl/n2-error-10001"], dgWarn: ["Nescafé Dolce Gusto – witte knipperende startknop", "https://www.dolce-gusto.be/nl/n2-warning-1"], dgSlow: ["Nescafé Dolce Gusto – drank later klaar of kouder", "https://www.dolce-gusto.nl/n2-slow-flow"], cbDG: ["Coolblue – Dolce Gusto ontkalken", "https://www.coolblue.nl/advies/hoe-ontkalk-je-een-dolce-gusto.html"] });
MODELS.push({ id: "dolce-gusto", brand: "Nescafé Dolce Gusto", name: "Dolce Gusto (NEO, Genio S, Mini Me, Piccolo)", cat: "koffiemachines", years: "Alle bouwjaren", unit: null, also: "Gemaakt door Krups en De'Longhi",
  intro: "Dolce Gusto-machines melden problemen met de kleur van de startknop. Ontkalk elke 3 tot 4 maanden of na ongeveer 400 koffies.", weak: ["Kalk: trage doorloop en lauwe koffie."], parts: [],
  tasks: [{ m: 3.5, t: "Ontkalken", s: "Elke 3 à 4 maanden of na ongeveer 400 koffies, of als het lampje oranje brandt" }],
  faults: [
    F("n2-error-10001", "NEO: startknop blijft rood branden", 3, "Waarschijnlijk een technische storing.", ["Zet de machine uit en haal de stekker eruit.", "Wacht 10 seconden, steek de stekker terug en zet de machine aan.", "Blijft de knop rood? Neem contact op met de Dolce Gusto-klantenservice en noem de code."]),
    F("n2-warning-1", "NEO Latte: startknop knippert snel wit", 1, "Een vastgelopen pad of een probleem met de opvangbak.", ["Wacht tot de machine de pad zelf uitwerpt.", "Leeg de opvangbak en zet hem goed terug.", "Knippert hij nog? Haal een vastzittende pad voorzichtig met een stomp voorwerp uit het vakje.", "Haal de stekker er niet uit."]),
    F("n2-alert-5", "NEO Latte: startknop knippert wit", 1, "De opvangbak voor de pads zit niet goed.", ["Neem de opvangbak eruit, leeg hem en schuif hem goed terug.", "Probeer opnieuw koffie te zetten."]),
    N("Koffie loopt traag of is lauw", 1, "Kalkaanslag in de machine.", ["Ontkalk de machine met Dolce Gusto-ontkalker; gebruik geen azijn.", "Haal de stekker er niet uit tijdens het ontkalken."]),
    N("Ontkalken (Genio S, Mini Me en vergelijkbaar)", 1, "Het oranje lampje brandt of het is 3 à 4 maanden geleden.", ["Los ontkalker op in een halve liter water en giet het in het reservoir. Zet een beker van minstens 0,5 liter onder de uitloop.", "Houd de aan/uit-knop 5 seconden ingedrukt tot hij groen knippert en start het warme water.", "Wacht tot de knop weer constant groen brandt.", "Spoel na met 1 liter vers water: 2 minuten warm, 2 minuten koud."]),
    N("Ontkalken (NEO Latte)", 1, "De doorloop is traag of het lampje vraagt erom.", ["Meng 0,5 liter water met Dolce Gusto-ontkalker in het lege reservoir.", "Haal het druipbakje weg en zet een bak van 0,7 liter onder de uitloop.", "Sluit de schuif en houd de startknop 15 seconden ingedrukt tot het lampje twee keer oranje knippert.", "Wacht twee minuten nadat het lampje blauw wordt, vul het reservoir met water en spoel door met de startknop."])],
  src: ["dgRed", "dgWarn", "dgSlow", "cbDG"] });
Object.assign(SRC,{ samsungVaatBE: ["Samsung België – informatiecodes vaatwasser", "https://www.samsung.com/be/support/home-appliances/displayed-information-codes-on-my-dishwasher"] });
(m => { const SUP = "Komt de code terug? Neem contact op met Samsung Support."; m.faults.push(
  F("1C", "Start niet of stopt vroeg, pompt zonder water", 1, "Je hoort het vullen, maar hij pompt door zonder water: vaak een verstopt filter.", ["Controleer of het filter verstopt is en maak het schoon.", "Gebruik altijd vaatwasmiddel en laad gelijkmatig in.", "Zet de vaatwasser uit, wacht 5 minuten en zet hem weer aan."]),
  F("3C / 3E", "Vult wel, maar sproeit niet", 2, "De circulatie start niet.", ["Zet de stroom 1 minuut uit en probeer opnieuw.", SUP]),
  F("4C5 / 4E5", "Vult en stopt snel met een droge kuip", 1, "Te lage waterdruk of de toevoer is geblokkeerd.", ["Controleer of de kraan helemaal open staat.", "Haal knikken uit de toevoerslang.", "Controleer de waterdruk."]),
  F("5C / 5E", "Pompt niet af", 1, "Het waterpeil daalt niet: afvoer verstopt.", ["Maak het filter onderin de kuip schoon.", "Controleer of de afvoerslang niet geknikt is.", "Controleer de afvoer buiten de machine (sifon, gootsteen) op verstopping."]),
  F("5C2", "Afvoerpomp start niet of loopt vast", 1, "Er zit iets in de pomp.", ["Annuleer het programma en luister of de pomp draait.", "Haal de stekker eruit, haal het onderste rek en het filter weg.", "Haal etensresten, etiketten, botjes of glas uit de opvangbak."]),
  F("6C / BE", "Knop blijft hangen", 1, "Het bedieningspaneel denkt dat er een toets ingedrukt blijft.", ["Druk elke knop één voor één in en controleer of hij goed terugveert.", SUP]),
  F("6C1", "Zeepbakje gaat niet open", 1, "De motor van het zeepbakje werkt niet goed, vaak door een vastzittend tablet.", ["Haal de stekker 5 minuten uit het stopcontact.", "Controleer of er een vaatwastablet vastzit in het zeepbakje."]),
  F("7C", "Sproeiarm of verdeelklep werkt niet", 3, "Er wordt nauwelijks gesproeid en de vaat wordt niet schoon.", ["Neem contact op met Samsung Support."]),
  F("9C1 / UC / 9E1", "Spanning te hoog of afwijkend", 2, "De vaatwasser beschermt zichzelf tegen een afwijkende netspanning.", ["Zet de vaatwasser uit bij stopcontact of groep, wacht 1 minuut en start opnieuw.", "Sluit hem aan op een eigen stopcontact zonder verlengsnoer of stekkerblok.", "Verdwijnt de code dan? Dan zat het probleem in de stroomvoorziening."]),
  F("9C2", "Start niet of stopt halverwege (voeding)", 2, "Het paneel gaat aan, maar er wordt niet gewassen.", ["Haal de stekker 5 minuten eruit en probeer opnieuw.", "Sluit aan op een eigen stopcontact zonder verlengsnoer of stekkerblok."]),
  F("AC6", "Elektronisch geblokkeerd, Start doet niets", 2, "De besturing is vastgelopen.", ["Zet de groep uit of haal de stekker 10 minuten eruit.", "Zet weer aan en start een programma.", SUP]),
  F("bC3 / bE3", "Bedieningspaneel doet vreemd", 1, "Continu piepen of opties die vanzelf oplichten, vaak na schoonmaken, morsen of stoom.", ["Droog het bedieningspaneel met een pluisvrije doek.", "Zet de stroom minstens 30 seconden uit.", "Tik de knoppen kort aan in plaats van lang indrukken."]),
  F("DC", "Deur niet goed dicht", 1, "De vaatwasser start niet of stopt kort na de start.", ["Sluit de deur stevig, maar sla hem niet dicht.", "Haal uitstekend bestek of pannenstelen weg.", "Maak de sluitlip en het slot schoon en controleer of een kast of blad de deur niet blokkeert."]),
  F("FC / FC2 / FC3 / FC4", "Storing in de droogventilator", 2, "De vaat blijft nat en er komt weinig warme lucht.", ["Zet de stroom minstens 5 minuten uit.", "Controleer of het rooster bij de deur vrij is.", "Laad de vaat anders in en probeer opnieuw.", SUP]),
  F("HC1", "Stopt halverwege: water te heet of slechte circulatie", 1, "Te heet toevoerwater of verstopte filters.", ["Sluit de vaatwasser niet aan op heet water.", "Maak de filters schoon."]),
  F("HC2 / HC4 / tC1 / tC2", "Stopt tijdens het drogen", 1, "De hete lucht kan niet weg: het rooster bij de deur is geblokkeerd.", ["Zorg dat er niets voor het rooster aan de buitenkant staat.", "Zet hoge plastic spullen niet tegen het rooster aan de binnenkant.", "Houd de rand van het rooster schoon en droog."]),
  F("OC", "Te veel water of schuim", 1, "Te veel schuim, verstopte filters of een geknikte afvoerslang.", ["Gebruik alleen vaatwasmiddel, geen afwasmiddel.", "Maak de filters schoon.", "Controleer of de afvoerslang niet geknikt is en de vaatwasser er niet op staat."]));
  if (!m.src.includes("samsungVaatBE")) m.src.push("samsungVaatBE"); })(MODELS.find(m => m.id === "samsung-vaatwasser"));
Object.assign(SRC,{ samsungAirco: ["Samsung Nederland – foutcodes airconditioner", "https://www.samsung.com/nl/support/home-appliances/wat-betekent-de-foutcode-op-het-display-van-mijn-airconditioner/"], samsungKoelDisp: ["Samsung Nederland – display van de koelkast knippert", "https://www.samsung.com/nl/support/home-appliances/waarom-knippert-het-display-van-mijn-koelkast/"] });
{ const SC = ["Noteer de code.", "Neem contact op met een erkend Samsung-servicecentrum of je installateur."];
MODELS.push({ id: "samsung-airco", brand: "Samsung", name: "Airconditioner (WindFree en split)", cat: "airco", years: "Alle bouwjaren", unit: null, also: "De eerste letter van de code kan per model verschillen",
  intro: "Samsung-airco's tonen een code op de binnenunit. CF, CI en dF zijn geen storingen. Bij E-codes noteer je de code en bel je de service.", weak: ["Vuil binnenfilter."], parts: [],
  tasks: [{ m: 0.5, t: "Binnenfilter schoonmaken" }, { m: 12, t: "Jaarlijkse controle door de installateur", v: true }],
  faults: [
    F("CF", "Filter schoonmaken (geen storing)", 1, "Herinnering om het filter te reinigen.", ["Maak het binnenfilter schoon of vervang het. Advies: ongeveer elke 2 weken."]),
    F("CI", "Automatische reiniging aanbevolen (geen storing)", 1, "De binnenunit geeft geuren af.", ["Start de automatische reinigingsfunctie."]),
    F("dF", "Ontdooien (geen storing)", 1, "De buitenunit ontdooit en kan stoom afgeven; de airco blaast tijdelijk niet warm.", ["Even wachten; dit is normaal in de verwarmingsstand."]),
    F("E1 21 / E121", "Kamertemperatuursensor defect", 2, "De airco schakelt niet in.", SC),
    F("E1 22 / E122", "Sensor van de warmtewisselaar defect", 2, "De temperatuursensor van de warmtewisselaar in de binnenunit is defect.", SC),
    F("E1 54 / E154", "Ventilatormotor of condensator defect", 3, "De ventilator van de binnenunit werkt niet goed.", SC),
    F("E1 63 / E163", "EEPROM defect", 3, "Fout in het geheugen van de besturing.", SC),
    F("E5", "Sensor binnenwarmtewisselaar: kortsluiting of open", 2, "De sensor moet mogelijk vervangen worden.", SC),
    F("E6", "Sensor buitenwarmtewisselaar: kortsluiting of open", 2, "De sensor in de buitenunit moet mogelijk vervangen worden.", SC),
    F("E7", "Sensor verwarmingstemperatuur: kortsluiting of open", 2, "De sensor moet mogelijk vervangen worden.", SC)],
  src: ["samsungAirco"] }); }
MODELS.push({ id: "samsung-koelkast", brand: "Samsung", name: "Koelkast en koel-vriescombinatie", cat: "koelkasten", years: "Alle bouwjaren", unit: null, also: "Ook Amerikaanse koelkasten met ijsmaker",
  intro: "Een knipperend display op een Samsung-koelkast betekent meestal dat de temperatuur is opgelopen. Wacht eerst tot hij weer op temperatuur is.", weak: [], parts: [], tasks: [],
  faults: [
    N("Temperatuuricoon knippert", 1, "De temperatuur is opgelopen, vaak doordat de deur lang of vaak open stond.", ["Wacht tot de ingestelde temperatuur weer is bereikt; dan stopt het knipperen.", "Blijft het knipperen? Dan kan het koelsysteem of het bedieningspaneel defect zijn: vraag een reparatie aan."]),
    N("IJsicoon knippert", 1, "De ijsbak zit niet goed.", ["Haal de ijsbak eruit en plaats hem opnieuw goed terug."]),
    N("Ander deel van het display knippert", 1, "Probleem met de stroom of de verbinding tussen deur en koelkast.", ["Controleer of de stekker goed in het stopcontact zit.", "Is de deur kort geleden losgehaald? Controleer of de stekkers tussen deur en koelkast goed vastzitten.", "Knippert het nog? Vraag een reparatie aan bij Samsung."])],
  src: ["samsungKoelDisp"] });
Object.assign(SRC,{ lgAirco: ["LG – foutcodes airconditioner (Help Library, Engels)", "https://www.lg.com/us/support/help-library/how-to-troubleshoot-error-codes-ch05-53-e0-ch32-33-36-38-f4-ch66-90-91-92-and-93-on-your-lg-air-conditioner-CT10000014-20155402834134"] });
{ const RST = ["Kwam de code direct na de installatie? Bel je installateur: vaak een losse aansluiting of een koudemiddellek.", "Tijdens normaal gebruik: haal de stekker eruit of zet de groep uit, wacht ongeveer 5 minuten en zet de stroom weer aan.", "Komt de code terug? Stop met gebruiken en neem contact op met LG of je installateur."];
MODELS.push({ id: "lg-airco", brand: "LG", name: "Airconditioner (split)", cat: "airco", years: "Alle bouwjaren", unit: null, also: "Artcool, Standard Plus, DualCool",
  intro: "LG-airco's tonen CH-codes. Na een reset van 5 minuten verdwijnt een tijdelijke fout vaak. Haal de unit nooit zelf uit elkaar.", weak: [], parts: [],
  tasks: [{ m: 0.5, t: "Luchtfilters schoonmaken", v: true }],
  faults: [
    F("CH05 / CH53 / E0", "Communicatie tussen binnen- en buitenunit", 2, "Tijdelijke storing, verkeerde bedrading, losse connector of een defecte printplaat.", RST),
    F("CH32 / CH33 / CH36 / CH38 / F4", "Koudemiddel of compressor", 3, "Te weinig koudemiddel of een storing in de compressor of de elektronica van de buitenunit.", RST),
    F("CH66 / CH90 / CH91 / CH92 / CH93", "Probleem met installatie of testdraai", 2, "Verkeerde bedrading, testdraai niet afgerond of beperkte koudemiddelstroom.", ["Neem contact op met je installateur."]),
    F("CH237 / CH247", "Buitenunit krijgt geen stroom", 1, "De stekker van de buitenunit zit er niet goed in.", ["Controleer of het snoer van de buitenunit goed in het stopcontact zit.", "Controleer de groep in de meterkast."])],
  src: ["lgAirco"] }); }
Object.assign(SRC,{ zehnderQ: ["Zehnder – gebruikershandleiding ComfoAir Q (NL-BE, pdf via Ventilatieshop)", "https://www.ventilatieshop.be/media/ventilatieshop/downloads/a/s/asset-handleiding-zehnder-comfoair-q-nl-be.pdf"], ithoWpu: ["Itho Daalderop – handleiding WPU 5G warmtepomp (pdf via Nijestee)", "https://www.nijestee.nl/media/B35EF7EF-2406-42A9-B446-1D47499685B7/2%20Handleiding%20warmtepomp.pdf"] });
MODELS.push({ id: "zehnder-comfoair-q", brand: "Zehnder", name: "ComfoAir Q WTW (Q350, Q450, Q600)", cat: "ventilatie", years: "Alle bouwjaren", unit: null,
  intro: "De ComfoAir Q geeft een filterwaarschuwing met een langzaam knipperende led. Snel knipperen (vier keer per seconde) betekent een storing. Trek de stekker er niet zomaar uit: dat kan vocht- en schimmelproblemen geven.", weak: ["Vuile filters."], parts: [["Filters G4/G4", "Zehnder ordernummer 400502012"], ["Filters F7/G4", "Zehnder ordernummer 400502013"]],
  tasks: [{ m: 6, t: "Filters vervangen" }, { m: 6, t: "Ventielen en roosters schoonmaken" }, { m: 12, t: "Onderhoud door de installateur", s: "Warmtewisselaar, ventilatoren, condensafvoer" }],
  faults: [
    N("Display: FILTERS NU WISSELEN", 1, "De filters zijn aan vervanging toe (minstens elk half jaar).", ["Open de klep en kies NU bij de waarschuwing; de ventilatie stopt even.", "Volg het display: filterkappen eraf, oude filters eruit, nieuwe toevoer- en retourfilter erin, kappen terug.", "Kies BEVESTIGEN en sluit de klep.", "Kies NEGEREN als je een dag later wilt vervangen."]),
    N("Led knippert snel met een storingscode", 2, "Er is een storing.", ["Ga naar RESET FOUT, kies BEVESTIGEN en wacht 5 minuten.", "Blijft de fout? Noteer de codes via STATUS > HUIDIGE FOUTEN en het toesteltype via STATUS > TOESTEL.", "Neem contact op met je installateur."]),
    N("Led knippert langzaam: SERVICE MODUS", 1, "Het toestel staat in de servicestand.", ["Dit is geen storing; de installateur zet hem terug."])],
  src: ["zehnderQ"] });
{ const I = installer;
MODELS.push({ id: "itho-wpu", brand: "Itho Daalderop", name: "WPU 5G bodemwarmtepomp", cat: "warmtepompen", years: "Alle bouwjaren", unit: null, also: "WPU 25C t/m 75C",
  intro: "Druk op SERVICE op de thermostaat om de storing te zien. De code verschijnt als A1 of A0 met een nummer, afwisselend in beeld. Alleen bij een te lage cv-druk en een communicatiestoring kun je zelf iets doen.", weak: [], parts: [],
  tasks: [{ m: 1, t: "Cv-druk controleren (1,5–2 bar)" }, { m: 12, t: "Batterijen thermostaat controleren", s: "Alleen 1,5 V lithium AA" }, { m: 12, t: "Jaarlijkse inspectie door de installateur" }],
  faults: [
    F("A1 19", "Cv-waterdruk te laag: warmtepomp staat stil", 1, "De druk in de cv-installatie is te laag.", ["Vul de cv-installatie bij tot 1,5 à 2 bar.", "Controleer op lekkage.", "Blijft de storing? Bel je installateur."]),
    F("A1 20", "Cv-waterdruk laag: warmtepomp werkt nog", 1, "De druk is laag, maar nog niet te laag.", ["Vul bij tot 1,5 à 2 bar en controleer op lekkage."]),
    F("A1 34", "Cv-aanvoertemperatuur te hoog", 1, "Te weinig doorstroming in de cv.", ["Controleer of de radiatorkranen en vloerverwarmingsgroepen open staan.", "Ontlucht de cv-installatie.", "Blijft het? Bel je installateur."]),
    F("A1 36", "Communicatiestoring thermostaat", 1, "De kamerthermostaat is niet goed aangesloten.", ["Controleer of de thermostaat goed is aangesloten en de batterijen goed zijn.", "Blijft het? Bel je installateur."]),
    F("A0 3", "Communicatie met de warmtepomp onderbroken", 1, "Geen verbinding tussen thermostaat en warmtepomp.", ["Controleer of de warmtepomp stroom heeft (groep in de meterkast).", "Controleer de bekabeling van de thermostaat.", "Blijft het? Bel je installateur."]),
    F("A1 1", "Temperatuursensor buiten bereik of defect", 2, "Codes A1 1 tot en met A1 11: een sensor (buiten, boiler, bron, cv of gas) is onderbroken of kortgesloten.", I),
    F("A1 12", "Cv-druksensor defect", 2, "De druksensor werkt niet goed.", I),
    F("A1 17 / A1 18", "Hogedrukschakelaar aangesproken of defect", 3, "De pressostaat in het koelcircuit is geactiveerd of defect.", I),
    F("A1 21", "Compressor of elektrische beveiliging", 3, "A1 21 tot en met 27, 37 en 38: compressor, startstroom, temperatuurbeveiliging, stroomopname, element of relais. A1 22 en 23: fasevolgorde van de voeding.", I),
    F("A1 28", "Temperatuur in het koelcircuit buiten bereik", 3, "A1 28 tot en met 33: bron-, vloeistof-, persgas- of inspuittemperatuur.", I)],
  src: ["ithoWpu"] }); }
Object.assign(SRC,{ remehaElga: ["Remeha – gebruikershandleiding Elga (pdf)", "https://documentation.remeha.nl/wp-content/uploads/sites/68/2025/12/Gebruikershandleiding-Elga-V15.3.pdf"] });
{ const I = ["Zet de Elga uit met knop 1; de cv-ketel verwarmt dan alleen.", "Bel je installateur."];
MODELS.push({ id: "remeha-elga", brand: "Remeha", name: "Elga hybride warmtepomp", cat: "warmtepompen", years: "Alle bouwjaren", unit: null, also: "De Elga zonder Ace; voor de Elga Ace zie de handleiding van je model",
  intro: "Bij een storing toont de thermostaat KETELSTORING; onder INFO staat een getal. Bij meerdere storingen tellen de getallen op (bijvoorbeeld 32 + 4 = 36). De gele led op de Elga knippert lang een aantal keer.", weak: ["Te weinig doorstroming (debiet) door dichte afsluiters of lucht."], parts: [],
  tasks: [{ m: 1, t: "Cv-druk controleren" }, { m: 12, t: "Onderhoud door de installateur" }],
  faults: [
    F("32", "Debietstoring: te weinig doorstroming", 1, "Gele led knippert 6 keer lang. Afsluiters dicht, te lage druk of lucht.", ["Controleer of alle afsluiters open staan.", "Controleer de cv-druk en vul zo nodig bij.", "Ontlucht de installatie.", "Lukt het niet? Bel je installateur."]),
    F("1", "Cv-ketel meldt een storing", 1, "Gele led knippert 1 keer lang (alleen bij OpenTherm-ketels).", ["Kijk op het display van de cv-ketel en zoek de code op in de handleiding van de ketel."]),
    F("2", "Communicatieprobleem met de cv-ketel", 2, "Gele led knippert 2 keer lang.", I),
    F("8 / 16", "Probleem met de Toshiba-print (buitenunit)", 2, "8: geen communicatie met de print (4 keer lang). 16: de print meldt een fout (5 keer lang).", I),
    F("64 / 4", "Temperatuursensor defect", 2, "64: retoursensor NTC1 (7 keer lang). 4: aanvoersensor NTC2 (9 keer lang).", I),
    F("128", "Buitenvoeler defect", 2, "Gele led knippert 8 keer lang.", I),
    N("Groene led buitenunit knippert", 1, "De buitenunit draait nog niet terwijl er warmte gevraagd wordt (voordraaitijd of maximale temperatuur bereikt).", ["Even wachten; dit is normaal."])],
  src: ["remehaElga"] }); }
Object.assign(SRC,{ elxKoelStor: ["Electrolux support – compressor, ijs, geluid en display koelkast", "https://support.electrolux.be/support-articles/koelen/koel-vriescombinaties?locale=nl-BE"] });
(m => { m.faults.push(
  N("Compressor blijft lang draaien", 1, "Te koud ingesteld, net veel of warm eten ingeladen, hoge kamertemperatuur of de deur sluit niet goed.", ["Stel de koelkast in op 4 à 5 °C en de vriezer op −18 °C.", "Laat warm eten eerst afkoelen.", "Controleer of de deur goed sluit en de rubber heel is.", "Is de temperatuur goed? Dan is lang draaien normaal: tot ongeveer 45 minuten per uur, en een elektronisch geregelde compressor draait zelfs continu."]),
  N("IJs op de bodem van de vriezer", 1, "Geblokkeerde luchtstroom of een deur die niet goed sluit.", ["Laat ruimte tussen de producten zodat koude lucht overal komt.", "Controleer of de deuren helemaal dicht gaan.", "Papiertest: klem een vel papier tussen de deur. Glijdt het er zonder weerstand uit, dan sluit de rubber niet goed en moet hij vervangen worden."]),
  N("Vreemd geluid uit de koelkast", 1, "Zoemen, klikken bij starten en stoppen, sissen, brommen, borrelen en kraken zijn normaal.", ["Continu klikken: haal de stekker 60 minuten eruit en steek hem terug. Blijft het? Vraag een monteur aan.", "Trillen of ratelen: zet de koelkast anders neer en kijk of spullen in of op de koelkast tegen elkaar tikken."]),
  N("Display werkt niet na een stroomstoring", 1, "De elektronica is na de storing niet goed opgestart.", ["Haal de stekker 10 seconden uit het stopcontact en steek hem terug.", "Druk op de knop voor de temperatuurweergave.", "Werkt het nog niet? Vraag een monteur aan."]));
  if (!m.src.includes("elxKoelStor")) m.src.push("elxKoelStor"); })(MODELS.find(m => m.id === "electrolux-aeg-koelkast"));
(m => { m.faults.push(
  N("Klok knippert 0:00", 1, "Na een stroomonderbreking of bij het eerste gebruik moet de tijd opnieuw ingesteld worden.", ["Draaiknop of tiptoetsen: open de basisinstellingen en stel de tijd in, bevestig met OK.", "Kloktoets: houd hem ingedrukt tot het klokicoon verschijnt en stel uren en minuten in.", "Knippert het daarna steeds weer? Controleer het stopcontact of de groep."]),
  N("Melding 'reservoir vullen' terwijl het vol is (stoomoven)", 2, "De oven ziet niet dat het waterreservoir vol is.", ["Haal het reservoir eruit en plaats het opnieuw goed terug.", "Blijft de melding? Vraag een monteur aan."]),
  N("Stoomoven ontkalken", 1, "De oven vraagt erom; zonder ontkalken kun je niet meer met stoom koken.", ["Laat de oven afkoelen, haal accessoires eruit en leeg het waterreservoir.", "Zet een diepe bakplaat op de onderste stand.", "Doe 250 ml ontkalker in het reservoir en vul aan met water tot het maximum.", "Kies Reiniging > Ontkalken (ongeveer 100 minuten), leeg daarna de bakplaat.", "Spoel na met alleen water (ongeveer 35 minuten), droog de ovenruimte en laat de deur open."]),
  N("Bovenwarmte werkt niet", 2, "Waarschijnlijk is het bovenste verwarmingselement defect.", ["Vraag een monteur aan."]));
  if (!m.tasks.some(t => /ontkalk/i.test(t.t))) m.tasks = [...m.tasks, { w: "Bij de melding", t: "Stoomoven ontkalken" }]; })(MODELS.find(m => m.id === "electrolux-oven"));
(m => { m.faults.push(
  N("Hangslot op het display, knoppen werken niet", 1, "Het kinderslot staat aan.", ["AEG 7000, 8000 en 9000: houd 'Vlekken/Voorwas' en 'Extra spoelen' ongeveer 5 seconden ingedrukt.", "AEG 6000: tik op 'Vlekken/Voorwas' tot het hangslot weg is, of houd 'Opties' en 'Centrifugeren' 5 seconden vast.", "Lukt het niet? Haal de stekker 5 tot 10 minuten eruit en probeer opnieuw."]),
  N("Wasmachine centrifugeert niet", 1, "Transportbouten nog in een nieuwe machine, Spoelstop aan, verstopte afvoer, onbalans of de machine staat niet waterpas.", ["Nieuwe machine: verwijder de transportbouten.", "Brandt het Spoelstop-lampje? Druk op Start/Pauze.", "Maak het afvoerfilter schoon en controleer de afvoerslang.", "Voeg een of twee handdoeken toe bij weinig of juist één groot stuk wasgoed.", "Zet de machine waterpas op een stevige vloer."]),
  N("Machine loopt vol terwijl hij uit staat", 2, "Helder water: een vervuilde inlaatklep. Vuil water: het komt terug uit de afvoer.", ["Draai de kraan dicht.", "Helder water: draai een kort programma om de inlaatklep door te spoelen.", "Vuil water: controleer de afvoer en de sifon.", "Helpt het niet? Vraag een monteur aan."]),
  N("AquaControl-venster is rood", 1, "Lichtrood is normaal. Helemaal rood en geen water: de toevoerslang heeft gelekt.", ["Neemt de machine normaal water op? Dan hoef je niets te doen.", "Helemaal rood en geen water (vaak met E10)? Vervang de toevoerslang."]),
  N("Melding trommelreiniging", 1, "Advies om de trommel te reinigen tegen geurtjes en vetvlekken.", ["Haal al het wasgoed eruit en zet AutoDose uit.", "Doe een machinereiniger in de lege trommel en draai Katoen op de hoogste temperatuur.", "Draai minstens één keer per maand een onderhoudswas."]));
  if (!m.src.includes("elxWas")) m.src.push("elxWas"); })(MODELS.find(m => m.id === "aeg-wasmachine"));
Object.assign(SRC,{ neffVaat: ["NEFF – foutcodes en waterkraansymbool vaatwassers", "https://www.neff-home.com/nl/service/probleemoplossing-en-foutcodes/vaatwassers/foutcodes"] });
(m => { m.brand = "Bosch / Siemens / Neff"; m.also = m.also + "; NEFF gebruikt dezelfde codes (E09, E15, E19, E24)"; m.faults.push(
  N("Waterkraansymbool brandt", 1, "Knik in een slang, te lage waterdruk of een verstopt filter in de toevoerslang.", ["Trek de vaatwasser iets naar voren en haal knikken uit de toevoer- en afvoerslang.", "Test de waterdruk: draai de slang los en vang een minuut water op in een emmer. Minder dan ongeveer 10 liter? Laat een loodgieter kijken.", "Draai de kraan dicht, haal de slang los en borstel het filtertje schoon onder stromend water.", "Helpt het niet? Draai de kraan dicht en bel een monteur."]));
  if (!m.src.includes("neffVaat")) m.src.push("neffVaat"); })(MODELS.find(m => m.id === "bosch-siemens-vaatwasser"));
Object.assign(SRC,{ prusaCodes: ["Prusa Knowledge Base – QR-foutcodes MK4", "https://help.prusa3d.com/tag/mk4/qr-error-codes_1167"], prusaBedRun: ["Prusa Knowledge Base – Bed thermal runaway (#13203)", "https://help.prusa3d.com/article/bed-thermal-runaway-13203-mk4_401068"], prusaHotRun: ["Prusa Knowledge Base – Hotend thermal runaway (#13204)", "https://help.prusa3d.com/article/hotend-thermal-runaway-13204-mk4_401076"] });
(m => { m.intro = m.intro + " Bij een fout toont de printer een vijfcijferige code met een QR-code: de eerste twee cijfers zijn het printermodel (13 = MK4, 26 = MK4S, 21 = MK3.9, 27 = MK3.9S), het derde de categorie (2 = temperatuur). De codes hieronder staan voor de MK4; bij de andere modellen is alleen het begin anders.";
  const KB = ["Scan de QR-code op het scherm: die opent het Prusa-artikel met de oplossing.", "Kom je er niet uit? Neem contact op met de technische support van Prusa (24/7)."];
  m.faults.push(
  F("13203 / 26203 / 21203 / 27203", "Bed thermal runaway: printbed koelt onverwacht af", 2, "Te koude ruimte of tocht, losse thermistor onder de Kapton-tape, of een losse voedingskabel van het bed.", ["Zet de printer in een ruimte boven 18 °C, uit de buurt van airco of open ramen.", "Controleer of de thermistor goed vastzit onder de gouden Kapton-tape.", "Print kleine voorwerpen in hogetemperatuurfilament niet precies op het midden van het bed.", "Printer uit: open de afdekkappen en controleer of de voedingskabel van het bed onder zijn schroef zit en de thermistorkabel goed vastzit.", "Draai de moeren van de bedaansluiting aan."]),
  F("13204 / 26204 / 21204 / 27204", "Hotend thermal runaway: hotend koelt onverwacht af", 2, "Beschadigde verwarming of thermistor, losse bekabeling, te koude ruimte of te veel koeling.", ["Zet de printer in een ruimte boven 18 °C.", "Controleer of de thermistor helemaal in het verwarmingsblok zit en de stelschroeven vastzitten.", "Controleer de kabels van verwarming en thermistor op schade.", "Verlaag de ventilatorsnelheid als de fout bij bruggen of de eerste lagen optreedt."]),
  F("13101", "Filament zit vast", 1, "De printer detecteert vastgelopen filament.", KB),
  F("13201 / 13202", "Opwarmfout bed of hotend", 2, "13201: het bed warmt niet op. 13202: het hotend warmt niet op.", KB),
  F("13205 / 13206 / 13207 / 13208", "Temperatuur buiten bereik (MAXTEMP of MINTEMP)", 2, "13205 en 13206: bed of hotend te heet gemeten. 13207 en 13208: te koud gemeten, vaak een thermistorprobleem.", KB),
  F("13211 / 13212", "Heatbreak-temperatuur buiten bereik", 2, "13211: MINTEMP, 13212: MAXTEMP van de heatbreak.", KB),
  F("13305", "Homingfout Y-as", 1, "De Y-as vindt zijn nulpunt niet.", KB),
  F("13523 / 13524 / 13525 / 13526", "Fout in de loadcel (meetsensor)", 1, "De loadcel in de Nextruder is niet gekalibreerd of de meting mislukte.", KB),
  F("13117", "Onderhoudswaarschuwing", 1, "De printer geeft aan dat onderhoud nodig is.", KB));
  if (!m.src.includes("prusaCodes")) m.src.push("prusaCodes", "prusaBedRun", "prusaHotRun"); })(MODELS.find(m => m.id === "prusa-mk4"));
Object.assign(SRC,{ bambuHms: ["Bambu Lab Wiki – HMS-foutcodes", "https://wiki.bambulab.com/en/hms/error-code"] });
MODELS.push({ id: "bambu-lab-foutcodes", brand: "Bambu Lab", name: "HMS-foutcodes (A1, P1, X1)", cat: "3d-printers", years: "Alle modellen", unit: null, also: "Ook voor de AMS",
  intro: "Bambu Lab-printers tonen HMS-meldingen met een code zoals 0300-8004 in Bambu Studio, Bambu Handy of op het scherm. Niet elke code komt op elk model voor.", weak: [], parts: [], tasks: [],
  faults: [
    F("0300-8004", "Filament op", 1, "Het filament is op.", ["Laad nieuw filament en ga verder met printen."]),
    F("0700-8011", "AMS-sleuf leeg", 1, "Een sleuf in de AMS heeft geen filament meer.", ["Plaats een nieuwe rol in dezelfde AMS-sleuf."]),
    F("07FF-8010", "AMS-hulpmotor overbelast", 1, "De rol of het filament zit vast.", ["Controleer of de rol vrij draait en het filament niet klem zit.", "Druk op Opnieuw proberen."]),
    F("0300-8016", "Mondstuk verstopt", 1, "Het mondstuk is verstopt met filament.", ["Annuleer de print en maak het mondstuk schoon, of ga verder als het meevalt."]),
    F("0300-8014", "Mondstuk bedekt met filament of printplaat verkeerd geplaatst", 1, "Filament rond het mondstuk of de bouwplaat ligt niet goed.", ["Maak het mondstuk schoon of leg de plaat goed.", "Ga daarna verder."]),
    F("0300-8003", "Spaghetti gedetecteerd", 1, "De AI-bewaking ziet een mislukte print.", ["Controleer de print voordat je verdergaat."]),
    F("0300-800A", "Filament stapelt zich op", 1, "De AI-bewaking ziet afvalfilament ophopen bij de afvalgoot.", ["Haal het filament uit de afvalgoot."]),
    F("0300-800B", "Snijmes zit vast", 1, "Het filamentmes zit vast.", ["Controleer of de hendel van het mes helemaal naar buiten staat."]),
    F("0300-8005", "Voorkap van de printkop los", 1, "De kap van de printkop is eraf gevallen.", ["Zet de kap terug en controleer of de print nog goed gaat."]),
    F("0300-8006 / 0300-8019", "Bouwplaat niet herkend of ontbreekt", 1, "De markering van de bouwplaat wordt niet gezien, of er ligt geen plaat.", ["Leg de bouwplaat erop met alle vier hoeken goed uitgelijnd.", "Houd de markering vrij van vuil en filament."]),
    F("0300-8017", "Voorwerp op het printbed", 1, "Er ligt iets op het bed.", ["Maak het printbed leeg en schoon en ga verder."]),
    F("0500-403A", "Te koud om te printen", 1, "De omgevingstemperatuur is te laag; printen en bewegen zijn geblokkeerd.", ["Zet de printer in een ruimte boven 10 °C."]),
    F("0500-4016 / 0500-402F", "Probleem met de microSD-kaart", 1, "4016: kaart is schrijfbeveiligd. 402F: beschadigde sectoren.", ["Repareer of formatteer de kaart, of vervang hem."]),
    F("0500-4006", "Te weinig opslagruimte", 1, "Er is niet genoeg vrije ruimte voor de printopdracht.", ["Maak ruimte vrij of zet de fabrieksinstellingen terug."]),
    F("0500-402B / 0500-401D", "Wifi- of cloudverbinding mislukt", 1, "402B: verkeerd wifi-wachtwoord. 401D: cloud niet bereikbaar, vaak door een zwak netwerk.", ["Controleer het wifi-wachtwoord.", "Zet de printer dichter bij de router en probeer opnieuw."])],
  src: ["bambuHms"] });
Object.assign(SRC,{ navimow: ["Segway Navimow – foutcodetabel (servicedocument via Witt)", "https://service.witt.dk/ServicePDF/Segway/navimow-errorcodes-filer/sheet001.htm"] });
{ const RS = ["Start de Navimow opnieuw op.", "Blijft de fout? Neem contact op met de klantenservice."]; const BAT = ["Gebruik alleen een originele accu die niet versleten is.", "Blijft de fout? Neem contact op met de klantenservice."];
MODELS.push({ id: "segway-navimow", brand: "Segway", name: "Navimow robotmaaier (H-serie)", cat: "tuin", years: "Alle bouwjaren", unit: null, also: "Robotmaaier zonder begrenzingsdraad (RTK-GPS)",
  intro: "De Navimow toont een viercijferige foutcode in de app. Codes die met 1 beginnen gaan over het maaimes en de accu, 3 over de wielen, 4 en 5 over communicatie en GPS, 6 over de positie van de maaier.", weak: ["Gras of takjes rond maaimes en wielen."], parts: [], tasks: [],
  faults: [
    F("1001", "Maaimotor start nog op", 1, "De maaimotor is nog bezig met opstarten.", ["Wacht ongeveer 10 seconden.", "Blijft de fout? Neem contact op met de klantenservice."]),
    F("1005 / 1006", "Maaimotor geblokkeerd of draait niet op toeren", 1, "Iets blokkeert het maaimes.", ["Zet de maaier uit en haal obstakels en gras bij het mes weg.", "Niets gevonden? Neem contact op met de klantenservice."]),
    F("1007 / 1008 / 1009", "Fout in de hoogteverstelling", 1, "De motor van de maaihoogte zit vast of trekt te veel stroom.", ["Haal obstakels rond het maaimechanisme weg.", "Blijft het? Neem contact op met de klantenservice."]),
    F("1002 / 1003", "Spanning maaimotor te hoog of te laag", 2, "Mogelijk een niet-originele of defecte accu.", BAT),
    F("1020 / 1021 / 1022 / 1023", "Accuspanning of accustroom buiten bereik", 2, "Over- of onderspanning of te hoge (laad)stroom van de accu.", BAT),
    F("1024 / 1025", "Accu te warm of te koud", 1, "De accutemperatuur ligt buiten de grenzen.", ["Zet de maaier op een plek met een normale temperatuur.", ...BAT]),
    F("3001", "Wielmotor geblokkeerd", 1, "Er zit iets in of rond de wielen.", ["Haal obstakels uit de wielen.", "Blijft het? Neem contact op met de klantenservice."]),
    F("3002", "Wielmotor draait te snel", 2, "De wielmotor draait sneller dan verwacht.", RS),
    F("1010 / 2004 / 3006 / 4014", "Zelftest software mislukt", 1, "Een softwarefout bij het opstarten.", RS),
    F("4002", "Besturing te warm", 1, "De elektronica is te heet geworden.", ["Zet de maaier op een koelere plek en start opnieuw.", ...BAT]),
    F("4006 / 5001", "GPS-module of antenne", 2, "Fout in de GPS-configuratie of de antenne.", RS),
    F("4007 / 4008 / 4009 / 4010 / 4011 / 4012 / 4013", "Interne communicatiefout", 1, "Bluetooth, IoT-module, chassis, maaimotor, laadstation of sensoren communiceren niet.", RS),
    F("5003", "Laadstroom te hoog", 1, "De laadstroom is boven de beveiligingsgrens.", ["Laat de accu op normale temperatuur komen en start opnieuw.", ...BAT]),
    F("6001", "Maaier zit vast", 1, "De Navimow kon zich niet zelf bevrijden.", ["Zet de maaier op het laadstation.", "Maak van die plek een verboden zone in de app."]),
    F("6002", "Buiten de grens", 1, "De maaier staat buiten het maaigebied.", ["Zet de maaier binnen de grens of op het laadstation."]),
    F("6003", "Maaier gekanteld", 1, "De maaier is omgevallen.", ["Zet hem rechtop binnen de grens of op het laadstation.", "Maak plekken waar hij vaker kantelt een verboden zone."]),
    F("6004", "Niet teruggekeerd naar het laadstation", 1, "De maaier vond het laadstation niet.", ["Zet hem met de hand op het laadstation.", "Zorg dat het laadstation op vlakke grond staat; verplaats het zo nodig."]),
    F("6006", "Bumpersensor lang geactiveerd", 1, "De bumper staat te lang ingedrukt.", ["Controleer de bumper op vuil of klem."])],
  src: ["navimow"] }); }
Object.assign(SRC,{ vmErr: ["VanMoof Help – foutcodes S3 en X3", "https://help.vanmoof.com/hc/en-us/articles/16741360741661-Error-Codes"] });
(m => { const G = ["Werk de firmware bij naar de nieuwste versie via de app.", "Reset de fiets en start het systeem opnieuw op.", "Blijft de code? Ga naar een VanMoof-partnerwerkplaats."]; m.faults.push(
  F("0 / 1 / 2 / 15", "Accubeveiliging (0 t/m 15)", 2, "Codes 0 tot en met 15: de accu beveiligt zich tegen kortsluiting, temperatuur, spanning of te hoge laad- of ontlaadstroom.", G),
  F("16 / 17 / 18 / 19", "Accu defect of verbindingsprobleem", 2, "16: accu defect of slecht contact. 17: accu levert geen stroom. 18: accu start niet op. 19: interne communicatiefout met de accu.", G),
  F("20", "Accu plotseling uitgeschakeld", 1, "Kan kort verschijnen direct na een reset.", ["Verdwijnt meestal vanzelf.", ...G]),
  F("21", "Laadkabel niet herkend", 1, "De fiets herkent de laadkabel niet.", ["Haal de laadkabel eruit en steek hem opnieuw in."]),
  F("40", "Belknop te lang of te vaak ingedrukt", 1, "De belknop werd te lang vastgehouden of te vaak achter elkaar ingedrukt.", ["Laat de belknop los en druk hem niet herhaaldelijk in."]),
  F("41", "Boostknop te lang of te vaak ingedrukt", 1, "De turbo-boostknop werd te lang vastgehouden of te vaak ingedrukt.", ["Laat de boostknop los en druk hem niet herhaaldelijk in."]),
  F("44", "Communicatie met de e-shifter", 2, "Slechte verbinding met de automatische versnelling of een losse kabel.", ["Controleer of de kabel van de e-shifter goed vastzit.", ...G]),
  F("45 / 46 / 47 / 48", "Storing in de motor", 2, "45: communicatie motor. 46: te hoge stroom of temperatuur. 47: motordriver. 48: snelheidssignaal motor niet leesbaar. Ook 49 tot en met 53.", G),
  F("54 / 55 / 56 / 57 / 58", "Simkaart of GSM-modem", 1, "De ingebouwde simkaart of het GSM-modem (voor tracking) werkt niet.", G));
  m.src.push("vmErr"); })(MODELS.find(m => m.id === "vanmoof-s3-x3"));
Object.assign(SRC,{ irobot800: ["iRobot support – foutcodes Roomba 800-serie", "https://support.irobot.de/articles/en_US/Knowledge/7265"] });
MODELS.push({ id: "irobot-roomba-800", brand: "iRobot", name: "Roomba 800-serie", cat: "stofzuigers", years: "Alle bouwjaren", unit: null, also: "Druk op CLEAN om de melding te herhalen",
  intro: "De Roomba 800-serie spreekt een foutnummer uit ('Error 2') of toont het in de iRobot HOME-app. De meeste fouten los je op door rollers, zijwielen of sensoren schoon te maken.", weak: ["Haar rond de rubberen rollers (extractors).", "Vuil in de zijwielen."], parts: [], tasks: [{ m: 0.25, t: "Rollers en zijwielen schoonmaken" }, { m: 1, t: "Valsensoren en laadcontacten schoonvegen" }],
  faults: [
    F("1", "Roomba zit vast of een wiel hangt naar beneden", 1, "De robot is ergens vastgelopen of een wiel raakt de grond niet.", ["Zet de Roomba op een andere plek en druk op CLEAN.", "Controleer of de zijwielen vrij bewegen."]),
    F("2", "Rollers (extractors) draaien niet", 1, "Haar of vuil blokkeert de rubberen rollers.", ["Open het rollerframe, haal de rollers eruit en maak ze en de uiteinden schoon."]),
    F("5 / 7", "Zijwiel zit vast", 1, "Vuil of haar in een zijwiel.", ["Draai de zijwielen met de hand rond en maak ze schoon."]),
    F("6", "Valsensoren vuil of robot boven een rand of donkere vloer", 1, "De valsensoren zien een afgrond, vaak door vuil of een zwart tapijt.", ["Zet de Roomba op een andere plek en druk op CLEAN.", "Veeg de valsensoren aan de onderkant schoon."]),
    F("9", "Bumper ingedrukt of sensor vuil", 1, "De bumper zit klem of de sensor is vuil.", ["Tik een paar keer op de bumper om vuil los te maken.", "Controleer of de bumper vrij beweegt."]),
    F("10", "Zijwiel zit vast of bumper registreert niets", 1, "De robot denkt dat hij niet vooruitkomt.", ["Draai de zijwielen rond en maak ze schoon.", "Controleer de bumper."]),
    F("11", "Zuigfout", 2, "Probleem met de zuigmotor.", ["Controleer de AeroForce-stofbak en het filter.", "Blijft het? Neem contact op met iRobot."]),
    F("1-4", "Stofbak niet herkend", 1, "De stofbak zit niet goed.", ["Haal de stofbak eruit, plaats hem terug en druk op CLEAN.", "Maak de contacten van de stofbak schoon."]),
    F("1-8", "Kan het laadstation niet vinden", 1, "De Roomba kon niet terugkeren naar de Home Base.", ["Controleer of de Home Base stroom heeft en vrij staat.", "Maak de laadcontacten schoon."])],
  src: ["irobot800"] });
Object.assign(SRC,{ saecoInc: ["Philips/Saeco – gebruiksaanwijzing Saeco Incanto HD8911 en HD8913 (pdf)", "https://www.documents.philips.com/assets/20210429/c61938408cd74fd6849fad1900c6c0ad.pdf"] });
MODELS.push({ id: "saeco-incanto", brand: "Saeco", name: "Incanto (HD8911, HD8913)", cat: "koffiemachines", years: "Alle bouwjaren", unit: null, also: "Volautomaat van Philips/Saeco",
  intro: "De Saeco Incanto toont een foutcode van twee cijfers. De meeste los je op door de zetgroep of de koffie-uitloop schoon te maken.", weak: ["Vuile zetgroep.", "Verstopte koffie-uitloop."], parts: [["AquaClean-filter", "Vervangen als het filterpictogram knippert (0%)"]],
  tasks: [{ m: 0.25, t: "Zetgroep uitnemen en afspoelen", v: true }, { w: "Als het pictogram knippert", t: "AquaClean-filter vervangen" }],
  faults: [
    F("01", "Koffiemolen geblokkeerd", 1, "De koffie-uitloop is verstopt.", ["Maak de koffie-uitloop grondig schoon met de steel van het maatschepje of een lepel.", "Zet de machine uit en weer aan."]),
    F("03 / 04", "Probleem met de zetgroep", 1, "De zetgroep is vuil of zit niet goed.", ["Neem de zetgroep uit en maak hem grondig schoon.", "Plaats hem terug met de twee markeringen aan de zijkant tegenover elkaar."]),
    F("05", "Probleem met de watertoevoer", 1, "Lucht in het watersysteem.", ["Haal het waterreservoir er een paar keer uit en plaats het terug.", "Controleer of het reservoir schoon is.", "Met AquaClean-filter: haal het filter eruit, schud de lucht eruit en plaats het terug."]),
    F("14", "Machine oververhit", 1, "Verschillende oorzaken mogelijk.", ["Zet de machine uit, wacht 30 seconden en zet hem weer aan.", "Herhaal dit 2 of 3 keer.", "Blijft de code? Bel de Saeco-klantenservice."])],
  src: ["saecoInc"] });
Object.assign(SRC,{ philipsEP3221: ["Philips – gebruiksaanwijzing EP3221 (Series 3200, pdf)", "https://www.download.p4c.philips.com/files/e/ep3221_40/ep3221_40_dfu_nld.pdf"] });
(m => { m.faults.push(
  N("Alarmlampje brandt", 1, "Koffiedikhouder of lekbak zit niet (goed), of het servicedeurtje staat open.", ["Plaats de koffiedikhouder en de lekbak goed terug.", "Sluit het servicedeurtje."]),
  N("Alarmlampje knippert", 1, "De zetgroep zit niet goed of is geblokkeerd.", ["Neem de zetgroep uit, spoel hem schoon en smeer hem zo nodig.", "Plaats hem goed terug."]),
  N("Alarmlampje brandt en startknop knippert", 1, "Er zit lucht in het apparaat.", ["Vul het waterreservoir.", "Zet een kopje onder het stoompijpje en druk op de knipperende start/stop-knop. Let op: er komt heet water uit."]),
  N("Alle lampjes knipperen", 2, "Storing of oververhitting.", ["Haal de stekker eruit en steek hem terug.", "Controleer AquaClean-filter, waterreservoir, het vakje voor gemalen koffie en de zetgroep.", "Knipperen ze nog? Zet de machine uit, wacht 30 minuten en probeer opnieuw.", "Blijft het? Neem contact op met Philips."]),
  N("Koffiediklampje blijft branden", 1, "Je leegde de koffiedikbak terwijl de machine uit stond, of te snel.", ["Leeg de koffiedikbak terwijl de machine aan staat.", "Wacht minstens 5 seconden voordat je hem terugplaatst."]),
  N("AquaClean- of ontkalklampje knippert", 1, "Oranje knipperend AquaClean-lampje: filter op (na ongeveer 95 liter) of nog niet geactiveerd. Langzaam knipperend ontkalklampje: ontkalken nodig.", ["Vervang en activeer het AquaClean-filter.", "Of ontkalk de machine volgens de handleiding."]),
  N("Drankjeslampjes gaan een voor een aan en uit", 1, "De machine warmt op of ontlucht. Geen storing.", ["Wacht tot alle lampjes continu branden."]));
  m.src.push("philipsEP3221"); })(MODELS.find(m => m.id === "philips-volautomaat"));
Object.assign(SRC,{ philipsEP3510: ["Philips – gebruiksaanwijzing Series 3100 EP3510/EP3519 (pdf)", "https://www.documents.philips.com/assets/20210423/54e734f9e7ba4ea39af9ad1301861953.pdf"], philipsEP4050: ["Philips – gebruiksaanwijzing Series 4000 EP4050/EP4051 (pdf)", "https://www.documents.philips.com/assets/20210424/2c12563ec1e847df95afad14002d09dd.pdf"] });
(m => { m.faults.push(
  F("01", "Koffiemolen geblokkeerd", 1, "De uitgang van het koffiekanaal is verstopt. Code op het display van onder meer de Series 3100 en 4000.", ["Zet de machine uit.", "Maak de uitgang van het koffiekanaal grondig schoon met de steel van het maatschepje of een lepel.", "Zet de machine weer aan."]),
  F("03 / 04", "Probleem met de zetgroep", 1, "De zetgroep is vuil, niet goed ingevet of zit niet goed.", ["Zet de machine uit.", "Spoel de zetgroep af met schoon water, laat hem drogen en vet hem in.", "Plaats hem terug met de twee markeringen tegenover elkaar.", "Zet de machine weer aan."]),
  F("05", "Probleem met de waterdoorloop", 1, "Lucht in het systeem, of het AquaClean-filter is niet goed voorbereid.", ["Zet de machine uit en plaats het waterreservoir goed; controleer of er geen koffiebonen in liggen.", "Zet aan en tap 2 à 3 koppen heet water.", "Haal het AquaClean-filter eruit, dompel het ondersteboven in koud water tot er geen luchtbellen meer komen en plaats het terug.", "Blijft 05? Vervang het filter."]),
  F("14", "Machine oververhit", 1, "Verschillende oorzaken mogelijk.", ["Zet de machine uit en na 30 seconden weer aan."]));
  m.src.push("philipsEP3510", "philipsEP4050"); m.name = m.name + " (en Series 3100, 4000)"; })(MODELS.find(m => m.id === "philips-volautomaat"));
Object.assign(SRC,{ ithoCveS: ["Itho Daalderop – handleiding CVE-S eco (pdf via Eco-logisch)", "https://www.eco-logisch.nl/pdfupload/01-02364-007-handleiding-cve-s-eco-idnl_1882514446717.pdf"] });
(m => { m.faults.push(
  N("Ventilator maakt geluid", 1, "Vervuilde waaier, onbalans of een defect.", ["Haal de stekker eruit en maak de waaier schoon; let op de balanceerklemmetjes.", "Blijft het lawaai? Laat de installateur de motormodule vervangen."]),
  N("Ventilator draait ineens harder of zachter", 1, "Meestal geen storing: automatische regeling (vochtsensor), een afgelopen timer of de 24-uurslimiet. Soms reageert de unit op een bediening van de buren.", ["Wacht af; dit regelt zich vanzelf.", "Vermoed je de bediening van de buren? Maak de unit 15 seconden spanningsloos en meld je eigen bedieningen en sensoren opnieuw aan."]),
  N("Draadloze sensoren reageren niet", 1, "De unit staat niet op Auto, de sensor heeft geen spanning of is niet aangemeld.", ["Zet de unit op Auto.", "Controleer de spanning of batterij van de sensor.", "Meld de sensor opnieuw aan."]),
  N("Laagstand geeft hoogstand (of omgekeerd)", 2, "De ingebouwde vochtsensor is defect.", ["Laat de installateur de sensor vervangen."]));
  m.src.push("ithoCveS"); })(MODELS.find(m => m.id === "itho-cve"));
Object.assign(SRC,{ liebCNd: ["Liebherr – gebruiksaanwijzing CNd 5734 (pdf via De Schouw Witgoed)", "https://www.deschouwwitgoed.nl/media/files/g/e/Gebruiksaanwijzing_LIEBHERR_koelkast_CNd_5734-20.pdf"] });
(m => { m.faults.push(
  N("Melding 'Temperatuuralarm'", 1, "De temperatuur wijkt af door warme levensmiddelen, de deur lang open, een lange stroomstoring of een defect.", ["Bevestig de melding; je ziet dan de warmste gemeten temperatuur.", "Bevestig opnieuw; de koelkast werkt verder op de ingestelde temperatuur.", "Komt het alarm vaker terug zonder reden? Bel de klantenservice."]),
  N("Melding 'Stroomuitval'", 1, "De temperatuur is gestegen door een stroomonderbreking.", ["Bevestig de melding. Daarna kan nog een temperatuuralarm volgen."]),
  N("Melding 'Storing' met een foutcode", 2, "Een onderdeel is defect.", ["Open de deur en noteer de foutcode.", "Bevestig de melding en sluit de deur.", "Bel de klantenservice met de code."]),
  N("Melding 'Deur sluiten'", 1, "De deur staat te lang open.", ["Sluit de deur of bevestig de melding."]),
  N("Melding 'Waterreservoir' blijft staan", 1, "Te weinig water, of de vlotter zit vast.", ["Vul het waterreservoir.", "Blijft de melding? Laat wat water weg en beweeg de vlotter voorzichtig met een wattenstaafje."]),
  N("'D' op het display, koelkast koelt niet", 1, "De demostand is actief; de koeling staat uit.", ["Bevestig binnen de aftellende tijd.", "Loopt er geen tijd af? Haal de stekker eruit en steek hem terug."]),
  N("Melding 'FreshAir-filter vervangen'", 1, "Het actief-koolfilter moet elke 6 maanden vervangen worden.", ["Vervang het filter en bevestig de melding."]));
  m.src.push("liebCNd"); })(MODELS.find(m => m.id === "liebherr-koelkast"));
Object.assign(SRC,{ peblar: ["Peblar – gebruikershandleiding (NL, pdf)", "https://peblar.com/hubfs/User_manual_Peblar_NL_R04_.pdf?hsLang=en"], autelVf: ["Vattenfall – productoverzicht Autel Compact (pdf)", "https://vattenfall.nl/media/_0vattenfall/klantenservice/contract/laadpaal-thuis/handleidingen/productoverzicht-autel-compact.pdf"] });
MODELS.push({ id: "peblar-laadpaal", brand: "Peblar", name: "Peblar Home en Business", cat: "laadpalen", years: "Alle bouwjaren", unit: null,
  intro: "Een Peblar meldt een fout met een rood knipperend lampje. Tel het aantal keer knipperen: dat is de foutcode.", weak: [], parts: [], tasks: [],
  faults: [
    N("Lampje knippert 1 keer rood", 3, "Verkeerde installatie of een fout in de aarding.", ["Laad niet en neem contact op met je installateur."]),
    N("Lampje knippert 2 keer rood", 2, "Interne fout.", ["Herstart het systeem via de webinterface.", "Blijft het? Neem contact op met je installateur of laadpuntbeheerder."]),
    N("Lampje knippert 3 keer rood", 1, "Fout bij het aansluiten van de auto.", ["Haal de stekker uit de auto (en bij een paal met contactdoos ook uit de paal).", "Controleer kabel en stekker op vuil of schade.", "Kabel beschadigd? Neem contact op met je installateur."]),
    N("Lampje blauw", 1, "Pulserend: de auto laadt. Continu: laden gepauzeerd of klaar.", ["Geen storing."])],
  src: ["peblar"] });
MODELS.push({ id: "autel-compact", brand: "Autel", name: "MaxiCharger Compact", cat: "laadpalen", years: "Alle bouwjaren", unit: null, also: "Onder andere via Vattenfall",
  intro: "De Autel Compact heeft vier lampjes: voeding, internet, opladen en Bluetooth. Kijk vooral naar het oplaadlampje.", weak: [], parts: [], tasks: [],
  faults: [
    N("Oplaadlampje continu geel", 1, "Een herstelbare fout.", ["Herstart de laadpaal via de app of het klantportaal van je leverancier (bij Vattenfall: laden.vattenfall.nl)."]),
    N("Oplaadlampje continu rood", 3, "Een onherstelbare fout.", ["Neem contact op met de support via de QR-code op de laadpaal."]),
    N("Voedingslampje geel", 1, "Knipperend: er wordt een update geïnstalleerd. Continu: de update is mislukt.", ["Knipperend: wachten.", "Continu geel: herstart de laadpaal; blijft het, neem contact op met de support."]),
    N("Internetlampje uit", 1, "De laadpaal is niet met internet verbonden.", ["Controleer je wifi of netwerkkabel."])],
  src: ["autelVf"] });
Object.assign(SRC,{ juraE8: ["JURA – gebruiksaanwijzing E8 (Nederlands, pdf)", "https://nl.jura.com/-/media/global/pdf/manuals-global/home/E8-E80/download_manual_e8_e80.pdf?la=nl&h"] });
(m => { m.faults.push(
  N("Error 2 of Error 5 na kou", 1, "De machine heeft lang in de kou gestaan (bijvoorbeeld transport of een koude ruimte) en kan niet opwarmen.", ["Laat de machine op kamertemperatuur komen en zet hem daarna aan."]),
  N("Waterreservoir vullen, terwijl het vol is", 1, "Het waterreservoir is sterk verkalkt.", ["Ontkalk het waterreservoir volgens de gebruiksaanwijzing."]),
  N("Koffie loopt druppelsgewijs door", 1, "Te fijn gemalen of verkalkt.", ["Stel de molen grover in.", "Voer een ontkalking uit en controleer de ingestelde waterhardheid."]),
  N("Weinig schuim of melk spuit", 1, "De melkuitloop is vuil, of het aansluitstuk is verstopt door melkresten of kalk.", ["Reinig de melkuitloop en spoel de onderdelen.", "Schroef het zwarte aansluitstuk los, maak het schoon en draai het met de hand vast (hooguit een kwartslag met het maatschepje)."]),
  N("Melding 'Te warm'", 1, "De machine is te warm voor een onderhoudsprogramma.", ["Wacht een paar minuten, of zet eerst een kopje of heet water."]),
  N("Filtersymbool rood", 1, "Het CLARIS-filter is op.", ["Vervang het filterpatroon."]),
  N("Molen maakt veel lawaai", 2, "Er zit iets in de molen, zoals een steentje.", ["Neem contact op met de JURA-klantenservice."]));
  m.src.push("juraE8"); })(MODELS.find(m => m.id === "jura-volautomaat"));
Object.assign(SRC,{ atagP: ["ATAG – gebruikershandleiding P-serie (pdf)", "https://atag.compano.com/Data/Environments/000001/Attachment/Bijlage/ATAG%20Belgie/Gebruikershandleiding/8H518200%20GEB%20HANDLEIDING%20P-SERIE%20CBR3.0%20NL%20A5%20V1122.pdf"] });
(m => { m.src.push("atagP"); m.also = (m.also ? m.also + ", " : "") + "ook P-serie"; })(MODELS.find(m => m.id === "atag-i-zone"));
Object.assign(SRC,{ remehaTzAce: ["Remeha – installatie- en gebruikershandleiding Tzerra Ace (pdf)", "https://documentation.remeha.nl/wp-content/uploads/sites/68/2025/12/Tzerra-Ace-Installatie-en-gebruikershandleiding-NL-V11.pdf"] });
{ const I = installer; const RS = ["Reset de ketel één keer.", ...I];
MODELS.push({ id: "remeha-ace", brand: "Remeha", name: "Tzerra Ace en Calenta Ace (A-, H- en E-codes)", cat: "cv-ketels", years: "Alle bouwjaren", unit: null, also: "Codes als A.02.06, H.01.09 en E.04.10",
  intro: "Remeha Ace-ketels tonen drie soorten codes. A = waarschuwing (de ketel blijft werken), H = blokkering (de ketel start vanzelf weer als de oorzaak weg is), E = vergrendeling (resetten nodig). Zelf mag je alleen bijvullen, de gaskraan controleren en één keer resetten.", weak: ["Te lage waterdruk.", "Bij vorst: bevroren condensafvoer."], parts: [], tasks: CV_TASKS,
  faults: [
    F("A.02.06", "Waterdruk te laag", 1, "De druk in de cv-installatie is onder het minimum.", ["Vul de installatie bij tot 1,5 à 2 bar.", "Moet je vaak bijvullen? Laat de installateur naar een lek zoeken."]),
    F("A.02.33 / E.02.32 / E.02.39", "Automatisch bijvullen lukt niet", 1, "Bijvullen duurt te lang of de druk stijgt niet: lage leidingdruk, een lek, een dichte kraan of een defecte vulklep.", ["Controleer of de hoofdwaterkraan open staat.", "Zoek naar lekkage bij radiatoren en leidingen.", "Blijft het? Bel je installateur."]),
    F("A.02.34", "Bijvullen te snel na de vorige keer", 1, "Waarschijnlijk een lek, of de vorige vulbeurt werd onderbroken.", ["Zoek naar lekkage.", "Blijft het? Bel je installateur."]),
    F("H.02.31", "Geblokkeerd na stroomstoring: druk te laag", 1, "Na een stroomstoring is de druk onder de vuldruk.", ["Vul de installatie bij met de automatische vulinrichting of de vulslang."]),
    F("H.01.09", "Gasdruk te laag", 2, "Gaskraan niet helemaal open, lage gasdruk of een vuil gasfilter.", ["Controleer of de gaskraan helemaal open staat.", "Werken andere gastoestellen? Zo niet, bel je netbeheerder.", ...I]),
    F("H.01.05 / H.01.08 / H.01.21", "Doorstroming te laag of temperatuur stijgt te snel", 1, "Te weinig doorstroming, te lage druk, lucht in de installatie of vervuiling.", ["Controleer de waterdruk en vul bij.", "Zet radiatorkranen open en ontlucht de radiatoren.", "Blijft het? Bel je installateur."]),
    F("H.01.14", "Aanvoertemperatuur te hoog", 1, "Te weinig doorstroming of een sensorprobleem. De ketel start weer als het is opgelost.", ["Controleer de waterdruk en zet radiatorkranen open.", "Blijft het? Bel je installateur."]),
    F("H.03.02", "Vlamsignaal te zwak", 2, "De vlam valt weg: gastoevoer, luchttoevoer of rookgasafvoer.", ["Controleer of de gaskraan open staat.", "Controleer of de luchttoevoer en afvoer buiten vrij zijn.", ...I]),
    F("H.02.09 / H.02.10 / H.02.12", "Geblokkeerd door een extern contact", 1, "Een extern apparaat of instelling blokkeert de ketel (soms vorstbeveiliging).", ["Controleer of de thermostaat of een ander aangesloten apparaat de ketel blokkeert.", "Blijft het? Bel je installateur."]),
    F("E.01.04", "Vlam vijf keer onverwacht uitgevallen", 2, "Gastoevoer, gasdruk, luchttoevoer of rookgasafvoer.", ["Controleer of de gaskraan open staat.", ...RS]),
    F("E.04.10", "Vergrendeld na vijf mislukte starts", 2, "Probleem met ontsteking, vlam of ionisatie, of de gastoevoer.", ["Controleer of de gaskraan open staat.", ...RS]),
    F("E.04.15", "Rookgasafvoer geblokkeerd", 3, "De afvoer van de ketel is verstopt.", ["Ruik je gas of rook? Zet ramen open, draai de gaskraan dicht en bel 0800-9009.", ...I]),
    F("E.04.03", "Aanvoertemperatuur boven de veiligheidsgrens", 2, "Te weinig doorstroming, te lage druk of een vervuilde warmtewisselaar.", ["Controleer de waterdruk.", ...RS]),
    F("E.00.07 / E.01.12", "Temperatuurverschil aanvoer en retour klopt niet", 2, "Lucht, te lage druk, pomp of doorstroming, of verwisselde aansluitingen.", ["Controleer de waterdruk en ontlucht.", ...I]),
    F("E.04.11 / E.04.12 / E.04.17", "Storing in gasklep of vlamdetectie", 3, "Lekkende of defecte gasklep, of een vals vlamsignaal.", ["Niet steeds opnieuw resetten.", ...I]),
    F("E.01.11 / E.04.13", "Ventilatortoerental klopt niet", 2, "Losse aansluiting, defecte ventilator of te veel schoorsteentrek.", RS),
    F("E.00.04 / E.00.05 / E.04.01 / E.04.02", "Temperatuursensor defect", 2, "Retour- of aanvoersensor is los, kortgesloten of defect.", I),
    F("E.04.08", "Luchtdrukbeveiliging: afvoer of sifon", 2, "Te hoge druk in de afvoer: sifon leeg of verstopt, terugslagklep vast of een verstopping.", RS)],
  src: ["remehaTzAce"] }); }
Object.assign(SRC,{ remehaTz: ["Remeha – gebruikersinstructies Tzerra (pdf)", "https://documentation.remeha.nl/wp-content/uploads/sites/68/2025/12/Gebruikersinstructies-Tzerra-V1.pdf"] });
MODELS.push({ id: "remeha-tzerra", brand: "Remeha", name: "Tzerra (zonder display)", cat: "cv-ketels", years: "Alle bouwjaren", unit: null, also: "Voor de Tzerra Ace: zie Remeha Ace",
  intro: "De oudere Tzerra heeft geen display maar een lampje dat van kleur en ritme verandert. Bij een storing knippert het rode lampje een aantal keer: dat is de storingscode (1 tot en met 6).", weak: [], parts: [], tasks: CV_TASKS,
  faults: [
    N("Lampje knippert oranje (servicecode A, B of C)", 1, "Onderhoud is binnen 2 maanden nodig.", ["Noteer de code en bel binnen een paar dagen je installateur."]),
    N("Lampje knippert groen", 1, "Blokkering: de ketel probeert een probleem zelf op te lossen.", ["Even afwachten. Lukt het de ketel niet, dan volgt een storing."]),
    N("Lampje knippert rood", 2, "Storing: de ketel werkt niet.", ["Controleer of de gaskraan open staat en de ketel stroom heeft.", "Controleer de waterdruk en vul zo nodig bij."]),
    N("Lampje brandt continu rood", 2, "Vergrendeling.", ["Haal de stekker 30 seconden uit het stopcontact en steek hem terug.", "Houd de RESET-toets minstens 5 seconden ingedrukt.", "Blijft het rood? Tel hoe vaak het lampje knippert (1 tot en met 6) en bel direct je installateur."]),
    N("Lampje groen met korte onderbreking", 1, "1 keer onderbroken: de ketel verwarmt. 2 keer: warm tapwater. Geen storing.", ["Niets aan doen."])],
  src: ["remehaTz"] });
Object.assign(SRC,{ nefitTAP: ["Nefit – gebruikersinstructie TrendLine AquaPower Plus (pdf)", "https://de-groot.files.svdcdn.com/production/immens/Handleidingen/Immens-Nefit-Trendline-AquaPower-Plus.pdf"], nefitTB63: ["Nefit Bosch – Technisch Bulletin 63 (H28)", "https://www.nefit-bosch.nl/media/country_pool/professioneel/installateurs/6721875506.pdf"], nefitTopAP: ["Nefit – gebruikersinstructies TopLine AquaPower (pdf)", "https://portal.insmart.nl/downloads/nefit_topline_aquapower_Gebruikersinstructies%2BTopline%2BAquapower.pdf"] });
(m => { const I = installer; m.faults.push(
  F("H28", "Warmtewisselaar vervuild (onderhoudsmelding)", 1, "De ketel blijft gewoon werken. Bij oudere software kan de melding onterecht verschijnen; ook een te grote warmwaterafname kan hem geven.", ["Laat de installateur de warmtewisselaar controleren en reinigen.", "De installateur kan ook de software (HCM) bijwerken als die verouderd is."]),
  F("2L266 / 2P212 / 2P341 / 2U213", "Storing in waterstroming of waterdruk", 2, "De doorstroming of druk in de cv-installatie klopt niet (2F-, 2L-, 2P-, 2U- en 2Y-codes).", ["Controleer of afsluiters en voldoende radiatorkranen open staan.", "Controleer de waterdruk en ontlucht de installatie.", "Reset; komt de code terug, bel je installateur."]),
  F("4F219 / 4L220", "Storing in temperatuurbeveiliging", 2, "Code uit de groep 4F/4L; de gebruikersinstructie geeft geen nadere omschrijving.", I),
  F("H11 / H12", "Temperatuur warm water niet gemeten", 1, "AquaPower: geen uitstroom- of boilertemperatuur gemeten. De ketel berekent die zelf en blijft werken.", ["Neem contact op met je installateur."]),
  F("P--", "Waterdruk hoger dan 4 bar", 1, "Te veel bijgevuld of het expansievat werkt niet goed.", ["Laat via een radiator water af tot de druk rond 1,5 bar staat.", "Bij de hoogste cv-temperatuur hoort de druk niet boven 3 bar te komen; loopt hij steeds op, bel de installateur."]));
  m.name = "TrendLine II en (Top/Trend)Line AquaPower"; m.intro = m.intro + " Reset: houd de resettoets ongeveer 5 seconden ingedrukt tot rE verschijnt.";
  m.src.push("nefitTAP", "nefitTB63", "nefitTopAP"); })(MODELS.find(m => m.id === "nefit-trendline"));
Object.assign(SRC,{ boschManual: ["Bosch eBike Systems – handleiding boordcomputer, foutcodetabel (pdf, 2020)", "https://terratrike.com/wp-content/uploads/2025/01/Bosch-Error-Codes.pdf"] });
(m => { const RD = ["Zet het systeem uit en weer aan.", "Blijft de code? Ga naar een Bosch eBike-dealer."]; const CON = ["Laat de stekkerverbindingen controleren bij een Bosch eBike-dealer."]; m.faults.push(
  F("410 / 418", "Knop geblokkeerd", 1, "Een knop op de boordcomputer (410) of bedieningseenheid (418) zit vast, vaak door vuil.", ["Controleer of een knop klem zit en maak hem schoon."]),
  F("414 / 422 / 423 / 424", "Verbindingsprobleem", 2, "414: bedieningseenheid, 422: aandrijfeenheid, 423: accu, 424: communicatie tussen onderdelen.", CON),
  F("419 / 426 / 431 / 450 / 580", "Software- of configuratiefout", 1, "Configuratie, time-out of softwareversie klopt niet.", RD),
  F("430", "Interne accu van de boordcomputer leeg", 1, "Het ingebouwde accuutje van de boordcomputer is leeg.", ["Laad de boordcomputer op in de houder of via USB."]),
  F("440 / 510 / 511", "Interne fout in de aandrijfeenheid of sensor", 2, "Interne fout in de motor of een sensor.", RD),
  F("460", "Fout in de USB-aansluiting", 1, "Probleem met de USB-poort.", ["Haal de USB-kabel eruit.", "Blijft de code? Ga naar de dealer."]),
  F("502", "Fout in de verlichting", 1, "De lamp of de bedrading van de verlichting.", ["Controleer de lamp en de bedrading.", ...RD]),
  F("504", "Snelheidssignaal verstoord", 1, "De spaakmagneet staat verkeerd, of er is met de snelheid geknoeid. De ondersteuning wordt beperkt.", ["Controleer de positie van de spaakmagneet en stel hem bij.", "Laat de dealer kijken als het blijft."]),
  F("540", "Temperatuur motor buiten bereik", 1, "De aandrijfeenheid is te warm of te koud.", ["Zet het systeem uit en laat de motor op temperatuur komen.", ...RD]),
  F("550", "Ongeoorloofde belasting", 1, "Er is een niet-toegestaan apparaat aangesloten.", ["Haal het aangesloten apparaat weg.", ...RD]),
  F("591 / 655", "Accu niet herkend of meerdere accufouten", 1, "Authenticatiefout of meerdere fouten in de accu.", ["Zet het systeem uit, haal de accu eruit en plaats hem opnieuw.", ...RD]),
  F("592", "Onderdeel niet compatibel", 1, "Bijvoorbeeld een display dat niet bij het systeem past.", ["Gebruik een compatibel display.", "Vraag de dealer om advies."]),
  F("595 / 596", "Communicatiefout", 1, "Probleem met de bedrading naar de motor.", ["Controleer de bedrading naar de aandrijfeenheid.", ...RD]),
  F("602 / 603", "Interne fout in de accu", 2, "De accu meldt een interne fout.", RD),
  F("605", "Accutemperatuur buiten bereik", 1, "De accu is te warm of te koud.", ["Zet het systeem uit en laat de accu op temperatuur komen.", ...RD]),
  F("620", "Fout in de lader", 2, "De lader is defect.", ["Vervang de lader en neem contact op met de dealer."]),
  F("656", "Softwareversie accu", 1, "De software van de accu moet bijgewerkt worden.", ["Laat de dealer een software-update uitvoeren."]),
  F("7xx", "Fout in een onderdeel van een andere fabrikant", 1, "Codes die met 7 beginnen gaan over onderdelen van derden, zoals een automatische naaf.", ["Volg de handleiding van de fabrikant van dat onderdeel."]));
  m.src.push("boschManual"); })(MODELS.find(m => m.id === "bosch-ebike"));
Object.assign(SRC,{ shimanoE7000: ["Shimano – gebruikershandleiding STEPS-display E7000 (pdf)", "https://www.e-bikeshop.co.uk/cdn/shop/files/Shimano-Steps-E7000-Display-User-Manual.pdf"] });
(m => { const BAT = ["Laat de dealer een originele Shimano-accu aansluiten en het voedingssnoer controleren."]; m.faults.push(
  F("W104", "Lekstroom gemeten, stroom uitgeschakeld", 2, "Een onderdeel lekt stroom; er is geen ondersteuning.", ["Laat de dealer de onderdelen een voor een loskoppelen om het defecte onderdeel te vinden."]),
  F("W105", "Stroom onverwacht onderbroken", 1, "De stroom viel plotseling weg.", ["Zet het systeem uit en weer aan.", "Gebeurt het vaak? Laat de dealer controleren of de accuhouder rammelt of een snoer los zit."]),
  F("W032 / W302 / E030", "Versnellingsunit past niet bij de configuratie", 1, "De aangesloten schakelunit komt niet overeen met de instellingen.", ["Laat de dealer de juiste schakelunit plaatsen of de configuratie controleren in E-TUBE PROJECT."]),
  F("E021 / E022 / E023 / E024 / E025", "Accu niet ondersteund of accufout", 2, "E021/E022: accu niet ondersteund of voldoet niet. E023: elektrische fout. E024: overstroombeveiliging. E025: accu herkent de motor niet.", BAT),
  F("E035", "Configuratiefout", 1, "De systeemconfiguratie klopt niet.", ["Laat de configuratie controleren in E-TUBE PROJECT."]),
  F("E043", "Firmware boordcomputer beschadigd", 2, "Een deel van de firmware van het display is mogelijk beschadigd.", ["Neem contact op met de dealer; de firmware moet hersteld worden."]));
  m.src.push("shimanoE7000"); })(MODELS.find(m => m.id === "shimano-steps"));
Object.assign(SRC,{ worxTs: ["Worx – probleemoplossing Landroid M (Nederlands, pdf)", "https://wiki.worx.com/hubfs/User%20Manual/Landroid%20M%202016-2018/Troubleshooting/troubleshooting-landroid-m-wg754e-wg755e-wg756e-wg790e.1-wg791e.1-wg796e.1-nl.pdf?hsLang=nl"] });
(m => { m.faults.push(
  N("Groen lampje laadstation knippert", 1, "De grensdraad is niet aangesloten of gebroken.", ["Controleer de aansluiting op het laadstation.", "Zoek naar een breuk in de grensdraad."]),
  N("Melding 'buiten werkgebied' terwijl de maaier binnen staat", 1, "De uiteinden van de grensdraad zitten verkeerd om.", ["Wissel de twee draaduiteinden op het laadstation om."]),
  N("Laden duurt langer dan 2 uur of stopt te vroeg", 1, "Vuile laadstrips of het laadstation is te warm ('Over temperatuur').", ["Maak de contactstrips van laadstation en maaier schoon met een doek.", "Zet het laadstation in de schaduw of wacht tot het is afgekoeld."]),
  N("Gras ongelijk gemaaid", 1, "Te weinig maaiuren, botte messen, te lage maaihoogte of gras rond de messchijf.", ["Voeg maaiuren toe of maak het gebied kleiner.", "Vervang alle messen en schroeven tegelijk.", "Zet de maaihoogte hoger en verlaag geleidelijk.", "Maak de messchijf vrij."]),
  N("Maaier trilt of schudt", 1, "Beschadigde messen of gras en voorwerpen bij de messchijf; soms een versleten accu.", ["Controleer messchijf, messen en schroeven en vervang ze zo nodig.", "Haal gras en voorwerpen weg.", "Helpt het niet? Vervang de accu."]),
  N("Maaier rijdt buiten de draad of keert te vroeg om", 1, "Een andere begrenzingsdraad te dichtbij, scherpe hoeken, of signaallekkage bij natte of beschadigde verbindingen.", ["Houd minstens 0,5 meter afstand tot andere begrenzingsdraden.", "Rond scherpe hoeken af.", "Maak verbindingen waterdicht en herstel beschadigde isolatie met isolatietape.", "Leg de draad niet op hellingen steiler dan 25% (15°)."]),
  N("Maaier werkt op het verkeerde moment", 1, "De klok of de maaitijden kloppen niet.", ["Stel de klok goed in en controleer de start- en stoptijden."]));
  m.src.push("worxTs"); })(MODELS.find(m => m.id === "worx-landroid"));
Object.assign(SRC,{ boschCS3400: ["Bosch Home Comfort België – veelgestelde vragen Compress 3400i AWS", "https://www.bosch-homecomfort.com/be/nl/residentieel/info-advies/veelgestelde-vragen-compress-3400i-aws/"] });
MODELS.push({ id: "bosch-compress-3400i", brand: "Bosch", name: "Compress 3400i AWS warmtepomp", cat: "warmtepompen", years: "Alle bouwjaren", unit: null, also: "Buitenunits 4S, 6S, 8S en 10S",
  intro: "Bij buitenunits gemaakt tussen januari 2020 en november 2024 (FD-code 037 tot en met 478, positie 5 tot 7 van het serienummer) geven softwarefouten soms onterechte meldingen. Bosch lost dat op met een software-update of aanpassing; gewijzigde units hebben een groene stip op de sticker of een V op het typeplaatje.", weak: ["Software van de buitenunit."], parts: [], tasks: [{ m: 12, t: "Jaarlijks onderhoud door de installateur" }],
  faults: [
    F("5822", "Melding koudemiddeldruk (softwarefout)", 2, "Een softwarefout geeft een melding over de koudemiddeldruk.", ["Meld het bij je installateur; de buitenunit krijgt een software-update."]),
    F("5827 / 5828 / 5600 / 5601", "Communicatiefout (softwarefout)", 2, "Een softwarefout in de buitenunit.", ["Meld het bij je installateur; de buitenunit krijgt een software-update."]),
    F("5265 / 5266", "Probleem met de CAN-bus", 2, "Softwarefout of een probleem met de CAN-buskabel of -aansluiting.", ["Laat de installateur aansluiting, kabeltype en aarding controleren.", "Blijft het? Dan volgt een software-update."]),
    F("5445", "Ventilator defect", 3, "De ventilator van de buitenunit is kapot.", ["Laat de installateur of Bosch een nieuwe ventilator plaatsen."]),
    N("Ontdooisymbool blijft branden", 1, "Softwarefout: het symbool blijft op de binnenunit staan, ook als de buitenunit niet ontdooit.", ["Meld het bij je installateur; een software-update lost het op."])],
  src: ["boschCS3400"] });
Object.assign(SRC,{ daikinHyb: ["Daikin – gebruiksaanwijzing Altherma hybride EJHA (pdf)", "https://www.daikin.nl/content/dam/document-library/operation-manuals/heat/hybrid-heat-pump/ejha-av3/EJHA-AV3_Operation%20manual_4PNL531174-1C_Dutch.pdf"] });
(m => { m.faults.push(
  N("Te koud of te warm in huis", 1, "De gewenste temperatuur of de stooklijn staat verkeerd.", ["Pas de gewenste kamertemperatuur aan.", "Wordt het niet warm genoeg? Verhoog de gewenste aanvoerwatertemperatuur.", "Komt het elke dag terug? Pas het programma of de weersafhankelijke stooklijn aan."]),
  N("Water uit de kraan te koud", 1, "De boiler is leeg na veel warm water, of de tanktemperatuur staat te laag.", ["Zet de boosterstand aan (kost extra energie), of verhoog de gewenste tanktemperatuur.", "Zonder tank: zet het instelpunt niet lager dan 40 °C."]),
  N("Warmtepomp in storing (hybride)", 2, "De warmtepomp is gestopt.", ["Druk op 'Informatie over storingen' voor de beschrijving.", "Kies dat de gasketel de volledige belasting overneemt; let op, het gasverbruik stijgt dan flink.", "Neem contact op met je installateur."]),
  N("Gorgelend geluid", 1, "Lucht in het systeem.", ["Kijk eerst of er een storingspictogram op het scherm staat.", "Geen storing? Laat de installatie ontluchten."]));
  m.src.push("daikinHyb"); })(MODELS.find(m => m.id === "daikin-altherma"));
Object.assign(SRC,{ daikinFTXM: ["Daikin – gebruiksaanwijzing FTXM-N/CTXM-N (pdf)", "https://www.daikin.eu/content/dam/document-library/operation-manuals/ac/split/FTXM-N,CTXM-N_3PNL485919-8S_Operation%20manual_Dutch.pdf"] });
(m => { m.faults.push(
  N("Binnenunit blaast geen warme lucht, ijs op de buitenunit", 1, "De airco ontdooit de buitenunit automatisch. Geen storing.", ["Even wachten; daarna blaast hij weer warm."]),
  N("Display van de afstandsbediening knippert", 1, "De batterijen zijn bijna leeg.", ["Vervang de batterijen en stel de timers opnieuw in."]),
  N("Start traag na lange stilstand", 1, "De unit heeft na lang uitstaan tijd nodig.", ["Zet de hoofdschakelaar 6 uur voor gebruik weer aan."]),
  N("Streamer zoemt of stopt even", 1, "Normaal: de Streamer-luchtreiniger kan zoemen en stopt bij weinig luchtstroom om ozongeur te voorkomen.", ["Geen actie nodig."]));
  m.src.push("daikinFTXM"); })(MODELS.find(m => m.id === "daikin-split-airco"));
Object.assign(SRC,{ samsungWasBE: ["Samsung België – foutcodes wasmachine", "https://www.samsung.com/be/support/home-appliances/wat-betekent-de-foutcode-op-het-display-van-mijn-wasmachine/"] });
(m => { const R1 = ["Zet de machine uit met de aan/uit-knop, wacht 1 minuut, zet hem weer aan en start een nieuw programma.", "Komt de code terug? Neem contact op met Samsung Service."]; const SV = ["Neem contact op met Samsung Service."]; m.faults.push(
  F("3CP", "Elektronische besturing", 1, "Storing in de besturing.", ["Haal de stekker 1 minuut uit het stopcontact, steek hem terug en start het programma opnieuw."]),
  F("4C2 / 4E1 / 4E2 / 4Ed", "Watertemperatuur te hoog bij toevoer", 1, "De toevoerslang zit waarschijnlijk op de warmwaterkraan.", ["Sluit de toevoerslang aan op de koudwaterkraan (meestal de blauwe)."]),
  F("8C", "MEMS-sensor", 1, "Storing in de bewegingssensor.", ["Zet de machine uit en start het programma opnieuw."]),
  F("8E", "Elektrische storing", 1, "Storing in de elektriciteit.", R1),
  F("9E1 / 9E2 / 9H1 / Plo", "Stroomprobleem", 1, "De netspanning klopt niet.", ["Zet de machine uit en wacht 1 minuut.", "Controleer het stopcontact.", "Gebruik geen verlengsnoer of stekkerdoos."]),
  F("11E / E9 / LC / LE", "Waterpeil te laag", 1, "Er loopt water weg via de afvoer, of er is een lek.", ["Zorg dat de afvoerslang niet lager hangt dan de onderkant van de machine en niet op de vloer ligt.", "Controleer op lekkage.", "Haal de stroom 1 minuut weg en probeer opnieuw."]),
  F("12E / 14E / 18E / bE1 / bE2 / bE3", "Knop zit vast", 1, "Een knop is vastgeplakt of blijft ingedrukt.", ["Haal de stekker eruit en maak de knoppen schoon met een licht vochtige doek.", "Controleer of een knop vastzit."]),
  F("13E / AC / AE / AC6", "Communicatiefout", 1, "De onderdelen communiceren niet goed.", ["Wacht een paar minuten.", "Lukt het niet? Zet de machine uit en start het programma opnieuw."]),
  F("DDC / ddC", "Bijvuldeur open zonder start/pauze", 1, "Het kleine bijvuldeurtje (AddWash) werd geopend.", ["Druk het bijvuldeurtje goed dicht en druk op Start/Pauze."]),
  F("dE2", "Aan/uit-knop", 1, "Probleem met de aan/uit-schakelaar.", ["Haal de stekker eruit, wacht 5 minuten en probeer opnieuw."]),
  F("EA / EB", "Motor", 2, "Storing in de motor.", R1),
  F("tE / tC1 / EC", "Temperatuursensor", 1, "Storing in de temperatuursensor (ook tE1 tot tE3 en tC2, tC3).", R1),
  F("FE", "Ventilator", 2, "De ventilator (was-droogcombinatie) werkt niet.", SV),
  F("HE2 / HE3", "Verwarming droogdeel of stoomfunctie", 2, "HE2: droogverwarming uitgeschakeld door te hoge temperatuur. HE3: stoomfunctie.", SV),
  F("t1 / t2 / tSt", "Testmodus", 1, "De machine staat in de testmodus.", R1));
  m.src.push("samsungWasBE"); })(MODELS.find(m => m.id === "samsung-wasmachine"));
Object.assign(SRC,{ samsungDroogBE: ["Samsung België – informatiecodes droger", "https://www.samsung.com/be/support/home-appliances/controleer-de-informatiecodes-van-de-droger"] });
(m => { const SC = "Blijft het? Neem contact op met een Samsung-servicecenter."; m.faults.push(
  F("NC / NC1 / NC2", "Pluizenfilter of deksel warmtewisselaar", 1, "NC en NC1: probleem met het pluizenfilter. NC2: het deksel van de warmtewisselaar zit niet goed.", ["Controleer en maak het pluizenfilter schoon.", "Controleer of het deksel van de warmtewisselaar goed vastzit.", SC]),
  F("5C", "Afvoer verstopt, bevroren of reservoir vol", 1, "Het condenswater kan niet weg.", ["Leeg het waterreservoir.", "Controleer of de afvoerslang niet geknikt of verstopt is.", "Bevroren slang: ontdooi hem ongeveer 10 minuten met een handdoek en warm water.", SC]),
  F("tC / tC5 / tC7", "Temperatuursensor", 1, "tC/tE: luchttemperatuur. tC5/tE5: compressorsensor. tC7: Verd-In-sensor.", ["Maak het pluizenfilter en de warmtewisselaar schoon en controleer of de luchtafvoer vrij is.", "Haal de stroom 2 à 3 minuten weg en zet hem weer aan.", SC]),
  F("FIL / tEr", "Warmtewisselaar reinigen", 1, "De zoemer gaat af; de warmtewisselaar is vuil.", ["Maak de warmtewisselaar schoon volgens de handleiding."]),
  F("AC / AE / AC6", "Communicatiefout elektronica", 2, "De printplaten communiceren niet goed.", ["Start de cyclus opnieuw.", SC]),
  F("FC / FE", "Netfrequentie ongeldig", 1, "De stroomvoorziening wijkt af.", ["Start de cyclus opnieuw.", SC]),
  F("9C1 / 9E1 / 9C2 / 9E2", "Stroomaansluiting controleren", 1, "De elektronica meldt een probleem met de voeding.", ["Controleer of de stekker goed in het stopcontact zit.", SC]),
  F("HCL", "Koelmiddel lekt", 3, "Lek in het koelcircuit van de warmtepompdroger.", ["Bel een monteur."]));
  m.src.push("samsungDroogBE"); })(MODELS.find(m => m.id === "samsung-droger"));
Object.assign(SRC,{ samsungOvenUK: ["Samsung UK – informatiecodes oven (Engels)", "https://www.samsung.com/uk/support/home-appliances/check-out-the-information-codes-on-my-oven/"], samsungKoelBE: ["Samsung België – mijn koelkast werkt niet", "https://www.samsung.com/be/support/home-appliances/mijn-koelkast-werkt-niet"] });
(m => { const RS = ["Zet de oven uit en weer aan.", "Blijft het? Haal de stroom minstens 30 seconden weg (groep uit) en zet hem weer aan."]; m.faults.push(
  F("S-01", "Veiligheidsuitschakeling (geen storing)", 1, "De oven stond te lang aan op dezelfde temperatuur: 16 uur onder 105 °C, 8 uur tot 240 °C, 4 uur daarboven.", ["Zet de oven uit, haal het eten eruit en kook daarna gewoon verder."]),
  F("dC / dE", "Scheidingsplaat (Dual Cook)", 1, "dC: de scheidingsplaat is eruit gehaald tijdens Dual Cook. dE: de plaat zit erin bij gewoon koken.", ["Gebruik de scheidingsplaat alleen bij Dual Cook en haal hem eruit bij gewoon koken.", ...RS]),
  F("C-d1", "Deurvergrendeling werkt niet", 2, "Storing in het deurslot (bijvoorbeeld bij pyrolyse).", RS),
  F("C-22", "Sensorstoring", 2, "Storing in een sensor.", RS),
  F("C-F1", "Geheugenfout (EEPROM)", 2, "Fout bij het lezen of schrijven van het geheugen.", RS),
  F("Pr E", "Voorverwarmen (geen storing)", 1, "De oven warmt voor.", ["Houd de deur dicht; de melding verdwijnt als de temperatuur bereikt is."]));
  m.src.push("samsungOvenUK"); })(MODELS.find(m => m.id === "samsung-oven"));
(m => { m.faults.push(
  N("Koelkast koelt niet (vriezer wel)", 1, "De vakantiestand staat aan, of de warmte kan niet weg.", ["Controleer of de vakantiestand aan staat en zet hem uit.", "Laat 10 cm ruimte aan achter- en zijkanten en 5 cm erboven.", "Stofzuig de achterkant een à twee keer per jaar."]),
  N("IJs op de achterwand of water onder de groentelade", 1, "De No-Frost-openingen zijn geblokkeerd of de deur sluit niet goed.", ["Zet geen producten voor de ventilatieopeningen.", "Deurtest: open de deur 30 à 40 cm en laat los. Valt hij niet vanzelf dicht? Stel de pootjes bij en zet de koelkast waterpas."]));
  m.src.push("samsungKoelBE"); })(MODELS.find(m => m.id === "samsung-koelkast"));
Object.assign(SRC,{ samsungKoelCA: ["Samsung Canada – foutcodes koelkast (Engels)", "https://www.samsung.com/ca/support/home-appliances/samsung-refrigerator-error-codes"] });
(m => { const SV = "Komt de code terug? Vraag een reparatie aan bij Samsung."; m.faults.push(
  F("OF OF / OFF", "Koeling uit: demostand", 1, "De koelkast staat in de winkel- of demostand en koelt niet.", ["Houd de bovenste twee knoppen links op het paneel 5 tot 8 seconden ingedrukt tot je een piep hoort.", "Herhaal als de melding terugkomt."]),
  F("21E", "Ventilator vriezer", 2, "De ventilator in de vriezer werkt niet, vaak door ijs.", ["Ontdooi de vriezer en controleer of de deuren goed sluiten.", SV]),
  F("22E / 22C", "Ventilator koelkast", 2, "De ventilator in het koelgedeelte werkt niet.", ["Haal de stekker een paar uur eruit met de deuren open zodat alles ontdooit, en start opnieuw.", SV]),
  F("85C", "Lage spanning (waarschuwing)", 1, "Meestal onschuldig na een korte stroomdip.", ["Houd OK 3 seconden ingedrukt om de melding te wissen."]),
  F("83E / 85E / 86E / 88 88", "Stroom- of spanningsfout", 1, "Probleem met de voeding.", ["Haal de stekker eruit of zet de groep 1 minuut uit en weer aan.", SV]),
  F("76C", "Water in het Autofill-vak", 1, "Er staat water in het automatische vulvak.", ["Droog het vak.", "Vraag alleen service als het blijft terugkomen."]),
  F("PC ER / PC CH", "Communicatiefout", 1, "De verbinding tussen paneel en besturing werkt niet.", ["Laat de stekkerverbinding boven de deur controleren en herstart de koelkast.", SV]),
  F("AP", "Wifi-instelmodus (geen storing)", 1, "De koelkast staat in de verbindingsmodus voor SmartThings.", ["Verdwijnt vanzelf als het instellen klaar is."]),
  N("Alle symbolen knipperen", 1, "Zelftest na het aansluiten of na een stroomstoring.", ["Even wachten."]),
  N("Ice Off knippert", 1, "De ijsbak zit niet goed.", ["Plaats de ijsbak opnieuw goed terug."]));
  m.src.push("samsungKoelCA"); m.intro = m.intro + " De foutcodes hieronder gelden vooral voor Amerikaanse koelkasten (side-by-side en Family Hub); haal de stekker er niet uit tenzij de stap dat zegt."; })(MODELS.find(m => m.id === "samsung-koelkast"));
Object.assign(SRC,{ lgWasUS: ["LG – foutcodes voorlader wasmachine (Help Library, Engels)", "https://www.lg.com/us/support/help-library/lg-front-load-washer-error-code-list-CT00000305-20155069413456"], lgVaatUS: ["LG – foutcodes vaatwasser (Help Library, Engels)", "https://www.lg.com/us/support/help-library/lg-dishwasher-guide-to-error-codes-CT10000009-20154464775480"] });
(m => { const RS = ["Haal de stekker 10 seconden eruit, steek hem terug en start opnieuw.", "Blijft het? Draai de kraan dicht en vraag een reparatie aan."]; m.faults.push(
  F("tCL", "Herinnering trommelreiniging (geen storing)", 1, "Tijd om de trommel te reinigen.", ["Maak de trommel leeg, doe er trommelreiniger in en draai Tub Clean. Maandelijks doen voorkomt de melding."]),
  F("CE", "Overstroom in de motor", 2, "De motor trekt te veel stroom.", RS),
  F("FE", "Te veel water", 2, "Er komt extra water binnen, bijvoorbeeld via het wasmiddelbakje.", ["Haal de stekker 60 seconden eruit en start opnieuw.", "Pompt hij niet af? Zet hem uit en vraag service aan."]),
  F("PF", "Stroomstoring tijdens het programma", 1, "De stroom viel weg tijdens het wassen.", ["Stekker eruit, houd Start/Pauze 5 seconden ingedrukt, sluit weer aan en start opnieuw."]),
  F("tE", "Verwarmingsfout (temperatuursensor)", 2, "Vaak een defecte thermistor.", RS),
  F("HE / dHE / SE", "Tijdelijke fout verwarming, droogfunctie of sensor", 1, "Een tijdelijke storing.", RS),
  F("vS / uS", "Trillingssensor", 1, "Probleem met de trillingssensor.", ["Druk op Start/Stop om verder te gaan.", "Komt het terug? Zet de machine uit en weer aan."]),
  F("FF", "Bevroren (onder 1 °C)", 1, "De bediening blijft vergrendeld tot de machine boven 4 °C is.", ["Giet warm water (50–60 °C) in de trommel, wacht 1 à 2 uur en laat het water weglopen via het noodafvoerslangetje.", "Ontdooi de toevoerslang in water onder 50 °C. Gebruik nooit kokend water."]),
  F("Ed1 / Ed2 / Ed3 / Ed4", "Doseerpomp (ezDispense)", 1, "De automatische dosering van wasmiddel of wasverzachter werkt niet.", ["Controleer het type wasmiddel en verwijder resten uit de lade.", "Gebruik in het verzachtervak alleen vloeibare wasverzachter.", "Blijft het? Vraag service aan."]),
  F("OPn", "Wasmiddellade niet goed dicht", 1, "De lade is niet helemaal ingeschoven.", ["Duw de wasmiddellade helemaal dicht."]),
  F("E80 / nC / nE / nF / Ed5", "Communicatiefout elektronica of wifi", 1, "De printplaten, het NFC- of wifi-module communiceren niet goed.", ["Haal de stekker 60 seconden eruit en start opnieuw.", "Blijft het? Vraag service aan."]),
  F("PS / P5", "Voedingsprobleem", 1, "De stroomvoorziening klopt niet; het programma stopt.", ["Gebruik geen stekkerdoos; steek de stekker direct in het stopcontact.", "Haal de stekker 60 seconden eruit en start opnieuw."]),
  F("Cd", "Afkoelen na drogen (geen storing)", 1, "De was-droogcombinatie koelt de was af om kreuken te voorkomen.", ["Haal de was eruit of druk op Start/Pauze."]));
  m.src.push("lgWasUS"); })(MODELS.find(m => m.id === "lg-wasmachine"));
(m => { m.faults.push(
  F("tE", "Temperatuursensor", 2, "Probleem met de temperatuursensor.", ["Vraag service aan."]),
  F("PE", "Waterniveausensor", 2, "Alleen bij sommige oudere modellen.", ["Vraag service aan."]),
  F("bE", "Te veel schuim", 1, "Afwasmiddel of te veel vloeibaar vaatwasmiddel.", ["Gebruik nooit handafwasmiddel en weinig vloeibaar vaatwasmiddel.", "Zet het glansmiddel op L0, zet een kom met 200 ml melk in het bovenrek en draai een standaardprogramma zonder vaatwasmiddel.", "Zet daarna het glansmiddel terug."]),
  F("nE", "Vario-pomp", 1, "De waaier draait niet goed of servies raakt hem.", ["Zet het servies anders neer en start opnieuw."]),
  F("CL", "Bedieningsslot aan (geen storing)", 1, "Het bedieningspaneel is vergrendeld.", ["Houd Half Load en Energy Saver minstens 3 seconden ingedrukt."]),
  F("F31 / F35", "Droogventilator of droogtemperatuur", 2, "Bij modellen met Dynamic Heat Dry werkt de droogventilator of -verwarming niet.", ["Vraag service aan."]),
  F("F37", "Automatische deuropening", 1, "Auto Open Door werkt niet.", ["Zorg dat niets de deur blokkeert.", "Blijft het? Vraag service aan."]));
  m.src.push("lgVaatUS"); })(MODELS.find(m => m.id === "lg-vaatwasser"));
Object.assign(SRC,{ lgKoelUS: ["LG – foutcodes koelkast (Help Library, Engels)", "https://www.lg.com/us/support/help-library/how-to-troubleshoot-the-error-codes-on-your-lg-refrigerator-co-od-sd-if-cf-iu-dh-d1-d2-d-h1-h2-fs-rs-f1-f2-us-ls-e1-e2-r-ds-is-id-gs-and-gf-CT00023125-20155399831331"] });
{ const RS = ["Haal de stekker eruit en wacht ongeveer 5 minuten.", "Steek de stekker terug en kijk of de code weg is.", "Blijft de code? Gebruik de koelkast niet meer en neem contact op met LG. Haal hem niet zelf uit elkaar."];
const ICE = ["Tijdelijke oplossing: haal al het eten eruit, leg droge handdoeken voor de deuren, haal de stekker eruit en laat de deuren minstens 12 uur open.", "Komt de fout vaak terug? Neem contact op met LG."];
MODELS.push({ id: "lg-koelkast", brand: "LG", name: "Koelkast en Amerikaanse koelkast", cat: "koelkasten", years: "Alle bouwjaren", unit: null, also: "Codes verschijnen als 'Er' met een code, bijvoorbeeld Er dH",
  intro: "LG-koelkasten tonen 'Er' gevolgd door een code als een onderdeel, de besturing of een draad een probleem heeft. Begin altijd met 5 minuten stroomloos maken.", weak: ["IJs op de koelplaat (codes dH, d1, d2, H1, H2)."], parts: [], tasks: [],
  faults: [
    F("Er dH / Er d1 / Er d2 / Er H1 / Er H2", "Storing, vaak door ijs op de koelplaat", 2, "LG koppelt deze codes aan ijs op de koelplaat.", ICE),
    F("Er CO", "Storing in een intern onderdeel", 2, "LG geeft per code geen aparte uitleg: een onderdeel, de besturing of een losse draad heeft een probleem.", RS),
    F("Er IF / Er IS / Er Id / Er IU", "Storing in een intern onderdeel", 2, "LG geeft per code geen aparte uitleg: een onderdeel, de besturing of een losse draad heeft een probleem.", RS),
    F("Er FF / Er CF / Er F1 / Er F2 / Er CI", "Storing in een intern onderdeel", 2, "LG geeft per code geen aparte uitleg: een onderdeel, de besturing of een losse draad heeft een probleem.", RS),
    F("Er rS / Er FS / Er dS / Er US / Er LS / Er r / Er d", "Storing in een intern onderdeel", 2, "LG geeft per code geen aparte uitleg: een onderdeel, de besturing of een losse draad heeft een probleem.", RS),
    F("Er E1 / Er E2 / Er gS / Er gF / Er Od / Er Sd", "Storing in een intern onderdeel", 2, "LG geeft per code geen aparte uitleg: een onderdeel, de besturing of een losse draad heeft een probleem.", RS)],
  src: ["lgKoelUS"] }); }
Object.assign(SRC,{ mieleWasGA: ["Miele – gebruiksaanwijzing wasautomaat (nl-NL, pdf)", "https://media.miele.com/downloads/9a/34/00_96106EC61D0B1EDDA3B48DEB56E39A34.pdf"] });
(m => { m.faults.push(
  N("Melding 'Fout waterafvoer'", 1, "De afvoer is (deels) verstopt of de afvoerslang hangt te hoog.", ["Maak het pluizenfilter en de afvoerpomp schoon.", "Controleer de afvoerslang; die mag maximaal 1 meter omhoog."]),
  N("Melding 'Fout watertoevoer'", 1, "Kraan niet helemaal open, geknikte slang, lage waterdruk of verstopte zeefjes.", ["Draai de kraan helemaal open en haal knikken uit de slang.", "Maak de zeefjes in de toevoer schoon.", "Bij lage waterdruk: zet de instelling 'Lage waterdruk' aan."]),
  N("Melding 'Reactie Waterproof'", 2, "Het waterbeveiligingssysteem heeft gereageerd: mogelijk een lek.", ["Draai de kraan dicht.", "Neem contact op met Miele."]),
  N("Melding 'De deur kan niet worden vergrendeld'", 1, "De deur is niet goed gesloten.", ["Sluit de deur opnieuw en start het programma.", "Komt de melding terug of staat er 'deurslot geblokkeerd'? Neem contact op met Miele."]),
  N("Melding 'Hygiëne-info'", 1, "Er is lang niet op 60 °C of hoger gewassen.", ["Was een keer op 60 °C of hoger, of draai het programma Machine-hygiëne."]),
  N("Foutmelding F met een nummer", 2, "Een storing in de machine.", ["Zet de machine uit, wacht minstens 2 minuten en zet hem weer aan.", "Start het programma opnieuw. Blijft de melding? Neem contact op met Miele."]));
  m.src.push("mieleWasGA"); })(MODELS.find(m => m.id === "miele-wasmachine"));
Object.assign(SRC,{ mieleDroogGA: ["Miele – gebruiksaanwijzing luchtafvoerdroger (nl-NL, pdf)", "https://media.miele.com/downloads/c6/9e/00_C7F1383890AD1EDEABDBE86A8937C69E.pdf"] });
(m => { m.faults.push(
  N("Melding 'Zeven reinigen' of 'Reinig het pluizenfilter'", 1, "De filters zijn vuil of het is een controlemelding na het programma.", ["Maak het pluizenfilter schoon en controleer de luchtgeleiding.", "Wis de melding door het klepje van het pluizenfilter minstens 10 seconden open te houden terwijl de droger aan staat."]),
  N("Melding 'Sluit de klep van het pluizenfilter'", 1, "Het klepje van het pluizenfilter staat open.", ["Sluit het klepje. Open het nooit tijdens een programma."]),
  N("Programma afgebroken: trommel leeg of te droog", 1, "Te weinig wasgoed, of het is al droog.", ["Vul aan of kies voor kleine hoeveelheden het programma Warme lucht."]),
  N("Wasgoedbeschermer verstopt", 1, "Klein wasgoed is in de vulopening gezogen.", ["Haal het wasgoed weg en bevestig met OK.", "Droog klein wasgoed samen met grotere stukken."]),
  N("Melding 'Stroomstoring programma gestopt'", 1, "De stroom is uitgevallen.", ["Bevestig met OK en druk op Start/Stop."]),
  N("Foutmelding F met een nummer", 2, "Oorzaak niet direct vast te stellen.", ["Volg de aanwijzing op het display, druk op OK en start opnieuw.", "Komt het terug? Neem contact op met Miele."]));
  m.src.push("mieleDroogGA"); })(MODELS.find(m => m.id === "miele-droger"));
Object.assign(SRC,{ melittaPassione: ["Melitta – gebruiksaanwijzing Caffeo Passione (pdf via Vanden Borre)", "https://data.vandenborre.be/manual/MELIT/MELITTA_M_NL_CAFFEO%20PASSIONE.pdf"] });
MODELS.push({ id: "melitta-caffeo", brand: "Melitta", name: "Caffeo Passione en Varianza", cat: "koffiemachines", years: "Alle bouwjaren", unit: null, also: "Volautomaat",
  intro: "De Melitta Caffeo toont lampjes in plaats van foutcodes. Snel afwisselend knipperende lampjes betekenen meestal een softwarefout of een ontbrekende zetgroep.", weak: ["Vuile zetgroep.", "Olieachtige bonen die niet in de molen vallen."], parts: [],
  tasks: [{ m: 0.25, t: "Zetgroep uitnemen en afspoelen", v: true }, { w: "Als het lampje brandt", t: "Reinigingsprogramma draaien" }, { w: "Als het lampje brandt", t: "Ontkalken" }, { w: "Als het lampje brandt", t: "Waterfilter vervangen" }],
  faults: [
    N("Koffie druppelt alleen", 1, "Te fijn gemalen, vuile machine of kalk.", ["Zet de molen grover.", "Maak de zetgroep schoon en draai het reinigingsprogramma.", "Ontkalk de machine."]),
    N("Er komt geen koffie", 1, "Waterreservoir leeg of niet goed geplaatst, of de zetgroep is verstopt.", ["Vul het reservoir en plaats het goed.", "Maak de zetgroep schoon."]),
    N("Bonen vullen terwijl de bak vol is", 1, "De bonen vallen niet in de molen, vaak door olieachtige bonen.", ["Zet een kopje en tik zacht tegen de bonenbak.", "Maak de bonenbak schoon of gebruik andere bonen."]),
    N("Zetgroep past niet terug", 1, "De vergrendelhendel of de aandrijving staat verkeerd.", ["Controleer of de hendel goed staat.", "Houd 'Koffiesterkte' ingedrukt, druk ook op Aan/uit en laat los: de machine initialiseert de aandrijving."]),
    N("Lampjes knipperen snel om en om", 2, "Softwarefout of de zetgroep zit er niet in.", ["Plaats de zetgroep.", "Zet de machine uit en weer aan.", "Blijft het? Bel de Melitta-klantenservice."]),
    N("Te weinig melkschuim", 1, "De keuzeknop staat verkeerd of de Cappuccinatore is vuil.", ["Zet de keuzeknop goed.", "Maak de Cappuccinatore schoon."]),
    N("Molen maakt vreemd geluid", 2, "Er zit iets in de molen.", ["Bel de Melitta-klantenservice."])],
  src: ["melittaPassione"] });
Object.assign(SRC,{ elxTeWarm: ["Electrolux support – temperatuur in de koel-vriescombinatie te hoog", "https://support.electrolux.be/support-articles/article/de-temperatuur-in-de-koelvriescombinatie-is-te-hoog"], elxCondens: ["Electrolux support – water of condens in de koelkast", "https://support.electrolux.be/support-articles/article/storing-water-of-condens-in-de-koelkast-2"], elxGeur: ["Electrolux support – onaangename geurtjes in de koelkast", "https://support.electrolux.be/support-articles/article/onaangename-geurtjes-in-de-koelvriescombinatie--koelkast"] });
MODELS.push(
G("koelkast-te-warm", "Koelkast is te warm", "koelkasten", "Een te warme koelkast heeft meestal een eenvoudige oorzaak: een deur die niet goed sluit, te weinig ventilatie of net veel boodschappen. Een koelkast hoort 4 à 5 °C te zijn.", [
  N("Koelkast of vriezer wordt niet koud genoeg", 1, "Net ingesteld of veel ingeladen, ventilator stil, niet waterpas, deur of rubber sluit niet, te weinig ventilatie of de kamer is te warm voor de klimaatklasse.", ["Wacht ongeveer 12 uur na het aanzetten of na grote boodschappen.", "Open en sluit de deur en luister of de ventilator draait.", "Zet de koelkast waterpas en controleer of de deur stevig sluit.", "Maak de deurrubber schoon en controleer op scheurtjes.", "Meet de temperatuur met een thermometer in een glas water: 4 à 5 °C is goed.", "Zorg voor ventilatieruimte en controleer of de kamertemperatuur past bij de klimaatklasse op het typeplaatje.", "Ontdooi de koelkast en zet hem weer aan. Helpt niets? Laat een monteur kijken."])],
  ["elxTeWarm"]),
G("koelkast-water-condens", "Water of condens in de koelkast", "koelkasten", "Water onderin of achter de groentelades komt bijna altijd door een verstopt afvoergaatje achterin.", [
  N("Water onder de groentelade of op de bodem", 1, "Het afvoergaatje achterin is verstopt, of eten staat tegen de achterwand.", ["Maak het afvoergaatje in de goot achterin vrij; vaak zit er een groen staafje voor dat doel.", "Zet geen eten tegen de achterwand.", "Verpak vochtige producten zoals sla en bewaar groente in de lades.", "Open de deur zo kort mogelijk en controleer of hij goed sluit."])],
  ["elxCondens"]),
G("koelkast-stinkt", "Koelkast stinkt", "koelkasten", "Een vieze lucht in de koelkast komt van geurend eten, vuile rubbers of een vuile druipbak achterop.", [
  N("Koelkast ruikt onaangenaam", 1, "Sterk geurend eten, vuile schappen of rubbers, een vuile druipbak of bedorven eten na een stroomstoring.", ["Verpak sterk geurende producten luchtdicht.", "Maak schappen, deurrubber en binnenwand schoon.", "Maak de druipbak achterop boven de compressor schoon.", "Controleer na een stroomstoring of het eten nog goed is."])],
  ["elxGeur"]));
Object.assign(SRC,{ siCentr: ["Siemens – wasmachine centrifugeert niet", "https://www.siemens-home.bsh-group.com/nl/service/ondersteuning/problemen/wasmachines/centrifugeert-niet"], siVerw: ["Siemens – wasmachine verwarmt het water niet", "https://www.siemens-home.bsh-group.com/nl/service/ondersteuning/problemen/wasmachines/verwarmt-niet"], siAan: ["Siemens – wasmachine schakelt niet in", "https://www.siemens-home.bsh-group.com/nl/service/ondersteuning/problemen/wasmachines/gaat-niet-aan"], siDeur: ["Siemens – deur van de wasmachine opent of sluit niet", "https://www.siemens-home.bsh-group.com/nl/service/ondersteuning/problemen/wasmachines/deur"], siTablet: ["Siemens – vaatwastablet lost niet op", "https://www.siemens-home.bsh-group.com/nl/service/ondersteuning/problemen/vaatwassers/tablet-lost-niet-op"], siLawaai: ["Siemens – vaatwasser maakt geluid", "https://www.siemens-home.bsh-group.com/nl/service/ondersteuning/problemen/vaatwassers/maakt-lawaai"] });
MODELS.push(
G("wasmachine-centrifugeert-niet", "Wasmachine centrifugeert niet", "wasmachines", "Centrifugeert de wasmachine niet, dan is het water vaak niet weg of zit de was uit balans.", [
  N("Wasmachine centrifugeert niet of nauwelijks", 1, "Geknikte of verstopte slang, verstopt filter of onbalans.", ["Trek de machine iets naar voren en haal knikken uit toevoer- en afvoerslang.", "Test de afvoer: hang de afvoerslang in een emmer en kies Pompen. Loopt er weinig in, maak dan slang en sifon schoon.", "Maak het pompfilter schoon en haal voorwerpen weg.", "Verdeel de was gelijkmatig; bij onbalans centrifugeert de machine bewust niet of langzaam.", "Start een programma met centrifugeren."])],
  ["siCentr"]),
G("wasmachine-wordt-niet-warm", "Wasmachine wordt niet warm", "wasmachines", "Blijft het water koud, dan is meestal het verwarmingselement defect. Vaak verschijnt er ook een foutcode.", [
  N("Water wordt niet warm, was niet schoon", 3, "Een storing in het verwarmingselement.", ["Noteer de foutcode op het display.", "Probeer het niet zelf te repareren: dit is werk voor een monteur.", "Zoek bij onderdelen altijd op het typenummer (E-nummer) van je machine."])],
  ["siVerw"]),
G("wasmachine-gaat-niet-aan", "Wasmachine gaat niet aan", "wasmachines", "Doet de wasmachine helemaal niets, controleer dan eerst de stroom.", [
  N("Wasmachine reageert niet", 1, "Stekker, stopcontact, groep of snoer.", ["Controleer of de stekker goed zit.", "Test het stopcontact met een lamp.", "Kijk in de meterkast of de groep aan staat.", "Gebruik geen verlengsnoer of stekkerdoos en controleer het snoer op schade.", "Werkt hij nog niet? Bel een monteur. Raak de stekker nooit met natte handen aan."])],
  ["siAan"]),
G("wasmachine-deur-gaat-niet-open", "Deur wasmachine gaat niet open of dicht", "wasmachines", "Een deur die niet open of dicht gaat, komt vaak door het kinderslot of klemmend wasgoed.", [
  N("Deur opent of sluit niet", 1, "Kinderslot, klemmend wasgoed, een te volle trommel of een defect deurslot.", ["Zet het kinderslot uit.", "Controleer of er een sok of ander klein stuk tussen deur en rubber zit.", "Haal wat was uit een te volle trommel.", "Helpt niets? Dan is het deurslot mogelijk defect: laat een monteur kijken."])],
  ["siDeur"]),
G("vaatwastablet-lost-niet-op", "Vaatwastablet lost niet op", "vaatwassers", "Blijft het tablet liggen, dan wordt het bakje geblokkeerd of draaien de sproeiarmen niet goed.", [
  N("Tablet blijft (deels) in het bakje liggen", 1, "Het bakje is vuil of wordt geblokkeerd, of de sproeiarmen draaien niet goed.", ["Maak het bakje schoon en zorg dat geen pan of bord het blokkeert.", "Leg het tablet plat in het bakje.", "Controleer of de sproeiarmen vrij draaien en spoel de gaatjes schoon (met een cocktailprikker)."])],
  ["siTablet"]),
G("vaatwasser-maakt-lawaai", "Vaatwasser maakt lawaai", "vaatwassers", "Brommen tijdens het wegpompen is normaal. Kloppen en rammelen komt meestal door de manier van inruimen.", [
  N("Vaatwasser knarst of bromt heel luid", 1, "Er zit iets in de afvoerpomp, bijvoorbeeld een glasscherf.", ["Stekker eruit, onderste rek en sproeiarm eruit, filter losdraaien.", "Haal het water weg met een spons en trek handschoenen aan.", "Open het pompdeksel met een theelepel en haal voorwerpen weg.", "Zet alles terug en test met het kortste programma."]),
  N("Vaatwasser klopt of rammelt", 1, "De sproeiarm raakt servies, of losse spullen bewegen.", ["Ruim zo in dat de sproeiarmen vrij draaien.", "Zet lichte spullen vast en laat ruimte tussen de vaat."])],
  ["siLawaai"]));
Object.assign(SRC,{ elxUkDroog: ["Electrolux UK – foutcodes droger (E50, Err, EH0)", "https://support.electrolux.co.uk/support-articles/article/tumble-dryer-displays-error-message-eho-eh0"] });
(m => { m.faults.push(
  F("E50", "Motor of software", 2, "De droger ziet een probleem met de motor of de software.", ["Haal de stekker 30 seconden uit het stopcontact en zet de droger weer aan.", "Blijft E50? Vraag een monteur aan en geef de code door."]),
  F("Err", "Instelling niet mogelijk", 1, "Je probeerde iets te wijzigen na de start, of de optie past niet bij het programma.", ["Zet de droger uit en weer aan en kies programma en opties opnieuw.", "Controleer of de deur goed dicht is."]));
  m.src.push("elxUkDroog"); })(MODELS.find(m => m.id === "aeg-droger"));
Object.assign(SRC,{ zanUkE90: ["Zanussi UK – wasmachine toont E90 t/m E94", "https://support.zanussi.co.uk/support-articles/article/washing-machine-displays-error-message-e90-e91-e92-e93-or-e94"], elxUkWas: ["Electrolux UK – foutcodes wasmachine (overzicht)", "https://support.electrolux.co.uk/support-articles/article/electrolux-washing-machine-displays-an-error-code-causes-and-solutions"] });
(m => { const RS = ["Haal de stekker eruit of zet de groep uit en wacht ongeveer 1 minuut.", "Zet de stroom weer aan en kijk of de code weg is.", "Komt de code terug? Noteer hem en neem contact op met de service."]; m.faults.push(
  F("E30", "Druksensor (waterniveau)", 2, "Probleem met de sensor die het waterniveau meet.", RS),
  F("E50", "Motorstoring", 2, "Probleem met de motor.", RS),
  F("E60", "Verwarmingsstoring", 2, "Probleem met de verwarming.", RS),
  F("EH0 / EHO", "Stroomvoorziening", 1, "De netspanning is te hoog, te laag of instabiel.", ["Test het stopcontact met een ander apparaat en gebruik geen verlengsnoer.", "Haal de stekker 30 seconden eruit en zet de machine weer aan."]),
  F("E90 / E91 / E92 / E93 / E94", "Communicatie of configuratie elektronica", 2, "Tijdelijke storing (bijvoorbeeld na een stroomstoring) of een defecte print.", RS));
  m.src.push("zanUkE90", "elxUkWas"); })(MODELS.find(m => m.id === "zanussi-wasmachine"));
Object.assign(SRC,{ siEq9f: ["Siemens – problemen en oplossingen EQ9 plus", "https://www.siemens-home.bsh-group.com/nl/service/ondersteuning/problemen/koffiemachines/eq9/fouten"] });
(m => { m.faults.push(
  N("Weinig of geen melkschuim", 1, "Vuil melksysteem, ongeschikte melk, kalk of de opschuimer zuigt geen lucht.", ["Reinig het melksysteem.", "Gebruik koude melk met minstens 1,5% vet, geen gekookte melk.", "Ontkalk de machine en zorg dat de opschuimer ook lucht kan aanzuigen."]),
  N("Melksysteem zuigt geen melk aan", 1, "Onderdelen niet goed in elkaar of verkeerde volgorde.", ["Zet de onderdelen goed in elkaar.", "Sluit eerst het melksysteem op de uitloop aan en daarna het melkreservoir."]),
  N("Koffie druppelt of hoeveelheid klopt niet", 1, "Te fijn gemalen, kalk of lucht in het waterfilter.", ["Zet de maalgraad grover.", "Ontkalk de machine.", "Dompel het waterfilter onder tot er geen luchtbellen meer opstijgen."]),
  N("Alleen water, geen koffie", 1, "De lege bonenbak wordt niet herkend of de koffieschacht op de zetgroep is verstopt.", ["Vul bonen bij.", "Maak de zetgroep schoon."]),
  N("Machine reageert niet meer", 1, "Een storing in de elektronica.", ["Houd de aan/uit-toets 10 seconden ingedrukt."]),
  N("Koffiedik is nat en niet compact", 1, "Maalgraad niet goed of te weinig koffie.", ["Pas de maalgraad aan.", "Gebruik bij gemalen koffie 2 afgestreken maatlepels."]),
  N("Water onder de lekschaal", 1, "De lekschaal werd te snel na het zetten weggehaald.", ["Wacht een paar seconden na de laatste kop voordat je de lekschaal weghaalt."]));
  m.src.push("siEq9f"); })(MODELS.find(m => m.id === "siemens-eq-volautomaat"));
Object.assign(SRC,{ teslaWC: ["Tesla – problemen met een Wall Connector oplossen", "https://www.tesla.com/nl_be/support/charging/wall-connector/troubleshooting"] });
MODELS.push({ id: "tesla-wall-connector", brand: "Tesla", name: "Wall Connector Gen 3", cat: "laadpalen", years: "Alle bouwjaren", unit: null, also: "Laadt ook auto's van andere merken",
  intro: "De Wall Connector meldt een fout met een rode led die een aantal keer knippert, gevolgd door een pauze van een seconde. Tel het aantal keer.", weak: [], parts: [], tasks: [],
  faults: [
    N("Led brandt continu rood", 2, "Interne storing; laden staat uit.", ["Zet de groep 5 seconden uit en weer aan.", "Blijft het rood? Noteer onderdeel- en serienummer en neem contact op met Tesla."]),
    N("Led knippert 1 keer rood", 3, "Aardlekonderbreking door een onveilige verbinding.", ["Controleer handgreep, kabel, laadpaal en laadpoort op schade of water.", "Laat een elektricien de aansluiting controleren."]),
    N("Led knippert 2 keer rood", 3, "Probleem met de aarding.", ["Laad niet en laat een elektricien de aarding en aansluitingen controleren."]),
    N("Led knippert 3 keer rood", 2, "Te hoge temperatuur; laden wordt beperkt of stopt.", ["Verbind de laadpaal met wifi voor firmware-updates.", "Laat een elektricien de draaddikte en het aanhaalmoment van de klemmen controleren."]),
    N("Led knippert 4 keer rood", 1, "Geen internetverbinding.", ["Controleer je router en of het wifi-wachtwoord gewijzigd is.", "Doorloop de activering opnieuw in de app."]),
    N("Led knippert 5 keer rood", 1, "Communicatiefout bij het delen van vermogen tussen laders.", ["Koppel de laadpalen opnieuw via de app."]),
    N("Led knippert 6 keer rood", 2, "Te hoge spanning of slechte netkwaliteit.", ["Laat een elektricien de spanning meten (200–240 V)."]),
    N("Led knippert 7 keer rood", 1, "De auto trekt te veel stroom.", ["Verlaag de laadstroom.", "Blijft het? Neem contact op met Tesla of met de fabrikant van je auto."]),
    N("Led knippert of brandt blauw", 1, "Verbonden met de auto, maar er wordt niet geladen.", ["Controleer of de auto klaar is om te laden en of gepland laden of toegangscontrole het blokkeert."])],
  src: ["teslaWC"] });
Object.assign(SRC,{ btGazelle: ["BikeTotaal – Gazelle e-bike foutcodes", "https://www.biketotaal.nl/advies/elektrische-fietsen/foutcodes/gazelle"], gazDisplay: ["Gazelle – display problemen", "https://www.gazellebikes.com/nl-be/advies/e-bike/displays/display-problemen"], gazMotor: ["Gazelle – motor problemen", "https://www.gazellebikes.com/nl-be/advies/e-bike/motoren/motor-problemen"] });
{ const D = ["Komt de code terug? Ga naar een Gazelle-dealer."];
MODELS.push({ id: "gazelle-ebike", brand: "Gazelle", name: "E-bike (eigen Gazelle-systeem)", cat: "e-bikes", years: "Alle bouwjaren", unit: null, also: "Voor Gazelles met Bosch- of Shimano-motor: zie de codes van die merken",
  intro: "Gazelle-e-bikes met een eigen systeem tonen codes met een letter en een cijfer, zoals A.1 of B.6. De letter zegt waar het probleem zit: A = accu, B = motor of display, C = sensoren, D = communicatie. Zonder display knippert een lampje: Boost = accu, Normal = motor of display, Eco = sensor, alles = communicatie.", weak: ["Vocht in de contacten van display en accu.", "Losgetrilde stekkers onder het display."], parts: [],
  tasks: [{ m: 3, t: "Contacten van accu en display droog en schoon houden", v: true }, { m: 12, t: "Onderhoudsbeurt bij de dealer" }],
  faults: [
    F("A.1 / A.4", "Accu niet herkend of communicatiefout accu", 1, "Het serienummer van de accu is onbekend of de accu communiceert niet.", ["Haal de accu eruit en plaats hem opnieuw.", "Controleer de contacten op vocht en droog ze met een droge doek.", ...D]),
    F("A.2 / A.3 / A.6", "Accu te warm of te koud", 1, "A.2 tijdens laden, A.3 tijdens rijden, A.6 te koud.", ["Laat de accu op kamertemperatuur komen en probeer opnieuw."]),
    F("A.5", "Accu heeft geen verhuurcode", 1, "Komt voor bij huur- of leasefietsen.", ["Neem contact op met de verhuurder of dealer."]),
    F("B.2 / B.10", "Motor of motorelektronica te warm", 1, "De motor is oververhit.", ["Laat de motor afkoelen en rijd daarna verder.", ...D]),
    F("B.6", "Communicatiefout display", 1, "Het display communiceert niet met het systeem.", ["Haal het display uit de houder, veeg de contacten droog en plaats het terug.", "Controleer de kabels onder het display.", ...D]),
    F("B.7", "Fiets niet aangemeld", 1, "De fiets is niet aangemeld in het systeem.", ["Laat de fiets aanmelden door de dealer."]),
    F("B.8", "Motor krijgt te weinig spanning", 1, "Probleem met accu of kabels.", ["Laad de accu volledig op en controleer de kabels.", ...D]),
    F("B.11 / B.12 / B.14", "Spannings- of stroomfout in de motor", 2, "Fout in de motorcontroller.", ["Laat de motor controleren door de dealer."]),
    F("B.13 / EF", "Software", 2, "Ondersteuningscurven ontbreken of een softwarefout.", ["Laat de software herstellen bij de dealer."]),
    F("D.1", "Communicatieprobleem (alle lampjes knipperen)", 1, "De onderdelen communiceren niet.", ["Controleer de stekkers en kabels; door trillingen kunnen ze los raken.", "Kabels binnen in het frame? Laat de dealer kijken."]),
    F("E1", "Sensorfout bij opstarten", 1, "Je trapte terwijl het systeem opstartte.", ["Zet het systeem uit en weer aan zonder te trappen."]),
    N("Display gaat niet aan", 1, "Lege accu, of vocht of roest op de contacten.", ["Laad de accu op en controleer de lader.", "Haal het display uit de houder en plaats het terug.", "Maak de contacten droog en gebruik eventueel contactspray."]),
    N("Ondersteuning valt weg, snelheid 0 km/h", 1, "De spaakmagneet is verdraaid of verschoven (bij Bosch code 503, bij Shimano W011).", ["Draai de magneet terug tegenover de sensor bij het achterwiel, zo dicht mogelijk."]),
    N("Accu rammelt of ondersteuning valt weg bij hobbels", 1, "De accu zit niet goed vast in de houder of er zit vocht in de contacten.", ["Droog de contacten van accu en houder.", "Laat de accuhouder op termijn herstellen in een werkplaats."])],
  src: ["btGazelle", "gazDisplay", "gazMotor"] }); }
Object.assign(SRC,{ btBatavus: ["BikeTotaal – Batavus e-bike foutcodes", "https://www.biketotaal.nl/advies/elektrische-fietsen/foutcodes/batavus"] });
MODELS.push({ id: "batavus-ebike", brand: "Batavus", name: "E-bike (ION-systeem)", cat: "e-bikes", years: "Alle bouwjaren", unit: null, also: "Voor Batavus met Bosch- of Shimano-motor: zie de codes van die merken",
  intro: "Batavus-e-bikes met het ION-systeem tonen codes van E1 tot E99. Veel codes los je op door op te laden, een reset te doen of de contacten schoon te maken.", weak: ["Contacten van display en accu."], parts: [], tasks: [{ m: 12, t: "Onderhoudsbeurt bij de dealer" }],
  faults: [F("E1 / E01", "Accu leeg of accuprobleem", 1, "Accu leeg of accuprobleem.", ["Laad de accu volledig op.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E2 / E02", "Accu te warm of te koud", 1, "Accu te warm of te koud.", ["Laat de accu op temperatuur komen.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E3 / E03", "Software- of zekeringprobleem", 1, "Software- of zekeringprobleem.", ["Doe een zekering-reset en laad de accu op.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E4 / E04", "Fiets denkt dat de lader nog vastzit", 1, "Fiets denkt dat de lader nog vastzit.", ["Haal de lader los en controleer het laadpunt.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E5 / E05", "Slechte verbinding naar motor of display", 1, "Slechte verbinding naar motor of display.", ["Controleer accu, display en stekkers.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E6 / E06", "Kortsluiting in de verlichting", 2, "Kortsluiting in de verlichting.", ["Controleer verlichting en bedrading.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E7", "Motor te warm of te koud", 1, "Motor te warm of te koud.", ["Wacht tot de motor op temperatuur is.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E8", "Probleem met de motorsensor", 2, "Probleem met de motorsensor.", ["Laat het systeem uitlezen bij de dealer.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E9", "Elektronica in de motor", 2, "Elektronica in de motor.", ["Start opnieuw; komt het terug, schakel service in.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E10", "Softwarefout", 1, "Softwarefout.", ["Doe een zekering-reset en laad de accu op.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E11", "Elektronica in de accu", 2, "Elektronica in de accu.", ["Doe een zekering-reset en laad de accu op.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E12", "Los contact tussen accu en motor", 1, "Los contact tussen accu en motor.", ["Controleer de verbindingen en het display.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E13", "Display reageert niet goed", 1, "Display reageert niet goed.", ["Maak de contactpunten van het display schoon.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E14", "Display niet herkend", 1, "Display niet herkend.", ["Laat het display opnieuw instellen of aanmelden.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E15", "Afwijking in laadmanagement", 1, "Afwijking in laadmanagement.", ["Laad de fiets volledig op.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E16", "Afwijking in de krachtsensor", 1, "Afwijking in de krachtsensor.", ["Kalibreer de sensor via de lichtknop (zie handleiding).", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E17 / E21", "Motor zwaar belast of stroom begrensd", 1, "Motor zwaar belast of stroom begrensd.", ["Verminder de belasting, bijvoorbeeld met een lichtere versnelling.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E18", "Spanningsverschil tussen accucellen", 1, "Spanningsverschil tussen accucellen.", ["Laat de accu 24 uur aan de lader.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E19 / E32 / E43", "Accu te warm of buiten temperatuurbereik", 1, "Accu te warm of buiten temperatuurbereik.", ["Laat de accu afkoelen of op temperatuur komen.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E20", "Servicebeurt nodig", 1, "Servicebeurt nodig.", ["Plan een beurt bij de dealer.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E22", "Probleem tijdens het laden", 1, "Probleem tijdens het laden.", ["Zet de verlichting aan en uit, wacht even en sluit de lader opnieuw aan.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E24", "Probleem met de extender-accu", 1, "Probleem met de extender-accu.", ["Koppel de extender los, doe een reset en laad op.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E26 / E27", "Fout in de motor", 2, "Fout in de motor.", ["Laat software of onderdelen controleren als het terugkomt.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E28", "Restspanning in de motor", 1, "Restspanning in de motor.", ["Maak de stekkers schoon en controleer ze.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E29", "Communicatie met het display", 1, "Communicatie met het display.", ["Controleer de displayhouder en de pinnetjes.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E30", "Communicatie met de koppelsensor", 1, "Communicatie met de koppelsensor.", ["Zet opnieuw aan en controleer of de accu goed zit.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E31", "Kortsluiting in een accessoire", 1, "Kortsluiting in een accessoire.", ["Controleer de lader en de laderstekker.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E39", "Verkeerde lader aangesloten", 1, "Verkeerde lader aangesloten.", ["Gebruik de juiste lader.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E41", "Aansluitfout accu", 1, "Aansluitfout accu.", ["Controleer de connectoren op corrosie.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E47", "Koppelsensor defect", 2, "Koppelsensor defect.", ["Laat de sensor vervangen bij de dealer.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E62", "Ongewild inschakelen", 1, "Ongewild inschakelen.", ["Maak de contacten van de displayhouder schoon.", "Komt de code terug? Ga naar je Batavus-dealer."]),
    F("E99", "Onderdeel niet aangemeld", 1, "Onderdeel niet aangemeld.", ["Laat het nieuwe onderdeel aanmelden bij de dealer.", "Komt de code terug? Ga naar je Batavus-dealer."])],
  src: ["btBatavus"] });
Object.assign(SRC,{ btSparta: ["BikeTotaal – Sparta e-bike foutcodes", "https://www.biketotaal.nl/advies/elektrische-fietsen/foutcodes/sparta"] });
MODELS.push({ id: "sparta-ebike", brand: "Sparta", name: "E-bike (ION-systeem)", cat: "e-bikes", years: "Alle bouwjaren", unit: null, also: "Voor Sparta met Bosch- of Shimano-motor: zie de codes van die merken",
  intro: "Sparta-e-bikes met het ION-systeem tonen codes als E02 of, bij nieuwere systemen, vier cijfers zoals E0001.", weak: [], parts: [], tasks: [{ m: 12, t: "Onderhoudsbeurt bij de dealer" }],
  faults: [F("E0001", "Accu leeg", 1, "Accu leeg.", ["Laad de accu op.", "Komt de code terug? Ga naar je Sparta-dealer."]),
    F("E0003", "Probleem met de accu", 1, "Probleem met de accu.", ["Start het systeem opnieuw op.", "Komt de code terug? Ga naar je Sparta-dealer."]),
    F("E0004", "Probleem met de trapondersteuning", 1, "Probleem met de trapondersteuning.", ["Controleer de sensor en de verbindingen.", "Komt de code terug? Ga naar je Sparta-dealer."]),
    F("E0005", "Probleem met motor of aandrijving", 2, "Probleem met motor of aandrijving.", ["Start het systeem opnieuw op.", "Komt de code terug? Ga naar je Sparta-dealer."]),
    F("E0014", "Probleem met accu of accuspanning", 1, "Probleem met accu of accuspanning.", ["Controleer en laad de accu op.", "Komt de code terug? Ga naar je Sparta-dealer."]),
    F("E0022", "Probleem met display of bediening", 1, "Probleem met display of bediening.", ["Controleer het display en de aansluitingen.", "Komt de code terug? Ga naar je Sparta-dealer."]),
    F("E0122 / E0123", "Range extender: laadprobleem of niet herkend", 1, "Range extender: laadprobleem of niet herkend.", ["Controleer extender, lader en aansluiting.", "Komt de code terug? Ga naar je Sparta-dealer."]),
    F("E02 / E19", "Accu buiten temperatuurgrenzen", 1, "Accu buiten temperatuurgrenzen.", ["Laat de accu op temperatuur komen en probeer opnieuw.", "Komt de code terug? Ga naar je Sparta-dealer."]),
    F("E03 / E10", "Software onjuist of verouderd", 1, "Software onjuist of verouderd.", ["Laat de software controleren of opnieuw installeren bij de dealer.", "Komt de code terug? Ga naar je Sparta-dealer."]),
    F("E06", "Kortsluiting in de verlichting", 2, "Kortsluiting in de verlichting.", ["Controleer verlichting en bekabeling.", "Komt de code terug? Ga naar je Sparta-dealer."]),
    F("E07", "Motor buiten temperatuurgrenzen", 1, "Motor buiten temperatuurgrenzen.", ["Laat de motor afkoelen of opwarmen.", "Komt de code terug? Ga naar je Sparta-dealer."]),
    F("E08 / E16 / E47", "Probleem met motorsensor of krachtsensor", 2, "Probleem met motorsensor of krachtsensor.", ["Laat de sensor controleren bij de dealer.", "Komt de code terug? Ga naar je Sparta-dealer."]),
    F("E09", "Elektronica in motor of controller", 2, "Elektronica in motor of controller.", ["Start opnieuw en laat de onderdelen controleren.", "Komt de code terug? Ga naar je Sparta-dealer."]),
    F("E11", "Elektronica in de accu", 2, "Elektronica in de accu.", ["Laat de accu controleren.", "Komt de code terug? Ga naar je Sparta-dealer."]),
    F("E13 / E29", "Display of bedieningsunit reageert niet", 1, "Display of bedieningsunit reageert niet.", ["Controleer display, bedieningsunit en aansluitingen.", "Komt de code terug? Ga naar je Sparta-dealer."]),
    F("E15 / E48", "Laadmanagement of laadsysteem", 1, "Laadmanagement of laadsysteem.", ["Controleer accu, lader en aansluiting.", "Komt de code terug? Ga naar je Sparta-dealer."]),
    F("E17 / E21", "Motorstroom begrensd", 1, "Motorstroom begrensd.", ["Verminder de belasting en start opnieuw.", "Komt de code terug? Ga naar je Sparta-dealer."]),
    F("E18", "Spanningsverschil tussen accucellen", 1, "Spanningsverschil tussen accucellen.", ["Laat de accu controleren.", "Komt de code terug? Ga naar je Sparta-dealer."]),
    F("E20", "Servicebeurt nodig", 1, "Servicebeurt nodig.", ["Laat de fiets nakijken.", "Komt de code terug? Ga naar je Sparta-dealer."]),
    F("E26 / E27 / E28", "Fout in de motor", 2, "Fout in de motor.", ["Laat de motor controleren.", "Komt de code terug? Ga naar je Sparta-dealer."]),
    F("E30", "Geen communicatie met de koppelsensor", 1, "Geen communicatie met de koppelsensor.", ["Controleer koppelsensor en bekabeling.", "Komt de code terug? Ga naar je Sparta-dealer."]),
    F("E32", "Accu-elektronica te warm", 1, "Accu-elektronica te warm.", ["Laat de accu afkoelen.", "Komt de code terug? Ga naar je Sparta-dealer."]),
    F("E99", "Servicesoftware geladen", 1, "Servicesoftware geladen.", ["Laat de juiste fietssoftware installeren bij de dealer.", "Komt de code terug? Ga naar je Sparta-dealer."])],
  src: ["btSparta"] });
Object.assign(SRC,{ upwayStella: ["Upway – Stella e-bike foutcodes", "https://en.upway.be/blogs/news/codes-d-erreur-stella-e-bike"] });
MODELS.push({ id: "stella-ebike", brand: "Stella", name: "E-bike (eigen systeem, ook Livorno)", cat: "e-bikes", years: "Alle bouwjaren", unit: null, also: "Stella met Bosch- of Shimano-motor: zie de codes van die merken",
  intro: "Stella-e-bikes met het eigen systeem tonen 'Error' met een getal. Bij de Livorno verschijnt T30.", weak: ["Contacten van de accu.", "Stekkers aan het stuur (vocht)."], parts: [], tasks: [],
  faults: [
    F("21", "Stroomprobleem tussen accu en controller", 1, "Slecht contact tussen accu en controller.", ["Controleer of de accu stevig vastzit en maak de contacten schoon."]),
    F("22", "Fout in de ondersteuning", 2, "Probleem met de sensor of de gashendel.", ["Laat de fiets nakijken bij Stella-service."]),
    F("23", "Verbinding motor en accu", 1, "Een kabel of stekker tussen motor en accu zit niet goed.", ["Controleer de zichtbare kabels en stekkers."]),
    F("24", "Motorstoring", 3, "De aandrijving moet waarschijnlijk vervangen worden.", ["Laat de motor controleren door een specialist."]),
    F("25", "Remsensor defect", 2, "De sensor in de remgreep werkt niet.", ["Neem contact op met Stella-service."]),
    F("30 / T30", "Communicatie display en controller", 1, "Vocht in de stekkers aan het stuur, of een beknelde kabel.", ["Controleer de stekkers aan het stuur op vocht.", "Zet de accu goed vast en leg kabels die klem zitten of trillen anders neer."])],
  src: ["upwayStella"] });
Object.assign(SRC,{ upwayCortina: ["Upway – Cortina e-bike foutcodes", "https://en.upway.be/blogs/news/codes-d-erreur-des-e-bikes-cortina"], upwayGiant: ["Upway – Giant e-bike foutcodes (Duits)", "https://upway.de/blogs/reparatur/giant-ebike-fehlercodes-uebersichtstabelle"] });
MODELS.push({ id: "cortina-ebike", brand: "Cortina", name: "E-bike met Ecomo-accu", cat: "e-bikes", years: "Alle bouwjaren", unit: null, also: "Cortina met Bosch- of Shimano-motor: zie de codes van die merken",
  intro: "De Ecomo-accu van Cortina meldt problemen met knipperende ledjes op de accu. Tel welk lampje knippert.", weak: ["De accu bij hitte of veel klimmen."], parts: [], tasks: [],
  faults: [
    N("Ledje 1 op de accu knippert", 1, "De accu is oververhit, door warm weer of zware belasting.", ["Zet de accu op een koele, schaduwrijke plek en laat hem helemaal afkoelen.", "Laad een warme accu niet op."]),
    N("Ledje 2 op de accu knippert", 2, "Eén cel heeft een te hoge spanning: interne fout.", ["Ga naar de dealer of een e-bikespecialist."]),
    N("Ledje 3 op de accu knippert", 3, "Een of meer cellen zijn defect.", ["Breng de accu naar de dealer; reparatie of vervanging is nodig."]),
    N("Ledje 4 op de accu knippert", 1, "Laadfout: defecte lader of verkeerde laadpoort.", ["Controleer of de stekker in de juiste poort zit.", "Test met een andere passende lader."]),
    N("Lader knippert groen en rood", 1, "De accu is te koud om te laden.", ["Laat de accu op kamertemperatuur komen; het laden gaat dan verder."]),
    F("C2205", "Tijdelijke softwarefout (Ecomo Crush-display)", 1, "Vaak knippert de eerste 2.", ["Houd de menuknop ingedrukt tot het scherm uitgaat en zet het weer aan."]),
    F("000 / 09", "Systeemfout of controller vergrendeld", 1, "Het display toont 000 of Error 09.", ["Zet het display twee keer uit en aan.", "Blijft het? Laat de dealer kijken."]),
    N("Sleutelsymbool op het display", 1, "Herinnering voor een servicebeurt; geen storing.", ["Plan een beurt; daarna verdwijnt het symbool."])],
  src: ["upwayCortina"] });
MODELS.push({ id: "giant-ebike", brand: "Giant", name: "E-bike met SyncDrive-motor", cat: "e-bikes", years: "Alle bouwjaren", unit: null, also: "Giant SyncDrive (gebouwd door Yamaha) met EnergyPak-accu",
  intro: "Giant-e-bikes met SyncDrive tonen een foutnummer van 10 tot 15.", weak: [], parts: [], tasks: [],
  faults: [
    F("10", "Motor oververhit", 1, "Hoge belasting of warm weer.", ["Stop en laat de motor 10 tot 20 minuten afkoelen."]),
    F("11", "Snelheidssensor", 1, "Magneet verschoven, vuile sensor of beschadigde kabel.", ["Zet de magneet weer recht tegenover de sensor.", "Maak de sensor schoon en controleer de kabel."]),
    F("12", "Accu zit niet goed", 1, "De accu zit niet goed vast of de contacten zijn vuil.", ["Plaats de accu opnieuw en maak de contacten schoon."]),
    F("13", "Te hoge belasting van de motor", 1, "De motor krijgt te veel elektrische belasting.", ["Start de fiets opnieuw en verminder de belasting."]),
    F("14", "Lader of laadpoort", 1, "Niet-originele lader of beschadigde laadpoort.", ["Gebruik de originele lader en controleer de laadpoort."]),
    F("15", "Onderdelen niet gesynchroniseerd", 1, "De firmware van de onderdelen loopt niet gelijk.", ["Laat de dealer de firmware synchroniseren."])],
  src: ["upwayGiant"] });
Object.assign(SRC,{ upwayUA: ["Upway – Urban Arrow foutcodes", "https://upway.co/blogs/news/urban-arrow-error-codes-explained"] });
{ const D = "Blijft het? Laat de dealer kijken.";
MODELS.push({ id: "urban-arrow", brand: "Urban Arrow", name: "Bakfiets (Bosch Smart System)", cat: "e-bikes", years: "Alle bouwjaren", unit: null, also: "Family, Cargo en Tender",
  intro: "Nieuwere Urban Arrows hebben het Bosch Smart System met zescijferige foutcodes. Codes die met 66 of 89 beginnen zijn ernstig: stop dan met rijden.", weak: ["Snelheidssensor en magneet.", "Accu bij kou."], parts: [], tasks: [{ m: 12, t: "Onderhoudsbeurt bij de dealer" }],
  faults: [
    F("523005", "Storing magneetsensor (snelheid)", 1, "De magneet of sensor wordt gestoord.", ["Controleer of magneet en sensor goed tegenover elkaar staan.", "Haal vuil of metaal weg en start opnieuw."]),
    F("514001 / 514002 / 514003 / 514006", "Kleine sensor- of datawaarschuwing", 1, "Tijdelijke afwijking in sensor of communicatie; niet kritiek.", ["Start opnieuw en rijd verder als de melding weg is.", D]),
    F("660001", "Kritieke accufout: accu vergrendeld", 3, "De accu is uit veiligheid geblokkeerd.", ["Laad en gebruik de accu niet.", "Neem contact op met de dealer."]),
    F("660002 / 890000", "Kritieke systeemfout", 3, "Ernstige storing in het systeem.", ["Stop met rijden en laat de fiets direct nakijken door de dealer."]),
    F("680009 / 680012", "Accu te koud", 1, "De accu is te koud om veilig te rijden of te laden.", ["Laat de accu binnen opwarmen voordat je rijdt of laadt."]),
    F("680014 / 680016 / 680017", "Accu te warm", 2, "De accutemperatuur is (bijna) te hoog.", ["Verminder de ondersteuning of stop met rijden.", "Laat de accu helemaal afkoelen."]),
    F("822000", "ABS-sensor voorwiel", 2, "De ABS-sensor is defect of past niet.", ["Laat de sensor en bedrading controleren bij de dealer."])],
  src: ["upwayUA"] }); }
Object.assign(SRC,{ miRobot: ["Xiaomi – foutcodes Mi Robot Vacuum-Mop", "https://www.mi.com/global/support/faq/details/KA-07588/"] });
MODELS.push({ id: "xiaomi-robotstofzuiger", brand: "Xiaomi", name: "Mi Robot Vacuum-Mop", cat: "stofzuigers", years: "Alle bouwjaren", unit: null, also: "Ook Mi Robot Vacuum-Mop P en Pro",
  intro: "De Xiaomi-robot meldt een foutnummer in de Mi Home-app of via een gesproken melding.", weak: ["Haar in borstels en wielen."], parts: [], tasks: [{ m: 0.25, t: "Borstels, wielen en sensoren schoonmaken" }],
  faults: [F("1", "Bumper zit vast", 1, "Bumper zit vast.", ["Maak de bumper schoon en tik er zacht op om vuil los te maken.", "Lukt het niet? Zet de robot op een andere plek en start opnieuw."]),
    F("2", "Een wiel hangt los van de grond", 1, "Een wiel hangt los van de grond.", ["Zet de robot op een vlakke vloer en start opnieuw."]),
    F("3", "Robot staat scheef of valsensor vuil", 1, "Robot staat scheef of valsensor vuil.", ["Maak de valsensoren schoon, zet de robot vlak neer en start opnieuw."]),
    F("4", "Iets vast in de hoofdborstel", 1, "Iets vast in de hoofdborstel.", ["Haal de borstel eruit en maak haren en lagers schoon."]),
    F("5", "Iets vast in de zijborstel", 1, "Iets vast in de zijborstel.", ["Haal de zijborstel eruit en maak hem schoon."]),
    F("6", "Iets vast in een wiel", 1, "Iets vast in een wiel.", ["Maak de wielen schoon, zet de robot op een andere plek en start opnieuw."]),
    F("7", "Robot zit vast", 1, "Robot zit vast.", ["Haal obstakels rond de robot weg."]),
    F("8", "Stofbak of filter niet goed geplaatst", 1, "Stofbak of filter niet goed geplaatst.", ["Plaats stofbak en filter opnieuw.", "Blijft het? Vervang het filter."]),
    F("9 / 12", "Te dicht bij een virtuele muur of verboden zone", 1, "Te dicht bij een virtuele muur of verboden zone.", ["Zet de robot verder van de magneetstrip of verboden zone en start opnieuw."]),
    F("10", "Laadfout", 1, "Laadfout.", ["Veeg de laadcontacten van robot en laadstation droog schoon."]),
    F("11", "Accu te warm of te koud", 1, "Accu te warm of te koud.", ["Wacht tot de temperatuur normaal is en gebruik de robot dan weer."]),
    F("13", "Navigatiesensor vuil", 1, "Navigatiesensor vuil.", ["Veeg de sensor schoon en start opnieuw."]),
    F("14", "Interne fout", 1, "Interne fout.", ["Reset het systeem.", "Blijft het? Neem contact op met de klantenservice."])],
  src: ["miRobot"] });
Object.assign(SRC,{ samsungMagnUK: ["Samsung UK – informatiecodes magnetron (Engels)", "https://www.samsung.com/uk/support/home-appliances/displayed-information-codes-on-my-microwave"] });
(m => { m.faults.push(
  F("C-A1 / E-A1", "Klep (damper) opent of sluit niet", 2, "De luchtklep werd een minuut lang niet gedetecteerd.", ["Haal de stekker eruit en neem contact op met Samsung Service."]),
  F("E-21 / E-22", "Temperatuursensor open of kortgesloten", 2, "Storing in de temperatuursensor (ook C-20).", ["Haal de stekker eruit en neem contact op met Samsung Service."]),
  F("E-83", "Geen communicatie tussen de printplaten", 2, "De hoofd- en subprint communiceren niet (ook C-F0).", ["Haal de stekker eruit en neem contact op met Samsung Service."]),
  F("-tE-", "Communicatie met de aanraaktoetsen", 1, "Afwijkende communicatie met het bedieningspaneel (ook C-F2).", ["Druk op Stop en probeer opnieuw."]));
  m.src.push("samsungMagnUK"); })(MODELS.find(m => m.id === "samsung-magnetron"));
Object.assign(SRC,{ lgDroogUS: ["LG – foutcodes droger (Help Library, Engels)", "https://www.lg.com/us/support/help-library/lg-dryer-error-code-list-CT10000011-20152310891742"] });
{ const RS = ["Haal de stekker eruit, houd Start/Pauze 5 seconden ingedrukt, sluit weer aan en start een programma.", "Komt de code terug? Vraag een reparatie aan."];
MODELS.push({ id: "lg-droger", brand: "LG", name: "Droger (warmtepomp en condens)", cat: "drogers", years: "Alle bouwjaren", unit: null, also: "Ook LG was-droogcombinaties",
  intro: "LG-drogers tonen korte codes. Check Filter, CL en het knipperende Cooling-lampje zijn geen storingen.", weak: ["Pluizenfilter en vochtsensoren."], parts: [], tasks: [{ w: "Na elke droogbeurt", t: "Pluizenfilter schoonmaken" }],
  faults: [
    F("dE", "Deur niet goed dicht", 1, "De deur sluit niet helemaal, vaak door het pluizenfilter of klemmende was.", ["Duw het pluizenfilter helemaal in en haal klemmende was weg.", "Sluit de deur stevig en druk op Start.", "Komt het terug? Haal de stekker 5 seconden eruit; blijft het, vraag een reparatie aan."]),
    F("E13", "Afvoer van condenswater", 1, "De afvoerslang is geknikt of verstopt, of het water is bevroren.", ["Controleer de afvoerslang op knikken en verstopping.", "Gebruik geen verlengde slang.", "Druk op Start/Pauze."]),
    F("F0", "Pluizenfilter niet goed geplaatst", 1, "Het pluizenfilter zit niet goed.", ["Haal het pluizenfilter eruit en plaats het helemaal terug."]),
    F("HS", "Vochtsensor", 1, "De vochtsensor werkt niet goed; de droger draait dan lang door.", ["Maak de sensorstrips onder het pluizenfilter schoon met een vochtige doek en laat ze drogen."]),
    F("PF", "Stroomstoring tijdens het programma", 1, "Vaak na een stroomuitval.", RS),
    F("tE1 / tE3 / tE4", "Temperatuursensor", 2, "Probleem met de temperatuursensor (thermistor).", RS),
    F("CL", "Kinderslot aan (geen storing)", 1, "Het bedieningspaneel is vergrendeld.", ["Houd de knop Child Lock 3 seconden ingedrukt."])],
  src: ["lgDroogUS"] }); }
Object.assign(SRC,{ ecodanGA: ["Alklima – Ecodan handleiding eindgebruiker (pdf)", "https://alklima.nl/service-en-support/downloads/bedieningshandleiding/ecodan-handleiding-eindgebruiker.pdf"], ecodanP1: ["Alklima kennisbank – P1-storing Ecodan", "https://kennisbank.alklima.nl/hc/nl/articles/37602867442321-P1-storing"] });
MODELS.push({ id: "mitsubishi-ecodan", brand: "Mitsubishi Electric", name: "Ecodan warmtepomp", cat: "warmtepompen", years: "Alle bouwjaren", unit: null, also: "Hydrobox en cilinderunit",
  intro: "De Ecodan toont storingscodes op het display van de hydrobox of cilinderunit. Bij een draadloze thermostaat verschijnt een waarschuwingsdriehoek. De waterdruk hoort tussen 1,5 en 2 bar te liggen.", weak: ["Te lage waterdruk.", "Lege batterijen van de draadloze thermostaat."], parts: [],
  tasks: [{ m: 1, t: "Waterdruk controleren (1,5–2 bar)" }, { m: 12, t: "Onderhoud door de installateur" }],
  faults: [
    F("L9", "Te weinig waterstroming", 1, "Vaak een te lage waterdruk.", ["Controleer de druk op de drukmeter van de hydrobox of cilinderunit.", "Vul bij via de vulslang tot ongeveer 2 bar en sluit de kranen; het systeem ontlucht zichzelf.", "Zakt de druk snel weer of komt L9 terug? Bel je installateur."]),
    F("P1", "Kamertemperatuursensor niet in orde", 1, "Lege batterijen van de draadloze thermostaat, een slecht aangesloten sensor of een verkeerd gekozen kamersensor in het menu.", ["Vervang de batterijen van de draadloze thermostaat.", "Blijft P1? Laat de installateur de sensor en de instelling (HBD of RC) controleren."]),
    F("J0 / J1 / J8", "Geen communicatie met de draadloze bediening", 1, "Codes J0 tot en met J8: de draadloze bediening heeft geen verbinding.", ["Is het display van de draadloze bediening leeg of zie je een doorgestreept batterijsymbool? Vervang de batterijen.", "Zet de unit uit en weer aan met de toets linksonder."])],
  src: ["ecodanGA", "ecodanP1"] });
Object.assign(SRC,{ alkEE: ["Alklima kennisbank – EE-storing", "https://kennisbank.alklima.nl/hc/nl/articles/37669007724689-EE-storing"], alkLP: ["Alklima kennisbank – LP-storing", "https://kennisbank.alklima.nl/hc/nl/articles/37673565141521-LP-storing"], alkL5: ["Alklima kennisbank – L5-storing", "https://kennisbank.alklima.nl/hc/nl/articles/37671649450513-L5-storing"], alk6831: ["Alklima kennisbank – 6831/E4-storing", "https://kennisbank.alklima.nl/hc/nl/articles/37639674361105-6831-E4-storing"], alk6840: ["Alklima kennisbank – 6840/E6/E8-storing", "https://kennisbank.alklima.nl/hc/nl/articles/37642285389841-6840-E6-E8-storing"] });
(m => { const I = ["Neem contact op met je installateur en geef de code door."]; m.faults.push(
  F("EE", "Binnen- en buitenunit passen niet bij elkaar", 2, "De instelling van de buitenunit (dipswitch) klopt niet bij de binnenunit.", ["Laat de installateur de dipswitches van de buitenunit controleren."]),
  F("LP", "Waterdebiet buitenunit buiten bereik", 2, "Het gemeten waterdebiet valt buiten het ingestelde bereik van de debietmeter.", ["Controleer de waterdruk.", "Laat de installateur het ingestelde debietbereik in het servicemenu controleren."]),
  F("L5", "Temperatuursensor (thermistor) defect", 2, "Een van de watertemperatuursensoren (THW1, THW2 of THW5) is onderbroken of kortgesloten.", I),
  F("6831 / E4", "Geen communicatie met de bediening", 1, "De warmtepomp krijgt geen signaal van de bediening.", ["Maak de installatie 5 minuten spanningsloos (groep uit) en zet weer aan.", "Blijft het? Laat de installateur de bekabeling van de bediening controleren."]),
  F("6840 / E6 / E8", "Communicatie tussen binnen- en buitenunit", 2, "De binnen- en buitenunit communiceren niet goed, vaak door een losse of beschadigde verbindingskabel.", ["Laat de installateur de verbindingskabel en klemmen S1/S2 controleren."]));
  m.src.push("alkEE", "alkLP", "alkL5", "alk6831", "alk6840"); })(MODELS.find(m => m.id === "mitsubishi-ecodan"));
Object.assign(SRC,{ alk7101: ["Alklima kennisbank – 7101-storing", "https://kennisbank.alklima.nl/hc/nl/articles/37642833499153-7101-storing"] });
MODELS.push({ id: "mitsubishi-airco", brand: "Mitsubishi Electric", name: "Airco (Mr. Slim en wandmodellen)", cat: "airco", years: "Alle bouwjaren", unit: null, also: "Geïmporteerd door Alklima",
  intro: "Mitsubishi Electric-airco's tonen een storingscode op de bediening. De meeste codes zijn voor de installateur; geef de code door.", weak: [], parts: [], tasks: [{ m: 0.5, t: "Luchtfilters schoonmaken", v: true }],
  faults: [
    F("E6 / E8 / 6840", "Communicatie tussen binnen- en buitenunit", 2, "De binnen- en buitenunit communiceren niet, vaak door een losse, verbrande of beschadigde verbindingskabel.", ["Laat de installateur de verbindingskabel en de klemmen controleren."]),
    F("7101", "Binnen- en buitenunit passen niet bij elkaar", 2, "De capaciteitscodes van binnen- en buitenunit verschillen. Komt meestal voor na installatie of vervanging.", ["Neem contact op met je installateur."])],
  src: ["alk6840", "alk7101"] });
Object.assign(SRC,{ invModul: ["Inventum – storingslijst Modul AIR (pdf)", "https://service.inventum.com/downloads/20240123-Modul-AIR-storingslijst.pdf"] });
{ const I = ["Neem contact op met je installateur en geef de code door."]; const P = ["Vul de cv-installatie bij tot 1,5 à 2,0 bar.", "Moet je vaak bijvullen? Laat de installateur naar een lek zoeken."];
MODELS.push({ id: "inventum-modul-air", brand: "Inventum", name: "Modul AIR ventilatiewarmtepomp", cat: "warmtepompen", years: "Alle bouwjaren", unit: null, also: "Ook met GreenComfort",
  intro: "De Inventum Modul AIR toont een foutnummer of een AP-melding. AP-codes zijn tijdelijke pauzes. Veel storingen los je op door bij te vullen, het filter te vervangen of de ventielen open te zetten.", weak: ["Vuil filter.", "Te lage cv-druk."], parts: [["Filter", "Inventum S1012742"]],
  tasks: [{ w: "Bij code 20", t: "Filter vervangen en urenteller resetten" }, { m: 1, t: "Cv-druk controleren (1,5–2 bar)" }],
  faults: [
    F("10", "Waterdruk te laag (onder 0,8 bar)", 1, "Te weinig water in de cv-installatie.", P),
    F("95", "Waterdruk kritiek laag (onder 0,3 bar)", 1, "Veel te weinig water in de cv-installatie.", P),
    F("70", "Druksensor meet 0,0 bar", 1, "De cv-druk is weg of de druksensor is defect.", ["Vul de cv-installatie bij tot 1,5 à 2,0 bar.", ...I]),
    F("20", "Filter vervangen", 1, "Het filterinterval is verlopen.", ["Vervang het filter en zet de urenteller terug."]),
    F("12", "Geen communicatie met de kamerthermostaat", 1, "De thermostaat is niet goed aangesloten of niet geschikt.", ["Controleer de bedrading van de thermostaat.", ...I]),
    F("13", "Geen communicatie met de cv-ketel", 1, "De OpenTherm-verbinding met de ketel werkt niet.", ["Controleer de verbinding via het menu CV-verbinding.", ...I]),
    F("36", "Vorstbeveiliging GreenComfort actief", 1, "Wordt vanzelf opgeheven.", ["Even wachten; komt het vaak voor, vraag dan een servicebezoek aan."]),
    F("37", "Verbinding met GreenComfort verbroken", 1, "De GreenComfort-unit heeft geen stroom of verbinding.", ["Controleer of de GreenComfort stroom heeft.", ...I]),
    F("35 / 60", "Luchtdebiet- of luchtflowsensor", 1, "De meetslangen zijn verstopt, geknikt of verkeerd aangesloten.", ["Controleer de meetslangen op knikken en blaas ze door.", ...I]),
    F("71", "Thermische beveiliging doorstromer", 2, "De beveiliging van de elektrische doorstromer is aangesproken.", ["Ontlucht de installatie.", "Reset met de rode knop.", ...I]),
    F("80 / 90", "Geen temperatuurverschil over de condensor", 2, "Te weinig doorstroming in de cv; bij 90 is de compressor vergrendeld.", ["Ontlucht de installatie en zorg dat radiatoren en groepen open staan.", ...I]),
    F("81 / 94", "Geen temperatuurverschil over de verdamper", 2, "Te weinig luchtstroom; bij 94 is de compressor vergrendeld.", ["Vervang het filter.", "Controleer of de ventilatieventielen open staan.", ...I]),
    F("30 / 31 / 32 / 33 / 34 / 51 / 52 / 53 / 54 / 55", "Temperatuursensor defect", 2, "Een van de temperatuursensoren (boiler, doorstromer, lucht, verdamper of cv) geeft een fout.", I),
    F("AP1", "Heetgasbeveiliging (pauze)", 1, "De compressor wacht.", ["Wachten; de compressor start binnen 35 minuten weer."]),
    F("AP2", "Cv-temperatuur te hoog voor de warmtepomp", 1, "De gemiddelde cv-temperatuur is hoger dan 60 °C.", ["Verlaag zo mogelijk de aanvoertemperatuur van de cv-ketel."]),
    F("AP3", "Invriesbeveiliging verdamper", 1, "Te weinig luchtstroom of een te koude kamer.", ["Zet de ventilatieventielen voldoende open.", "Zorg dat de kamertemperatuur niet te laag is."]),
    F("AP4", "Algemene pauze", 1, "De warmtepomp wacht 35 minuten.", ["Even wachten."])],
  src: ["invModul"] }); }
Object.assign(SRC,{ elgaAceMB: ["Remeha – installatie- en gebruikershandleiding Elga Ace monoblock (pdf via Technim)", "https://www.technim.nl/wp-content/uploads/2024/04/Handleidinging_Remeha_elga_ace_monoblock.pdf"] });
{ const I = installer;
MODELS.push({ id: "remeha-elga-ace", brand: "Remeha", name: "Elga Ace hybride warmtepomp (monoblock)", cat: "warmtepompen", years: "Alle bouwjaren", unit: null, also: "Codes als H06.28 of H00.32",
  intro: "De Elga Ace gebruikt dezelfde soorten codes als de Remeha Ace-ketels: A (waarschuwing), H (blokkering) en E (vergrendeling). Een rood scherm betekent een blokkering, rood knipperend een vergrendeling. De meeste codes zijn voor de installateur.", weak: ["Verstopte condensafvoer van de buitenunit."], parts: [],
  tasks: [{ m: 3, t: "Condensafvoer van de buitenunit controleren", v: true }, { m: 12, t: "Onderhoud door de installateur", s: "Magnetisch filter, druk en veiligheidscomponenten" }],
  faults: [
    F("H06.28", "Communicatie tussen binnen- en buitenunit", 2, "De binnen- en buitenunit communiceren niet goed.", ["Zet de buitenunit en de binnenunit uit en wacht 3 minuten.", "Zet eerst de binnenunit en daarna de buitenunit weer aan.", ...I]),
    F("H06.17", "Temperatuurverschil cv te groot", 1, "Te weinig doorstroming: vuil filter, lucht of te lage druk.", ["Controleer de waterdruk (boven 1 bar) en vul zo nodig bij.", "Ontlucht de installatie.", ...I]),
    F("H06.06 / H06.07 / H06.24", "Compressor gestopt door te hoge of te lage druk", 2, "Probleem in het koelcircuit, een vuile warmtewisselaar of te weinig waterdebiet.", I),
    F("H06.27", "Vorstbeveiliging warmtepomp actief", 1, "De warmtepomp beschermt zich tegen bevriezing.", ["Even afwachten; blijft de melding, bel je installateur."]),
    F("H06.01", "Storing in de buitenunit", 2, "De buitenunit meldt zelf een code (bijvoorbeeld E3, E4, H5 of H9) op zijn display.", I),
    F("H00.32 / H00.33 / H00.34", "Buitentemperatuursensor", 2, "De buitenvoeler is los, kortgesloten of niet gevonden.", I),
    F("H02.09 / H02.10", "Blokkering door extern contact", 1, "De blokkeringang op de hoofdprint staat open.", ["Controleer of een aangesloten apparaat of thermostaat de warmtepomp blokkeert.", ...I]),
    F("H00.48 / H00.49 / H00.51 / H00.52", "Aanvoer- of retoursensor warmtepomp", 2, "Een temperatuursensor is los, kortgesloten of niet gevonden.", I),
    F("H02.02 / H02.03 / H02.04", "Configuratie- of parameterfout", 2, "De warmtepomp is (na een printwissel) niet goed ingesteld.", I)],
  src: ["elgaAceMB"] }); }
Object.assign(SRC,{ smegSFP: ["SMEG – gebruiksaanwijzing oven SFP6104 (pdf via Vanden Borre)", "https://data.vandenborre.be/manual/SMEG/SMEG_M_NL_SFP6104%20TVS.pdf"] });
(m => { m.faults.push(
  F("Error 4", "Deurvergrendeling niet goed (pyrolyse)", 1, "De deurvergrendeling sloot niet goed, bijvoorbeeld omdat de deur openging tijdens het starten van de reiniging.", ["Zet de oven uit en weer aan.", "Wacht een paar minuten voordat je opnieuw een reinigingsprogramma kiest."]),
  N("Oven wordt niet warm, display werkt wel", 1, "De demostand staat aan.", ["Zet de demostand uit via Instellingen."]),
  N("Toetsen reageren niet", 1, "De toetsblokkering staat aan.", ["Zet de toetsblokkering uit via Instellingen, of houd tijdens het koken een toets 3 seconden ingedrukt."]),
  N("Oven doet veel langer over bakken", 1, "De Eco-logic-stand staat aan.", ["Zet Eco-logic uit via Instellingen."]),
  N("Na pyrolyse geen functie te kiezen", 1, "De deur is nog vergrendeld omdat de oven te heet is.", ["Wacht tot de oven voldoende is afgekoeld."]),
  N("Andere melding 'Error' met een nummer", 2, "Een storing in de oven.", ["Noteer de melding, de functie en de temperatuur en neem contact op met de SMEG-service."]));
  m.src.push("smegSFP"); })(MODELS.find(m => m.id === "smeg-fornuis"));
Object.assign(SRC,{ bekoB5T: ["Beko – gebruiksaanwijzing droger B5T4724W (pdf)", "https://www.beko.com/content/dam/belgium-be-aem/belgium-be-aemProductCatalog/product-documents/7188239860-B5T4724W/nl-BE-7188239860-MDM2-USER-MANUAL-FILE-nl-BE.pdf"] });
(m => { m.faults.push(
  F("FLt / F L t", "Filters of condensor vuil", 1, "Vuile filters, niet beide dubbele filters geplaatst, een verstopte condensor of iets in de trommel.", ["Maak het binnen- en buitenfilter schoon en plaats ze allebei.", "Open het condensorvak en maak de condensor schoon.", "Haal voorwerpen uit de trommel."]),
  N("Condensorsymbool knippert", 1, "De voorkant van de condensor zit vol pluis.", ["Maak de voorkant van de condensor schoon."]),
  N("Pluizenfiltersymbool brandt of droger piept", 1, "Filters vuil, niet geplaatst of verkeerd geplaatst.", ["Stofzuig de filters en plaats ze goed terug."]),
  N("Waterreservoirsymbool brandt of knippert", 1, "Het reservoir is vol of de afvoerslang is geknikt.", ["Leeg het reservoir.", "Bij een directe afvoer: controleer de slang op knikken."]),
  N("Water lekt bij de deur", 1, "Pluis op de binnenkant van de deur of de afdichting.", ["Maak de binnenkant van de deur en de afdichting schoon."]));
  m.src.push("bekoB5T"); })(MODELS.find(m => m.id === "beko-droger"));
Object.assign(SRC,{ brinkFlair300: ["Brink – storingen Flair 300 (pdf)", "https://www.brinkclimatesystems.nl/documenten/8-storing-615799-615799.pdf"] });
{ const I = ["Laat de installateur de storing verhelpen; geef de code door."];
MODELS.push({ id: "brink-flair", brand: "Brink", name: "Flair 300 WTW (storingscodes)", cat: "ventilatie", years: "Alle bouwjaren", unit: null, also: "Codes als E104 en E105; subcode tussen haakjes",
  intro: "Bij een storing knippert de led op de Brink Flair rood en toont het display een E-code. Codes met een sterretje vergrendelen het toestel: spanningsloos maken helpt dan niet. Alleen filters en kanalen controleer je zelf.", weak: ["Vuile filters (debiet niet gehaald)."], parts: [], tasks: [{ m: 6, t: "Filters reinigen of vervangen", v: true }],
  faults: [
    F("E105 / E104", "Toevoer- of afvoerdebiet niet gehaald", 1, "Subcode E1011 (toevoer) of E1012 (afvoer): te weinig luchtstroom. Met subcode E1100 of E1120 is de ventilator zelf defect.", ["Reinig of vervang de filters.", "Controleer of ventielen en kanalen vrij zijn.", "Blijft de code (of staat het toestel stand-by)? Bel je installateur."]),
    F("E000", "Buitenlucht te warm", 1, "De buitenluchttemperatuur is te hoog; het toestel gaat stand-by.", ["Bij warm weer: wacht tot de lucht is afgekoeld.", "Gebeurt het bij koud weer? Dan is de temperatuursensor mogelijk defect: bel je installateur."]),
    F("E103", "Bypass defect", 2, "De bypassklep werkt niet.", I),
    F("E106 / E111", "Sensor defect", 2, "E106: temperatuursensor NTC1 (toestel stand-by). E111: vochtsensor (geen vochtregeling).", I),
    F("E113", "Voorverwarmer defect", 2, "De interne voorverwarmer werkt niet; vorstbeveiliging schakelt naar onbalans.", I),
    F("E114", "Standenschakelaar defect", 1, "Het toestel draait in stand 1.", I),
    F("E120 / E121 / E123", "Communicatiefout bus", 1, "Accessoires of de Brink Air Control werken niet; het toestel zelf draait.", I),
    F("E152 / E153 / E115", "Fout in de besturingsprint", 2, "Geheugen- of algemene fout van de basisprint.", I),
    F("E170", "CO2-sensor defect", 1, "Het toestel werkt, maar zonder CO2-regeling.", I),
    F("E190", "Zelftest mislukt", 1, "Het toestel doet niets anders; geen actie nodig.", ["Geen actie; blijft de melding, bel je installateur."])],
  src: ["brinkFlair300"] }); }
Object.assign(SRC,{ brinkExc612010: ["Brink – installatievoorschrift Renovent Excellent 300/400 (pdf)", "https://www.brinkclimatesystems.nl/documenten/renovent-excellent-300-400-612010.pdf"] });
(m => { const I = ["Laat de installateur de storing verhelpen; geef de code door."]; m.faults.push(
  F("E100 / E101", "Druksensor ventilator of drukslangetjes", 1, "E100: toevoerzijde (rode slangetjes), E101: afvoerzijde (blauwe slangetjes). Verstopt, geknikt of een defecte sensor. Het toestel draait door op vast toerental.", I),
  F("E103", "Bypass defect", 2, "De stappenmotor van de bypass is niet goed aangesloten, defect of kortgesloten.", I),
  F("E104 / E105", "Ventilator defect", 3, "E104: afvoerventilator, E105: toevoerventilator. Beide ventilatoren stoppen; het toestel probeert elke 5 minuten opnieuw.", I),
  F("E106 / E107 / E108", "Temperatuurvoeler defect", 2, "E106: buitenlucht (ventilatoren uit), E107: binnenlucht, E108: externe voeler.", I),
  F("E109 / E111", "CO2- of vochtsensor defect", 1, "Het toestel blijft werken, maar zonder deze regeling.", I),
  F("E999", "Dipswitches verkeerd ingesteld", 2, "Het toestel doet niets.", I));
  m.src.push("brinkExc612010"); })(MODELS.find(m => m.id === "brink-renovent-excellent"));
Object.assign(SRC,{ ithoHru: ["Itho Daalderop – gebruikershandleiding HRU ECO 350 (pdf via Ventilatieland)", "https://www.ventilatieland.nl/static/uploads/pictures/original/other/gebruikershandleiding-hru-eco-350-uk8195012583091.pdf"] });
{ const I = ["Laat de installateur de aansluiting controleren en het onderdeel zo nodig vervangen."];
MODELS.push({ id: "itho-hru", brand: "Itho Daalderop", name: "HRU ECO WTW (300, 350)", cat: "ventilatie", years: "Alle bouwjaren", unit: null,
  intro: "De HRU ECO meldt zijn status met een led in groen, oranje en rood. Oranje knipperend betekent vuile filters. Rood met oranje is een storing; tel hoe vaak beide knipperen.", weak: ["Vuile filters.", "Verstopte condensafvoer."], parts: [["Filters G4 of F7", "G3 alleen bij levering; na 3 maanden vervangen"]],
  tasks: [{ m: 6, t: "F7-filter reinigen", s: "Vervangen na 12 maanden" }, { m: 9, t: "G4-filter reinigen", s: "Vervangen na 18 maanden" }, { m: 12, t: "Muggenfilter reinigen" }],
  faults: [
    N("Led knippert oranje", 1, "De filters zijn vuil.", ["Reinig of vervang de filters.", "Zet daarna de filterindicatie terug."]),
    N("Led knippert rood en oranje", 2, "Rood 1x + oranje 1x: afvoerventilator. Rood 1x + oranje 2x: toevoerventilator. Rood 2x + oranje 2x of 3x en rood 3x + oranje 1x: een temperatuursensor.", I),
    N("Led groen met oranje knipperend", 1, "Vorstmodus of bypassmodus; geen storing.", ["Niets doen; de unit keert vanzelf terug naar normaal."]),
    N("Unit lekt water", 1, "De condensafvoer is niet aangesloten of verstopt.", ["Maak de condensafvoer vrij en controleer de aansluiting."]),
    N("Koude lucht in huis", 1, "Vuil uitlaatfilter, verkeerd afgestelde ventielen, de bypassklep of een defecte sensor.", ["Reinig of vervang de filters.", "Blijft het? Laat de installateur ventielen en bypass controleren."]),
    N("Ventilator schakelt vanzelf", 1, "Een bediening van de buren is aangemeld.", ["Haal de stroom 15 seconden weg en meld je eigen bedieningen en sensoren opnieuw aan."])],
  src: ["ithoHru"] }); }
Object.assign(SRC,{ zehnderCA: ["Zehnder – handleiding ComfoAir 160/200/350 en Standard 300/375 (pdf via Ventilatieland)", "https://www.ventilatieland.be/static/uploads/pictures/pdf/zehnder-comfoair-standaard-instalatiehandleiding6257513808448.pdf"] });
MODELS.push({ id: "zehnder-comfoair", brand: "Zehnder", name: "ComfoAir 160, 200, 350 en Standard", cat: "ventilatie", years: "Alle bouwjaren", unit: null, also: "Oudere ComfoAir zonder Q",
  intro: "De oudere ComfoAir toont 'FiL' en 'tEr' bij vuile filters. Een knipperende A, E of EA met cijfers is een storingscode voor de installateur. Een losse A betekent 'Afwezig' en is geen storing. Trek de stekker er niet uit: dat geeft vocht en schimmel.", weak: ["Vuile filters."], parts: [], tasks: [{ w: "Als FiL tEr knippert", t: "Filters reinigen of vervangen en melding resetten" }],
  faults: [
    F("FiL tEr", "Filters vuil", 1, "Interne filtermelding.", ["Reinig of vervang de filters.", "Zet daarna de melding terug volgens de handleiding."]),
    F("A (met cijfers)", "Storingscode A met cijfers", 2, "Een A links met een of twee cijfers rechts.", ["Noteer de code en het toesteltype (typeplaatje bij de stroomaansluiting).", "Neem contact op met je installateur."]),
    F("E of EA (met cijfer)", "Storingscode E of EA met cijfer", 2, "Een E of EA links met een cijfer rechts.", ["Noteer de code en het toesteltype.", "Neem contact op met je installateur."])],
  src: ["zehnderCA"] });
Object.assign(SRC,{ haierKoel: ["Haier – foutcodes koelkast en vriezer (self-service, Engels)", "https://www.haier.com/ph/service-support/self-service/20161209_106153.shtml"] });
{ const SV = ["Uit- en aanzetten kan de code tijdelijk wissen, maar hij kan na een paar uur terugkomen.", "Vraag een monteur aan via de Haier-service."];
MODELS.push({ id: "haier-koelkast", brand: "Haier", name: "Koelkast en koel-vriescombinatie", cat: "koelkasten", years: "Alle bouwjaren", unit: null,
  intro: "Haier-koelkasten tonen een code als een sensor, ventilator of de ontdooiing een probleem heeft. dF betekent dat de koelkast ontdooit en is geen storing.", weak: [], parts: [], tasks: [],
  faults: [
    F("dF", "Ontdooien (geen storing)", 1, "De koelkast ontdooit.", ["Even wachten; de melding verdwijnt na het ontdooien."]),
    F("F1 / F2 / F3 / F4 / F5 / F6 / F7 / F8 / F9 / Fr / Eh", "Sensorfout", 2, "Een temperatuursensor geeft een fout.", SV),
    F("E0", "Communicatiefout", 2, "De besturing communiceert niet goed.", SV),
    F("E1 / E2 / E6 / E9", "Ventilatorfout", 2, "Een ventilator werkt niet goed.", SV),
    F("Er", "Fout in de ijsmaker", 2, "De ijsmaker werkt niet goed.", SV),
    F("Ec / Ed / Fd / Rd / Hd", "Ontdooifout", 2, "De automatische ontdooiing werkt niet goed.", SV)],
  src: ["haierKoel"] }); }
Object.assign(SRC,{ haierAirco: ["Haier – foutcodes airconditioner (self-service, Engels)", "https://www.haier.com/pk/service-support/self-service/20160120_103780.shtml"] });
{ const SV = ["Zet de airco uit.", "Neem contact op met de Haier-service of je installateur; dit kun je niet zelf verhelpen."];
MODELS.push({ id: "haier-airco", brand: "Haier", name: "Airconditioner (split)", cat: "airco", years: "Alle bouwjaren", unit: null, also: "Codes kunnen per model verschillen",
  intro: "Haier-airco's tonen een E- of F-code op de binnenunit. Volgens Haier kan alleen een servicemonteur deze storingen verhelpen: zet de airco uit en bel de service.", weak: [], parts: [], tasks: [{ m: 0.5, t: "Luchtfilters schoonmaken", v: true }],
  faults: [
    F("E1 / E2", "Temperatuursensor binnenunit", 2, "E1: kamertemperatuursensor, E2: leidingsensor.", SV),
    F("E4", "Geheugenfout binnenunit (EEPROM)", 2, "Fout in het geheugen van de besturing.", SV),
    F("E5", "Vorstbeveiliging binnenunit", 1, "De binnenunit beschermt zich tegen bevriezing.", SV),
    F("E7", "Communicatie tussen binnen- en buitenunit", 2, "De binnen- en buitenunit communiceren niet.", SV),
    F("E9", "Binnenunit overbelast bij verwarmen", 2, "Overbelasting in de verwarmingsstand.", SV),
    F("E14", "Ventilatormotor binnenunit", 2, "De ventilator van de binnenunit werkt niet goed.", SV),
    F("F1 / F2 / F22 / F23", "Beveiliging compressor of vermogensmodule", 3, "Overstroom- of IPM-beveiliging van compressor en module.", SV),
    F("F3 / F43", "Communicatie of modelcombinatie buitenunit", 2, "F3: communicatie tussen vermogensmodule en hoofdprint. F43: binnen- en buitenunit passen niet bij elkaar.", SV),
    F("F4 / F25", "Persgastemperatuur compressor", 3, "De temperatuur van het persgas is te hoog of de sensor is defect.", SV),
    F("F6 / F7 / F21", "Sensor buitenunit", 2, "F6: buitentemperatuur, F7: zuigleiding, F21: buitenspiraal.", SV),
    F("F8", "Ventilatormotor buitenunit", 2, "De ventilator van de buitenunit werkt niet goed.", SV),
    F("F13 / FE", "Te weinig koudemiddel of lek", 3, "Gebrek aan koudemiddel of een lekdetectiefout.", SV),
    F("F14", "Vierwegklep schakelt niet om", 2, "De klep die tussen koelen en verwarmen wisselt, werkt niet.", SV),
    F("F19", "Netspanning te hoog of te laag", 2, "Over- of onderspanningsbeveiliging.", SV),
    F("F20", "Hogedrukbeveiliging", 3, "De druk in het koelcircuit is te hoog.", SV)],
  src: ["haierAirco"] }); }
Object.assign(SRC,{ fujitsuWeekly: ["Fujitsu General – AC won't turn on and all three lights flash (Engels)", "https://assist.fujitsugeneral.com.au/support/solutions/articles/6000261508-ac-won-t-turn-on-and-all-three-lights-flash-a-few-times"] });
MODELS.push({ id: "fujitsu-airco", brand: "Fujitsu", name: "Airconditioner (split)", cat: "airco", years: "Alle bouwjaren", unit: null, also: "Geldt voor modellen met weektimer op de afstandsbediening",
  intro: "Knipperen bij een Fujitsu-airco alle drie de lampjes even en start hij niet? Volgens Fujitsu is dat meestal geen storing, maar staat de weektimer aan.", weak: [], parts: [], tasks: [{ m: 0.5, t: "Luchtfilters schoonmaken", v: true }],
  faults: [
    F("Drie lampjes knipperen", "Airco start niet, alle drie de lampjes knipperen kort", 1, "Meestal geen storing: de weektimer (WEEKLY) staat aan en blokkeert handmatig aanzetten.", ["Schuif of klap het klepje van de afstandsbediening open.", "Druk één keer op WEEKLY om de timer uit te zetten, of op RESET om alle instellingen te wissen.", "Controleer dat WEEKLY niet meer op het scherm staat.", "Druk op ON/OFF. De lampjes horen nu niet meer te knipperen.", "Blijft het? Zet de stroom van de airco 30 seconden uit en weer aan. Helpt dat niet, bel de Fujitsu-service of je installateur."])],
  src: ["fujitsuWeekly"] });
Object.assign(SRC,{ atagQ: ["ATAG – Q-serie handleiding (pdf, via De Groot Installatiegroep)", "https://de-groot.files.svdcdn.com/production/immens/Handleidingen/Immens-Atag-Q-serie.pdf"] });
{ const RS = ["Druk kort op de reset-toets. Doe dit één keer.", "Komt de melding terug? Niet zelf aan de ketel sleutelen: bel je installateur. Huur je? Meld het bij je verhuurder."];
MODELS.push({ id: "atag-q", brand: "ATAG", name: "Q-serie", cat: "cv-ketels", years: "Alle bouwjaren", unit: null, also: "Q25C, Q38C, Q51C en andere Q-modellen",
  intro: "De ATAG Q-serie toont waterdrukmeldingen (FILL, HIGH), tijdelijke blokkeringen en vaste errors. Bij blokkeringen en errors staat het nummer op de laatste twee posities van het display. Normale waterdruk: 1,5 tot 1,7 bar.", weak: [], parts: [], tasks: CV_TASKS,
  faults: [
    F("FILL knippert", "Waterdruk lager dan 1,0 bar", 1, "De ketel werkt nog, maar op maximaal 50% vermogen.", ["Vul de installatie bij tot 1,5–1,7 bar."]),
    F("FILL brandt", "Waterdruk lager dan 0,7 bar", 1, "De ketel is buiten bedrijf door te weinig water.", ["Vul de installatie bij tot 1,5–1,7 bar.", "Moet je vaak bijvullen? Laat de installateur naar een lek kijken."]),
    F("HIGH", "Waterdruk hoger dan 3,5 bar", 2, "De ketel is buiten bedrijf door te hoge druk.", ["Laat water af om de druk te verlagen, bijvoorbeeld via de aftapkraan van de installatie.", "Weet je niet hoe, of komt het terug? Bel je installateur."]),
    F("Blokkering 01", "Extern beveiligingscontact onderbroken", 2, "Een externe beveiliging die op de ketel is aangesloten, is onderbroken.", ["Laat de externe beveiliging controleren door je installateur."]),
    F("Blokkering 60", "Verkeerde instelling min- of max-vermogen", 2, "Het ingestelde vermogen klopt niet.", ["De installateur moet de instellingen controleren."]),
    F("Blokkering 67", "Temperatuurverschil aanvoer en retour", 1, "Verschil tussen aanvoer- en retoursensor terwijl de brander uit is.", ["Geen actie nodig: de blokkering verdwijnt vanzelf als het verschil weg is.", "Blijft hij staan? Bel je installateur."]),
    F("Blokkering 80", "Rookgastemperatuur te hoog", 2, "De maximale rookgastemperatuur is overschreden.", ["Geen actie nodig: de blokkering verdwijnt vanzelf als de temperatuur daalt.", "Komt hij vaak terug? Bel je installateur."]),
    F("Blokkering 81 / Blokkering 82", "Rookgassensor onderbroken of kortgesloten", 2, "81: de sensor is los geraakt, de brander is geblokkeerd. 82: kortsluiting in de sensor.", installer),
    F("Blokkering 85", "Geen waterstroming", 1, "De ketel ziet geen waterstroming en start automatisch met ontluchten.", ["Geen actie nodig: zodra er water stroomt, stopt de cyclus en start de brander weer.", "Blijft het terugkomen? Controleer de waterdruk en bel anders je installateur."]),
    F("Error 02", "Geen vlamvorming", 2, "De brander ontsteekt niet.", RS),
    F("Error 00", "Ten onrechte vlamvorming", 3, "De ketel ziet een vlam terwijl die er niet hoort te zijn.", RS),
    F("Error 01 / Error 12", "Kortsluiting in 24V-circuit", 3, "Kortsluiting in het 24-voltcircuit.", RS),
    F("Error 03", "Luchtkasttemperatuur te hoog", 3, "De temperatuur in de luchtkast is te hoog.", RS),
    F("Error 04 / Error 05 / Error 19", "Fout in de regeling of stuurautomaat", 3, "04: programmafout in de regeling. 05 en 19: fout in de stuurautomaat.", RS),
    F("Error 28", "Geen signaal van de ventilator", 3, "De ketel krijgt geen signaal van de ventilator.", RS)],
  src: ["atagQ"] }); }
Object.assign(SRC,{ vaillantWP: ["Vaillant UK – Heat pump fault codes (Engels)", "https://www.vaillant.co.uk/service/heat-pump-fault-codes/"] });
{ const IN = ["Druk één keer op de ronde resetknop op het bedieningspaneel; dat kan de storing soms (tijdelijk) opheffen.", "Komt de code terug? Bel je installateur of de Vaillant-service."];
  const EN = ["Dit kun je niet zelf verhelpen.", "Bel je installateur of de Vaillant-service."];
MODELS.push({ id: "vaillant-arotherm", brand: "Vaillant", name: "aroTHERM plus warmtepomp", cat: "warmtepompen", years: "Alle bouwjaren", unit: null, also: "Codes gelden voor Vaillant-warmtepompen met hetzelfde bedieningspaneel; check je handleiding",
  intro: "Vaillant-warmtepompen zoals de aroTHERM plus tonen een F-code. Vaillant deelt ze in: wat je zelf mag doen, wat eerst de installateur moet bekijken, en wat alleen een monteur mag oplossen. Een reset (ronde knop op het bedieningspaneel) kan een storing soms tijdelijk opheffen.", weak: [], parts: [],
  tasks: [{ m: 1, t: "Cv-druk controleren" }, { m: 12, t: "Onderhoud door de installateur" }],
  faults: [
    F("F.22", "Waterdruk te laag", 1, "De druk in het cv-circuit is onder 1 bar.", ["Weet je hoe het moet? Vul via de vulkraan bij tot 1 à 1,5 bar. Dit doe je op eigen risico.", "Lukt het niet of zakt de druk weer? Bel je installateur."]),
    F("F.539 / F.554", "Koudemiddeldruk te laag of buiten bereik", 2, "Vaak door veel ijs op de buitenunit of een bevroren condensafvoer.", ["Bij veel ijs of een bevroren condensafvoer mag je voorzichtig van buiten warmte toepassen op de achterkant van de unit of op de condensafvoer. Oververhit niets.", "Is er geen ijs, of komt de code terug? Bel je installateur."]),
    F("F.532", "Doorstroming cv-circuit te laag", 2, "Er stroomt te weinig water door het verwarmingscircuit.", IN),
    F("F.731", "Hogedrukschakelaar koudemiddel open", 2, "De druk in het koudemiddelcircuit was te hoog.", ["Druk één keer op reset.", "Komt de code direct terug? Dan moet een monteur komen."]),
    F("F.732 / F.737", "Compressor of condensatie te warm", 2, "F.732: uitlaattemperatuur compressor te hoog. F.737: condensatietemperatuur te hoog.", IN),
    F("F.733", "Verdampingstemperatuur te laag", 2, "De verdamper wordt te koud.", IN),
    F("F.752 / F.817", "Storing frequentieregelaar (inverter)", 2, "F.752: storing in de inverterprint. F.817: netspanning bij de inverter klopt niet; Vaillant kan voorrijkosten rekenen als de oorzaak niet in het toestel zit.", IN),
    F("F.788", "Storing cv-pomp", 2, "De pomp van het verwarmingscircuit werkt niet goed.", IN),
    F("F.1119", "Inschakelstroombegrenzer compressor", 2, "Storing in de begrenzer van de aanloopstroom van de compressor.", IN),
    F("F.1120", "Fase-uitval elektrisch element", 2, "Het elektrische bijverwarmingselement krijgt geen goede voeding.", IN),
    F("F.9998", "eBUS-communicatiefout", 2, "Onderdelen van het systeem communiceren niet met elkaar.", IN),
    F("F.42 / F.103", "Codeerweerstand of onderdeel", 3, "F.42: fout in de codeerweerstand. F.103: fout in een herkend reserveonderdeel.", EN),
    F("F.514 / F.520 / F.774 / F.703", "Sensorstoring", 3, "F.514: inlaattemperatuur compressor. F.520: aanvoertemperatuur cv. F.774: luchtinlaattemperatuur. F.703: lagedruksensor koudemiddel.", EN),
    F("F.536 / F.537 / F.729", "Compressor buiten bereik", 3, "F.536: uitlaattemperatuur te hoog. F.537: uitlaatdruk te hoog. F.729: uitlaattemperatuur te laag.", EN),
    F("F.583", "Aanvoertemperatuur cv te laag", 3, "Het water in het verwarmingscircuit blijft te koud.", EN),
    F("F.718", "Ventilator geblokkeerd", 3, "De ventilator van de buitenunit draait niet.", EN),
    F("F.753", "Inverter niet herkend", 3, "De frequentieregelaar wordt niet herkend of heeft een verbindingsfout.", EN)],
  src: ["vaillantWP"] }); }
Object.assign(SRC,{ radarOntlucht: ["Radar (AVROTROS) – Hoe moet je de verwarming ontluchten?", "https://radar.avrotros.nl/artikel/hoe-moet-je-de-verwarming-ontluchten-29929"] });
MODELS.push({ id: "radiator-wordt-niet-warm", brand: "Alle merken", name: "Radiator wordt niet warm of tikt", cat: "cv-ketels", years: "Alle bouwjaren", unit: null,
  intro: "Wordt een radiator niet goed warm, of hoor je tikken of stromend water? Meestal zit er lucht in de installatie. Ontluchten doe je zelf met een ontluchtingssleuteltje en een doekje.", weak: [], parts: [],
  tasks: [{ m: 12, t: "Radiatoren ontluchten", v: 1 }, { m: 1, t: "Cv-druk controleren", v: 1, s: "Na ontluchten tussen 1,5 en 2 bar." }],
  faults: [
    N("Radiator blijft koud of wordt half warm, of tikt en klotst", 1, "Lucht in de radiator of leidingen.", ["Draai de kranen van alle radiatoren helemaal open.", "Zet de thermostaat op 25 graden.", "Zet de thermostaat na 10 minuten zo laag mogelijk.", "Draai na nog eens 10 minuten de radiatorkranen dicht.", "Ontlucht per radiator, te beginnen bij de laagste in huis: houd een doekje onder het ontluchtingskraantje (bovenaan, meestal naast de draaiknop) en draai het voorzichtig open. Draai het dicht zodra er water uitkomt.", "Open de radiatorkraan weer en zet de thermostaat op de gewenste temperatuur.", "Controleer de waterdruk van de cv: die hoort tussen 1,5 en 2 bar te liggen. Te laag? Vul bij volgens de handleiding van je ketel."]),
    N("Radiator heeft geen ontluchter bovenaan", 1, "Niet elke radiator heeft een eigen ontluchtingskraantje.", ["Volg de cv-leiding naar een radiator die je wel kunt ontluchten.", "Let op: het kraantje onderaan is een aftapkraan, geen ontluchter."]),
    N("Je moet vaak bijvullen", 2, "Er kan een lekkage zijn.", ["Controleer alle radiatoraansluitingen op lekken.", "Vind je niets? Vraag je installateur om hulp. Huur je? Meld het bij je verhuurder."]),
    N("Installatie tikt, ook na ontluchten", 1, "Metaal dat krimpt en uitzet, loszittende beugels of knellende leidingen.", ["Controleer of beugels en leidingen vastzitten.", "Is de verwarming nieuw? Neem contact op met de installateur."])],
  src: ["radarOntlucht"] });
Object.assign(SRC,{ beheer365: ["365Beheer – Ik heb geen warm water / de verwarming wordt niet warm", "https://365beheer.nl/en/help/ik-heb-geen-warm-water-de-verwarming-wordt-niet-warm/"] });
MODELS.push({ id: "cv-ketel-geen-warm-water", brand: "Alle merken", name: "Geen warm water of verwarming", cat: "cv-ketels", years: "Alle bouwjaren", unit: null, also: "Nefit, Remeha, Intergas, Vaillant, ATAG en andere combiketels",
  intro: "Komt er geen warm water uit de kraan, of wordt de verwarming niet warm? Loop eerst deze controles langs voordat je de installateur of verhuurder belt.", weak: [], parts: [], tasks: [],
  faults: [
    N("Geen verwarming én geen warm water", 2, "De combiketel staat uit of heeft een storing.", ["Controleer of de ketel stroom heeft (stekker, groep in de meterkast) en of de gaskraan open staat.", "Kijk of er een foutcode op het display staat en zoek die op bij het merk van je ketel.", "Was de stroom even weg? Reset de ketel één keer.", "Controleer de waterdruk: die hoort tussen 1,5 en 2 bar te liggen. Te laag? Vul zelf bij.", "Lukt het niet? Bel je installateur. Huur je? Meld het bij je verhuurder."]),
    N("Alleen koud water uit kraan of douche", 2, "Heb je een aparte boiler of warmwatertoestel, dan zit het probleem mogelijk daar.", ["Controleer of het warmwatertoestel stroom heeft en of er een foutcode staat.", "Lukt het niet? Bel je installateur of meld het bij je verhuurder."]),
    N("Beneden warm, boven blijven radiatoren koud", 1, "Vaak te lage waterdruk.", ["Controleer de waterdruk en vul bij tot 1,5–2 bar.", "Helpt dat niet? Ontlucht de radiatoren boven."]),
    N("Bovenkant van de radiator blijft koud", 1, "Er zit lucht in de radiator.", ["Ontlucht de radiator. Hoe dat gaat, lees je op de pagina Radiator wordt niet warm of tikt.", "Controleer daarna de waterdruk."])],
  src: ["beheer365"] });
Object.assign(SRC,{ cbVriezer: ["Coolblue – tips als je vriezer niet goed vriest (Engels)", "https://www.coolblue.nl/en/advice/tips-if-your-freezer-isnt-working-properly.html"], cbNoFrost: ["Coolblue – ijsvorming bij No Frost oplossen", "https://www.coolblue.nl/advies/hoe-los-je-ijsvorming-bij-no-frost-op.html"] });
MODELS.push(G("vriezer-vriest-niet-goed", "Vriezer vriest niet goed of zit vol ijs", "koelkasten", "Wordt je vriezer niet koud genoeg, of groeit er ijs, zelfs in een No Frost-vriezer? Meestal ligt het aan de instelling, de plek of de deurrubbers. Loop deze punten langs.", [
  N("Vriezer wordt niet koud genoeg", 1, "Verkeerde temperatuur, deur te vaak open, of een te warme of te koude plek.", ["Zet de vriezer op -18 °C.", "Open de deur minder vaak en korter.", "Zet de vriezer niet in de zon of naast een radiator of andere warmtebron. Kijk in de handleiding welke omgevingstemperatuur hij aankan.", "Laat minstens 5 cm ruimte vrij aan de achterkant en zijkanten."]),
  N("Dikke ijslaag in een gewone vriezer", 1, "IJs maakt vriezen moeilijker en kost extra stroom.", ["Ontdooi een Low Frost-vriezer ongeveer twee keer per jaar.", "Ontdooi een vriezer zonder anti-ijsfunctie ongeveer zes keer per jaar."]),
  N("IJsvorming in een No Frost-vriezer", 1, "Te weinig ventilatieruimte, stof op de condensor, versleten deurrubbers, geblokkeerde ventilatiegaten of een losse wateraansluiting.", ["Houd minstens 5 cm vrij aan de zijkanten en 10 cm aan de achterkant.", "Verwijder stof van het rooster (condensor) met een stofdoek of stofzuiger.", "Test de deurrubbers: schijn met een zaklamp langs de gesloten deur. Zie je licht, vervang dan de rubbers.", "Haal alles weg wat tegen de ventilatiegaten binnenin staat.", "Heb je een ijs- of waterdispenser? Draai de aansluiting op de kraan goed vast. Is hij niet aangesloten, gebruik dan de ice-off-knop."]),
  N("Stof op de condensor", 1, "Bij vriezers met een open condensor (rooster achterop) houdt stof de warmte vast.", ["Zet de vriezer uit.", "Maak de condensor schoon met een zachte borstel of doek.", "Zet de vriezer weer aan en houd 5 cm ruimte vrij."])],
  ["cbVriezer", "cbNoFrost"], { also: "Samsung, LG, Bosch, Siemens, Liebherr, AEG, Beko, Whirlpool", tasks: [{ m: 6, t: "Condensor stofvrij maken", v: 1 }, { m: 6, t: "Vriezer ontdooien (zonder No Frost)", v: 1 }] }));
Object.assign(SRC,{ bekoOven: ["Beko – oven wordt niet warm", "https://www.beko.com/be-nl/Ondersteuning/oven--problemen-oplossen--artikel/hoe-kan-ik-een-over-die-niet-warm-wordt-repareren"] });
MODELS.push(G("oven-wordt-niet-warm", "Oven wordt niet warm", "ovens", "Gaat het lampje aan, maar wordt je oven niet warm? Vaak is het een instelling. Check eerst deze punten voordat je een monteur belt.", [
  N("Oven doet niets of wordt niet warm", 1, "Geen stroom, geen functie of temperatuur gekozen, of de timer is niet ingesteld.", ["Controleer of de oven op een werkend stopcontact is aangesloten.", "Kies een bereidingsfunctie en een temperatuur en zet de oven opnieuw aan.", "Heeft je oven een timer? Stel dan een bereidingstijd in. Let op: bij ovens met magnetronfunctie regelt de timer alleen de magnetrontijd.", "Wordt hij nog steeds niet warm? Neem contact op met een erkend servicebedrijf."])],
  ["bekoOven"], { also: "Beko, AEG, Bosch, Siemens, Samsung, Zanussi, Miele, Whirlpool" }));
Object.assign(SRC,{ bekoMagWarm: ["Beko – magnetron verwarmt voedsel niet", "https://www.beko.com/nl-nl/ondersteuning/magnetron--problemen-oplossen--artikel/wat-moet-ik-doen-als-de-magnetron-voedsel-niet-verwarmt"], bekoMagWerkt: ["Beko – magnetron werkt niet", "https://www.beko.com/nl-nl/ondersteuning/magnetron--problemen-oplossen--artikel/wat-moet-ik-doen-als-mijn-magnetron-niet-werkt"] });
MODELS.push(G("magnetron-werkt-niet", "Magnetron werkt niet of wordt niet warm", "ovens", "Start je magnetron niet, of blijft het eten koud? Check eerst stroom, deur en tijd. Open de behuizing van een magnetron nooit zelf.", [
  N("Magnetron start niet", 1, "Geen stroom, de deur is niet goed dicht, of het apparaat is gestopt na bijvoorbeeld een lage spanning.", ["Controleer of de magnetron op een werkend stopcontact is aangesloten.", "Sluit de deur goed: met een open deur start hij niet.", "Haal de stekker uit het stopcontact, wacht tien seconden en steek hem er weer in.", "Blijft het probleem? Neem contact op met een erkend servicebedrijf."]),
  N("Magnetron draait, maar eten wordt niet warm", 2, "De bereidingstijd is te kort, of er is een technisch defect.", ["Controleer of de deur goed dicht is.", "Stel een langere bereidingstijd in.", "Blijft het eten koud? Neem contact op met een erkend servicebedrijf."])],
  ["bekoMagWerkt", "bekoMagWarm"], { also: "Beko, Samsung, Panasonic, Whirlpool, Bosch, Siemens, AEG, Sharp" }));
Object.assign(SRC,{ bekoGasWerkt: ["Beko – gaskookplaat werkt niet", "https://www.beko.com/nl-nl/ondersteuning/kookplaat--problemen-oplossen--artikel/wat-moet-ik-doen-als-mijn-gaskookplaat-niet-werkt"], bekoGasVlam: ["Beko – flakkerende of uitgaande vlammen voorkomen", "https://www.beko.com/nl-nl/ondersteuning/kookplaat--problemen-oplossen--artikel/hoe-kan-ik-flakkerende-of-uitgaande-vlammen-in-een-gaspit-voorkomen"] });
MODELS.push(G("gaskookplaat-werkt-niet", "Gaskookplaat ontsteekt niet of vlam gaat uit", "kookplaten", "Klikt je gaspit niet, ontsteekt hij niet of flakkert de vlam? Vaak zit er vuil of vocht in de brander, of ligt de deksel scheef. Ruik je gas? Gebruik de kookplaat niet en bel direct 0800-9009.", [
  N("Je hoort geen klik bij het ontsteken", 2, "Er komt waarschijnlijk geen stroom bij de ontsteking.", ["Controleer of andere apparaten en lampen in huis werken.", "Is er wel stroom? Dan kan de zekering van het apparaat defect zijn. Schakel een erkend elektricien in."]),
  N("Wel een klik, maar de pit ontsteekt niet", 2, "Vuile, natte of beschadigde ontstekers en branders, of geen gastoevoer.", ["Maak de branders en branderdeksels schoon en droog alles goed na; vocht na het schoonmaken blokkeert het ontsteken.", "Controleer of de ontstekers niet verbogen of gebroken zijn, bijvoorbeeld door een zware pan.", "Controleer of de gastoevoer open is (gasnet of gasfles).", "Vermoed je een gasstoring? Gebruik de kookplaat niet en schakel een erkend installateur in."]),
  N("Vlam flakkert, brandt ongelijk of gaat uit", 1, "Branderkelk of deksel ligt scheef, verstopte of natte gaatjes, tocht, of de kookplaat past niet bij de gassoort.", ["Controleer of elke pit de juiste branderkelk en deksel heeft en of ze recht liggen.", "Zet het gas uit en laat de deksel afkoelen.", "Maak de gaatjes van de brander voorzichtig schoon met een speld, zonder ze te vervormen.", "Zorg dat de kookplaat niet in de tocht staat.", "Controleer of de kookplaat is ingesteld op jouw gassoort (aardgas of gasfles).", "Blijft het? Neem contact op met een erkend servicebedrijf."])],
  ["bekoGasWerkt", "bekoGasVlam"], { also: "Beko, AEG, Bosch, Siemens, Smeg, ATAG, Whirlpool" }));
Object.assign(SRC,{ bekoKoelDraait: ["Beko – koelkast blijft draaien", "https://www.beko.com/nl-nl/ondersteuning/koel-vriescombinatie--problemen-oplossen--artikel/wat-moet-ik-doen-als-mijn-koelkast-blijft-draaien-koelen"], bekoKoelWerkt: ["Beko – koelkast werkt niet", "https://www.beko.com/nl-nl/ondersteuning/koel-vriescombinatie--problemen-oplossen--artikel/wat-moet-ik-doen-als-mijn-koelkast-niet-werkt"], bekoKoelBevriest: ["Beko – etenswaren bevriezen in de koelkast", "https://www.beko.com/be-nl/Ondersteuning/help-centrum/koelvriescombinatie/problemen-oplossen/artikel/hoe-kan-ik-voorkomen-dat-etenswaren-in-de-koelkast-bevroren-raken"] });
const KK = "Samsung, LG, Bosch, Siemens, Liebherr, AEG, Beko, Whirlpool, Haier";
MODELS.push(
G("koelkast-blijft-draaien", "Koelkast blijft draaien", "koelkasten", "Hoor je je koelkast of vriezer bijna continu draaien? Dat is soms normaal, bijvoorbeeld net na het installeren of bijvullen. Blijft het, loop dan deze oorzaken langs.", [
  N("Koelkast of vriezer slaat bijna niet af", 1, "Warme plek, deur vaak of lang open, warm eten erin, lekkende deurrubbers, te koude instelling, ijs in het vriesvak of Fast Freeze staat aan.", ["Net geïnstalleerd of vol gezet met boodschappen? Dan is langer draaien normaal.", "Zet de koelkast niet naast een radiator, kookplaat of oven.", "Open de deur minder vaak en zorg dat niets de deur tegenhoudt.", "Laat warme gerechten eerst afkoelen.", "Controleer de deurrubbers op scheuren en maak ze schoon met een zachte doek en warm water. Kapot of los? Laat ze vervangen door een erkend servicebedrijf.", "Zet de koelkast op 4 à 5 °C en het vriesvak op ongeveer -18 °C.", "Zit er een ijslaag in het vriesvak? Ontdooi het (niet nodig bij NoFrost).", "Zet Fast Freeze uit als je het niet nodig hebt."])],
  ["bekoKoelDraait"], { also: KK }),
G("koelkast-werkt-niet", "Koelkast werkt niet of koelt niet", "koelkasten", "Doet je koelkast helemaal niets, of koelt hij nauwelijks? Begin bij de stroom en de instelling en werk dan de lijst af.", [
  N("Koelkast doet helemaal niets", 2, "Geen stroom of een defecte zekering.", ["Controleer of lampen en andere apparaten in huis werken.", "Werkt de rest wel? Dan kan de zekering defect zijn: laat een erkend elektricien kijken."]),
  N("Koelkast staat aan maar koelt (bijna) niet", 1, "Temperatuurknop staat uit of te warm, te warme ruimte, lekkende rubbers, te vol of vuile condensor.", ["Zoek de temperatuurknop op in de handleiding. Stel de koelkast in op 4 à 5 °C en het vriesvak op ongeveer -18 °C.", "Staat hij in een garage of onverwarmde ruimte? Dan kan hij slecht werken: zet hem ergens anders.", "Trek de deurrubbers voorzichtig los met je vingers en kijk of er spleten blijven. Laat ze dan vervangen.", "Haal spullen weg die de luchtstroom blokkeren, vooral bij de ventilatieopeningen.", "Stekker eruit en maak de condensor achter- of onderop schoon met een zachte borstel of stofzuigerborstel op lage stand.", "Helpt niets? Neem contact op met een erkend servicebedrijf."])],
  ["bekoKoelWerkt"], { also: KK }),
G("koelkast-bevriest-eten", "Eten bevriest in de koelkast", "koelkasten", "Bevriezen groente, drinken of zuivel in je koelkast? Meestal staat hij te koud of ligt het eten te dicht bij de luchtuitlaat.", [
  N("Etenswaren bevriezen in het koelgedeelte", 1, "Te koude instelling, eten voor de luchtuitlaten bovenin, of een technisch probleem.", ["Stel de koelkast in op 4 à 5 °C en het vriesvak op ongeveer -18 °C.", "Leg gevoelig eten niet op de bovenste plank vlak voor de luchtuitlaten.", "Meet de echte temperatuur: zet een thermometer in een kopje water in de koelkast. In het vriesvak gebruik je alcohol of bakolie in plaats van water.", "Wijkt de gemeten temperatuur af van de instelling? Neem contact op met een erkend servicebedrijf."])],
  ["bekoKoelBevriest"], { also: KK }));
Object.assign(SRC,{ bekoVaatLekt: ["Beko – vaatwasser lekt", "https://www.beko.com/nl-nl/ondersteuning/Vaatwasmachine--problemen-oplossen--artikel/wat-moet-ik-doen-als-mijn-vaatwasmachine-lekt"], bekoVaatSchuim: ["Beko – vaatwasser schuimt te veel", "https://www.beko.com/nl-nl/ondersteuning/Vaatwasmachine--problemen-oplossen--artikel/wat-moet-ik-doen-als-mijn-vaatwasmachine-te-veel-schuimt"], bekoVaatKras: ["Beko – krassen op vaat voorkomen", "https://www.beko.com/nl-nl/ondersteuning/Vaatwasmachine--problemen-oplossen--artikel/hoe-kan-ik-krassen-op-vaat-in-de-vaatwasmachine-voorkomen"] });
const VW = "Bosch, Siemens, Miele, AEG, Beko, Samsung, LG, Whirlpool, ATAG, Etna";
MODELS.push(
G("vaatwasser-lekt", "Vaatwasser lekt", "vaatwassers", "Ligt er water onder of voor je vaatwasser? Kijk eerst naar de deur en de aansluitingen; die kun je meestal zelf controleren.", [
  N("Water voor de vaatwasser (bij de deur)", 1, "Losse of scheve scharnieren, of een beschadigde of gescheurde deurafdichting.", ["Kijk of de scharnieren los zitten of scheef staan.", "Controleer het deurrubber op scheuren of beschadiging. Is het kapot? Laat het vervangen door een erkend servicebedrijf."]),
  N("Water achter of onder de vaatwasser", 1, "Een losse afvoerslang, toevoerslang of koppeling.", ["Kijk aan de achterkant en in het keukenkastje onder de gootsteen of de afvoer, de waterslang en de koppelingen goed vastzitten.", "Draai losse aansluitingen vast met passend gereedschap.", "Heeft je vaatwasser een lekbeveiliging (bij Beko heet dat WaterSafe)? Die sluit het water automatisch af bij een lek."]),
  N("Lek zonder zichtbare oorzaak", 3, "Waarschijnlijk de afdichting bij motor of pomp.", ["Deze onderdelen zitten diep in de machine: laat dit door een erkend servicebedrijf doen."])],
  ["bekoVaatLekt"], { also: VW }),
G("vaatwasser-schuimt", "Vaatwasser schuimt", "vaatwassers", "Schuim in de vaatwasser komt bijna altijd door verkeerd of gemorst middel. Zo voorkom je het.", [
  N("Schuim in de vaatwasser of ervoor op de vloer", 1, "Gewoon afwasmiddel in de machine, resten handafwasmiddel op de vaat of gemorst glansspoelmiddel.", ["Gebruik alleen middel dat speciaal voor vaatwassers is.", "Spoel etensresten af met stromend water, zonder afwasmiddel; een vork of borstel mag.", "Veeg gemorst glansspoelmiddel op met keukenpapier.", "Sluit de dop van het glansspoelmiddelbakje goed na het bijvullen."])],
  ["bekoVaatSchuim"], { also: VW }),
G("vaatwasser-krassen-op-glas", "Krassen of dof glas uit de vaatwasser", "vaatwassers", "Krassen op glas of vaat komen door verkeerd inladen, de verkeerde zout- of hardheidsinstelling, gemorst zout of vaat die niet vaatwasserbestendig is.", [
  N("Krassen, dof glas of beschadigde vaat", 1, "Gevoelige vaat, verkeerde zoutdosering of waterhardheid, gemorst zout, verkeerd inladen, te veel middel of ongeschikte producten.", ["Zoek je waterhardheid op en stel de waterhardheid en zoutdosering in volgens de handleiding. Bij zacht water (onder 5 °dH) gebruik je geen zout.", "Vul zout bij met het trechtertje, veeg gemorst zout op en draai de dop goed dicht.", "Draai na het bijvullen van zout een kort programma of voorspoelprogramma om gemorst zout weg te spoelen.", "Laad de vaat schuin en zo dat niets elkaar of de sproeiarmen raakt. Doe er niet te veel tegelijk in.", "Doseer volgens de markeringen in het zeepbakje.", "Gebruik alleen vaatwasmiddel, glansspoelmiddel en zout voor vaatwassers; geen afwasmiddel, handzeep, bleek of azijn.", "Kijk of je vaat (aluminium, sommige glazen en porselein) wel in de vaatwasser mag."])],
  ["bekoVaatKras"], { also: VW }));
Object.assign(SRC,{ bekoDroogStart: ["Beko – wasdroger start niet", "https://www.beko.com/nl-nl/ondersteuning/wasdroger--problemen-oplossen--artikel/wat-moet-ik-doen-als-mijn-wasdroger-niet-start"], bekoDroogStopt: ["Beko – wasdroger stopt halverwege", "https://www.beko.com/nl-nl/ondersteuning/wasdroger--problemen-oplossen--artikel/wat-moet-ik-doen-als-mijn-wasdroger-halverwege-een-cyclus-stopt"] });
MODELS.push(G("droger-start-niet", "Droger start niet of stopt halverwege", "drogers", "Start je droger niet, of stopt hij midden in het programma? Vaak is het de deur, het kinderslot of een volle condenswaterbak.", [
  N("Display blijft donker", 2, "Geen stroom of een defecte zekering.", ["Controleer of lampen en andere apparaten in huis werken.", "Werkt de rest wel? Laat de zekering of groep controleren door een erkend elektricien."]),
  N("Display aan, maar de droger start niet", 1, "De deur is niet goed dicht of het kinderslot staat aan.", ["Haal wasgoed uit de deuropening en duw de deur dicht tot je een klik hoort.", "Brandt het lampje van het kinderslot? Zet het uit volgens je handleiding; vaak houd je twee knoppen drie seconden samen ingedrukt."]),
  N("Droger stopt halverwege het programma", 1, "Volle condenswaterbak, een kapotte aandrijfriem of een spanningspiek.", ["Leeg de condenswaterbak (na elke droogbeurt, tenzij de droger op de afvoer zit) en spoel pluis eraf onder de warme kraan.", "Draai de trommel met de hand. Voel je geen weerstand? Dan is de riem mogelijk kapot: bel een erkend servicebedrijf.", "Haal de stekker eruit, wacht een minuut, steek hem terug en start opnieuw.", "Helpt niets? Neem contact op met een erkend servicebedrijf."])],
  ["bekoDroogStart", "bekoDroogStopt"], { also: "Beko, Bosch, Siemens, Miele, AEG, Samsung, LG, Whirlpool, Haier" }));
Object.assign(SRC,{ bekoWasStopt: ["Beko – wasmachine stopt halverwege de wasbeurt", "https://www.beko.com/be-nl/Ondersteuning/wasmachine--problemen-oplossen--artikel/wat-moet-ik-doen-als-mijn-wasmachine-halverwege-de-wasbeurt-stopt"], bekoWasSchimmel: ["Beko – zwarte schimmel in de wasmiddellade voorkomen", "https://www.beko.com/be-nl/Ondersteuning/wasmachine--reinigen--artikel/hoe-kan-ik-zwarte-schimmel-in-de-wasmiddellade-van-de-wasmachine-voorkomen"], bekoWasStug: ["Beko – voorkomen dat kleding stug wordt", "https://www.beko.com/be-nl/Ondersteuning/wasmachine--gebruiken--artikel/hoe-kan-voorkomen-dat-kleding-stug-wordt-in-de-wasmachine"] });
const WM = "Samsung, LG, Bosch, Siemens, Miele, AEG, Beko, Whirlpool, Haier";
MODELS.push(
G("wasmachine-stopt-halverwege", "Wasmachine stopt halverwege", "wasmachines", "Stopt je wasmachine midden in het programma, vaak vlak voor het centrifugeren? Meestal ligt de was scheef, blijft er water staan of is er te veel schuim.", [
  N("Wasmachine stopt voor of tijdens het centrifugeren", 1, "Was ligt ongelijk verdeeld, er staat nog water in de trommel, of er is te veel schuim.", ["Laat het water weglopen, verdeel de was opnieuw over de trommel en start het programma opnieuw.", "Zet de machine uit en controleer de afvoerslang en het pompfilter op verstoppingen. Vervang lekkende of kapotte slangen.", "Maak het pompfilter elke drie maanden schoon.", "Gebruik niet meer wasmiddel dan op de verpakking staat."]),
  N("Trommel draait met de hand zonder weerstand", 3, "De aandrijfriem is mogelijk beschadigd of gebroken.", ["Neem contact op met een erkend servicebedrijf."])],
  ["bekoWasStopt"], { also: WM, tasks: [{ m: 3, t: "Pompfilter schoonmaken" }] }),
G("wasmiddellade-schimmel", "Zwarte schimmel in de wasmiddellade", "wasmachines", "Zwarte aanslag of schimmel in het zeepbakje ontstaat door vocht, verstopte openingen, druppelende kleppen of te veel middel. Zo maak je het schoon en voorkom je het.", [
  N("Zwarte schimmel of aanslag in het zeepbakje", 1, "Natte lade of vochtig wasmiddel, verstopte openingen, kleppen die druppelen, gemengd wasmiddel en verzachter, te veel middel of capsules in de lade.", ["Zet de machine uit, haal de lade eruit en maak alle openingen schoon, vooral in het vak voor de hoofdwas.", "Zorg dat de lade droog is voordat je hem vult, en bewaar wasmiddel goed afgesloten.", "Houd wasmiddel en wasverzachter in hun eigen vak. Gemengd? Spoel de lade met lauwwarm water.", "Doseer volgens de verpakking.", "Leg wascapsules in de trommel, niet in de lade.", "Blijven de kleppen druppelen na schoonmaken? Neem contact op met een erkend servicebedrijf.", "Maak de wasmachine regelmatig schoon."])],
  ["bekoWasSchimmel"], { also: WM }),
G("was-wordt-stug", "Was wordt stug of hard", "wasmachines", "Komen handdoeken en kleding stug uit de machine? Meestal blijft er wasmiddel in de was achter. Zo los je het op.", [
  N("Kleding en handdoeken voelen stug", 1, "Achtergebleven wasmiddel, te veel of verkeerd middel, verkeerd vakje, gemengd met verzachter, te volle trommel of hard water.", ["Gebruik niet meer dan de aanbevolen dosis en check of het middel geschikt is voor je machine.", "Bij Beko en veel andere machines: gebruik vakje I alleen bij een voorwas, vakje II voor de hoofdwas en het middelste vakje voor wasverzachter.", "Houd wasmiddel en wasverzachter gescheiden.", "Stop de trommel niet te vol; de maximale lading per programma staat in de handleiding.", "Heb je hard water? Doseer dan wat hoger volgens de verpakking."])],
  ["bekoWasStug"], { also: WM }));
Object.assign(SRC,{ anwbLaadt: ["ANWB – Elektrische auto laadt niet op", "https://www.anwb.nl/auto/elektrisch-rijden/opladen/elektrische-auto-laadt-niet-op"] });
MODELS.push(G("auto-laadt-niet-op", "Elektrische auto laadt niet op", "laadpalen", "Start het laden niet, thuis of aan een publieke paal? Vier dingen kun je zelf controleren: laadpas, kabel, paal en de laadinstellingen van je auto. Kijk voor een thuislaadpaal ook bij Laadpaal resetten.", [
  N("Laden start niet na aanmelden", 1, "Verkeerde laadpas of niet goed aangemeld.", ["Gebruik de juiste laadpas en houd hem goed tegen de lezer.", "Let op een piepje of een blauw lampje: dan is de sessie gestart."]),
  N("Kabel aangesloten, maar er gebeurt niets", 1, "Kabel zit niet goed vast, of kabel of stekker is beschadigd.", ["Controleer of de kabel goed vastzit aan de auto én aan de paal. De volgorde van aansluiten maakt niet meer uit.", "Kijk of de kabel of stekker beschadigd is. Gebruik een beschadigde kabel niet.", "Past de stekker? Dan kun je in principe laden, ook als de tekst op de paal iets anders suggereert."]),
  N("Laadpaal heeft een storing", 2, "De paal zelf werkt niet.", ["Probeer een andere laadpaal als dat kan.", "Thuislaadpaal? Herstart hem volgens de stappen op de pagina Laadpaal resetten, of bel de leverancier."]),
  N("Auto start pas 's nachts met laden", 1, "Uitgesteld laden (bijvoorbeeld voor nachttarief) staat aan in de auto.", ["Kijk in de laadinstellingen van je auto of uitgesteld of gepland laden aan staat, en zet het uit als je nu wilt laden."]),
  N("Niets helpt", 3, "Software, een defect onderdeel of de stroomvoorziening; dat kun je vaak niet zelf vaststellen.", ["Neem contact op met de leverancier van de laadpaal of de dealer van je auto.", "Strand je onderweg? Pechhulp zoals de ANWB Wegenwacht heeft mobiele opladers."])],
  ["anwbLaadt"], { also: "Alle elektrische auto's en laadpalen" }));
Object.assign(SRC,{ bekoAircoKoelt: ["Beko – airconditioning koelt niet", "https://www.beko.com/nl-nl/ondersteuning/airconditioner--problemen-oplossen--artikel/wat-moet-ik-doen-als-mijn-airconditioning-niet-koelt"], bekoAircoLekt: ["Beko – binnenunit airco lekt", "https://www.beko.com/nl-nl/ondersteuning/airconditioner--problemen-oplossen--artikel/wat-moet-ik-doen-als-mijn-indoor-airconditioning-unit-lekt"], bekoAircoZwak: ["Beko – airco blaast minder hard", "https://www.beko.com/be-nl/Ondersteuning/help-centrum/airconditioner/problemen-oplossen/veelgestelde-vragen/de-airconditioning-blaast-niet-zo-hard-als-voorheen-hoe-kan-ik-een-airconditioning-met-een-zwakke-luchtstroom-repareren"] });
MODELS.push(G("airco-koelt-niet", "Airco koelt niet, blaast zwak of lekt", "airco", "Koelt je airco niet goed, blaast hij zwakker dan vroeger of druppelt de binnenunit? Vaak zijn het de filters of een instelling. Het koelcircuit en de condensor laat je over aan een erkend bedrijf.", [
  N("Airco koelt niet of nauwelijks", 1, "Verkeerde temperatuur of modus, vuile filters, geblokkeerde luchtopeningen, open ramen of een te grote of te warme ruimte.", ["Zet de temperatuur lager dan de kamertemperatuur.", "Kies de stand koelen; in de ventilatorstand koelt hij niet.", "Maak de filters schoon volgens de handleiding.", "Haal gordijnen en spullen weg voor de luchtopeningen en maak de in- en uitlaat schoon, ook bij de buitenunit.", "Sluit ramen en deuren.", "Bij warm, vochtig weer duurt afkoelen langer; een turbo- of jetstand kan helpen.", "Koelt hij nog steeds niet? Mogelijk te weinig koudemiddel, een vuile condensor of een installatiefout: laat een erkend bedrijf kijken."]),
  N("Airco blaast zwakker dan vroeger", 1, "Vuil in de filters, condensor of condensorspoelen.", ["Maak de filters schoon; vuistregel is elke drie maanden.", "Laat een vuile condensor reinigen door een erkend bedrijf."]),
  N("Water druppelt uit de binnenunit", 2, "Vuile filters, een losse of geknikte condensafvoer, of een installatiefout.", ["Zet de airco uit.", "Maak de filters schoon.", "Controleer of de condensafvoer vastzit, schuin naar beneden loopt en geen knik heeft.", "Blijft hij lekken? Laat de installatie controleren door een erkend bedrijf."])],
  ["bekoAircoKoelt", "bekoAircoZwak", "bekoAircoLekt"], { also: "Daikin, Mitsubishi, Samsung, LG, Haier, Fujitsu, Toshiba, Beko", tasks: [{ m: 3, t: "Luchtfilters schoonmaken" }] }));
Object.assign(SRC,{ feenstraMV: ["Feenstra – mechanische ventilatie maakt lawaai", "https://feenstra.com/ventilatie/mechanische-ventilatie-problemen/maakt-lawaai"] });
MODELS.push(G("mechanische-ventilatie-maakt-lawaai", "Mechanische ventilatie maakt lawaai", "ventilatie", "Bromt, zoemt of ruist je mechanische ventilatie door het hele huis? Het geluid komt van de ventilatiebox of uit de luchtkanalen. Welke van de twee bepaalt de oplossing.", [
  N("Brommend of zoemend geluid", 2, "Meestal de ventilatiebox zelf, vooral bij oudere modellen. De kanalen dragen het geluid door het huis.", ["Controleer of de box vrij hangt of staat en geen muur of vloer raakt.", "Is de box oud? Laat hem vervangen door een stillere unit; dat is vaak de eenvoudigste oplossing."]),
  N("Ruisen, tikken of geluid uit de ventielen", 2, "De luchtkanalen versterken en verspreiden geluid, soms tot bij de buren.", ["Laat de kanalen isoleren en voorzien van geluiddempers door een vakbedrijf."]),
  N("Geluid voorkomen", 1, "Een goede plaatsing en onderhoud houden de installatie stil.", ["Laat de box vrijstaand plaatsen, liefst in een aparte ruimte ver van woon- en slaapkamers.", "Laat periodiek onderhoud uitvoeren.", "Huur je? Meld geluidsklachten bij je verhuurder."])],
  ["feenstraMV"], { also: "Itho Daalderop, Zehnder, Brink, Orcon, Vent-Axia" }));
Object.assign(SRC,{ cbHalfKop: ["Coolblue – te weinig koffie oplossen", "https://www.coolblue.nl/advies/hoe-los-ik-het-probleem-van-halve-kopjes-koffie-op.html"], cbKoffieLek: ["Coolblue – koffiemachine lekt water (Engels)", "https://coolblue.be/en/advice/how-do-you-ensure-that-your-coffee-machine-doesnt-leak-water.html"] });
const KM = "Philips, Saeco, De'Longhi, Jura, Siemens, Krups, Melitta";
MODELS.push(
G("volautomaat-te-weinig-koffie", "Volautomaat geeft weinig of geen koffie", "koffiemachines", "Komen er halve kopjes of maar een paar druppels uit je volautomaat? Meestal zit er koffie in de uitloop, lucht in het filter of kalk in de leidingen.", [
  N("Halve kopjes of maar een paar druppels", 1, "Koffieresten in de uitloop, lucht of verstopping in het waterfilter, lucht in de leidingen, een vieze zetgroep of kalk.", ["Prik de twee gaatjes van de koffie-uitloop voorzichtig door met een naald of satéprikker.", "Haal het waterfilter eruit, houd het 10 seconden in een bak water en knijp zachtjes tot er geen luchtbellen meer uitkomen. Zet het terug.", "Tap een paar kopjes heet water achter elkaar om lucht uit de leidingen te halen.", "Spoel de zetgroep wekelijks af onder de kraan. Is hij niet uitneembaar (zoals bij Jura en Krups)? Draai dan maandelijks het reinigingsprogramma.", "Ontkalk de machine als dat al lang niet is gebeurd."])],
  ["cbHalfKop"], { also: KM, tasks: [{ m: 0.25, t: "Zetgroep afspoelen" }] }),
G("koffiemachine-lekt", "Koffiemachine lekt water", "koffiemachines", "Water in de lekbak is normaal: de machine spoelt zichzelf na elk kopje. Ligt er water ónder de machine, dan zegt de kleur waar het vandaan komt.", [
  N("Bruinig water onder de machine", 1, "Volle lekbak, scheve ondergrond of een vieze zetgroep.", ["Leeg en spoel de lekbak en zet hem goed terug.", "Zet de machine waterpas.", "Spoel de zetgroep af onder de kraan; doe dit wekelijks."]),
  N("Helder water onder de machine", 1, "Het waterreservoir zit niet goed vast.", ["Zet het reservoir opnieuw in en druk het stevig aan tot het vastklikt.", "Blijft het lekken? Laat de machine repareren."]),
  N("Water met koffiedik achter de uitloop", 1, "De koffie-uitloop zit niet goed.", ["Druk de uitloop richting de machine.", "Is de uitloop niet afneembaar? Laat de machine repareren."])],
  ["cbKoffieLek"], { also: KM }));
Object.assign(SRC,{ anwbEbike: ["ANWB – Veelvoorkomende defecten elektrische fiets", "https://www.anwb.nl/fiets/soorten-fietsen/elektrische-fietsen/defecten-elektrische-fiets"] });
MODELS.push(G("e-bike-problemen", "E-bike: accu laadt niet, display of ondersteuning valt uit", "e-bikes", "Doet je e-bike raar? Noteer eerst de foutcode op het display, zet de fiets uit en weer aan en kijk of de contactpunten schoon zijn. Open de accu nooit zelf.", [
  N("Accu laadt niet op of is snel leeg", 2, "Defecte of verkeerde oplader, accu niet goed geplaatst, kapotte zekering of een storing in het accumanagement (BMS).", ["Gebruik de originele oplader die bij je fiets hoort en kijk of hij werkt.", "Haal de accu eruit, zet hem opnieuw goed vast en check de verbinding.", "Laat de accu uitlezen bij de fietsenmaker, zeker na een val of botsing."]),
  N("Display doet het niet", 1, "Lege batterij van de boordcomputer, display niet goed in de houder, vieze contacten, software of vocht.", ["Zet het display uit en weer aan, of herstart het volledig.", "Maak de contactpunten en toetsen schoon.", "Condens in het display? Leg het even in een warme ruimte. Gebruik bij regen een hoesje.", "Werkt het nog niet? Mogelijk is een software-update bij de dealer nodig."]),
  N("Ondersteuning valt weg", 2, "Een vuile rotatiesensor of een defecte krachtsensor bij een middenmotor.", ["Hier kun je zelf weinig aan doen: laat de sensoren controleren door de fietsenmaker."]),
  N("Display heeft stroom, maar de motor helpt niet", 3, "Storing in de aandrijfeenheid of de aansluiting.", ["Laat de aansluiting en de motor controleren door de fietsenmaker."]),
  N("Actieradius wordt kleiner", 1, "Te zachte banden, kou (tijdelijk), een slecht werkende oplader of een versleten accu.", ["Pomp je banden op; controleer de spanning ongeveer elke drie weken.", "Controleer de oplader.", "Is de accu versleten? Laat hem reviseren (nieuwe cellen) of vervangen."]),
  N("Snelheid op het display klopt niet", 1, "De spaakmagneet passeert de sensor niet goed, of de sensorkabel is kapot.", ["Kijk of de magneet op de spaak vlak langs de sensor op het frame gaat, en maak beide schoon.", "Kabel of sensor kapot? Laat het repareren bij de fietsenmaker."])],
  ["anwbEbike"], { also: "Bosch, Shimano, Bafang, Yamaha, Gazelle, Batavus, Sparta, Stella", tasks: [{ m: 0.75, t: "Bandenspanning controleren" }] }));
Object.assign(SRC,{ prusaFirst: ["Prusa Knowledge Base – First layer issues (Engels)", "https://help.prusa3d.com/article/first-layer-issues_1804"] });
MODELS.push(G("eerste-laag-hecht-niet", "3D-print: eerste laag hecht niet", "3d-printers", "Laat je print los van het bed, of ziet de eerste laag er rommelig uit? Bijna altijd is het een vuile printplaat, de verkeerde temperatuur of de hoogte van de nozzle.", [
  N("Eerste laag blijft niet plakken", 1, "Vuile of versleten printplaat, materiaal dat lijm nodig heeft, te snel printen, te koud bed, verkeerde nozzlehoogte of een deels verstopte nozzle.", ["Maak de printplaat schoon met isopropylalcohol (IPA). Helpt dat niet meer, was hem met warm water en een paar druppels afwasmiddel.", "Alleen op een gladde PEI-plaat mag je ongeveer eens per maand aceton gebruiken; nooit op een getextureerde of satijnen plaat.", "Gebruik een PVA-lijmstift voor PETG, nylon, PC, ABS, ASA en flexibel materiaal.", "Print de eerste drie lagen langzamer, bijvoorbeeld op 75%.", "Gebruik de temperaturen van je slicer; bij lastig materiaal mag het bed 5 tot 10 °C warmer.", "Controleer of de plaat vlak, schoon en onbeschadigd op het bed ligt.", "Voeg een brim toe in je slicer voor meer hechtoppervlak."]),
  N("Eerste laag heeft gaten of is ongelijk", 1, "De nozzle staat te hoog of het bed is niet vlak.", ["Kalibreer de nozzlehoogte opnieuw (op oudere Prusa's met Live Adjust Z en de First Layer Calibration).", "Is het bed op één plek lager? Gebruik bedcorrectie of meshleveling van je printer."]),
  N("Eerste laag is te plat geperst", 2, "De nozzle staat te dicht bij het bed.", ["Verlaag de nozzlehoogte niet om slechte hechting te compenseren: kalibreer hem opnieuw.", "Te laag kan de printplaat beschadigen; bij Prusa valt die schade niet onder de garantie."])],
  ["prusaFirst"], { also: "Prusa, Bambu Lab, Creality en andere FDM-printers" }));
Object.assign(SRC,{ wikWP: ["Welingelichte Kringen – rook uit je warmtepomp na de eerste vorstnacht", "https://www.welingelichtekringen.nl/samenleving/rook-uit-je-warmtepomp-na-de-eerste-vorstnacht-dat-is-geen-storing-maar-bel-wel-als-je-dit-ziet"] });
MODELS.push(G("warmtepomp-ijs-en-damp", "Warmtepomp: damp, ijs of ontdooien", "warmtepompen", "Komt er een witte wolk uit je warmtepomp als het vriest? Dat is meestal geen storing maar waterdamp van het ontdooien. Bel pas als de buitenunit blijft bevriezen.", [
  N("Witte damp of 'rook' uit de buitenunit", 1, "De warmtepomp ontdooit: hij draait even om en smelt de rijp op de verdamper. Dit gebeurt vooral bij vochtig weer rond 0 tot 7 graden en bij mist.", ["Niets doen: een ontdooibeurt duurt meestal 5 tot 15 minuten.", "Radiatoren of vloer worden in die tijd iets koeler; dat is normaal.", "Zet de thermostaat tijdens het ontdooien niet uit en draai hem niet ineens hoger."]),
  N("IJs blijft zitten of wordt elke dag dikker", 2, "Te weinig luchtdoorstroming, een vuile verdamper of een sensor die verkeerd meet.", ["Houd de buitenunit vrij van blad, sneeuw en spullen.", "Ontdooit hij veel vaker dan normaal, blijft het ijs groeien of is de unit helemaal dichtgevroren? Bel je installateur."]),
  N("IJsplaat onder de buitenunit", 1, "Het smeltwater loopt niet weg; de afvoer is verstopt of bevroren.", ["Controleer de smeltwaterafvoer.", "Let op gladheid op tegels en paden.", "Komt het steeds terug? De installateur kan de afvoer verbeteren."]),
  N("Huis wordt niet meer warm na het ontdooien", 3, "De warmtepomp herstelt niet goed na het ontdooien of valt stil.", ["Bel je installateur. Huur je? Meld het bij je verhuurder."])],
  ["wikWP"], { also: "Daikin, Mitsubishi, Panasonic, Vaillant, Remeha, Intergas, Itho Daalderop, Nefit" }));
Object.assign(SRC,{ husqGeel: ["Husqvarna – knipperend geel lampje op het laadstation", "https://www.husqvarna.com/nl/ondersteuning/husqvarna-self-service/wat-betekent-een-knipperend-geel-lampje-op-het-laadstation-van-de-automower-ka-01720/"], husqBlauw: ["Husqvarna – continu blauw lampje op het laadstation", "https://www.husqvarna.com/be-nl/ondersteuning/husqvarna-self-service/wat-betekent-een-continu-brandend-blauw-lampje-op-het-laadstation-van-de-automower-ka-01721/"] });
(m => { m.faults = [...m.faults,
  N("Laadstation: geel lampje knippert", 2, "De geleidingsdraad is onderbroken of losgekoppeld (bij installaties met een begrenzingsdraad).", ["Controleer of de connector van de geleidingsdraad goed op het laadstation zit.", "Zoek de breuk in de geleidingsdraad en vervang het kapotte stuk door nieuwe lusdraad."]),
  N("Laadstation: blauw lampje brandt continu", 1, "Het signaal van de begrenzingsdraad is zwak: beschadigde draad, een te lange lus of gekruiste aansluitingen.", ["Maait de robot normaal? Dan hoef je niets te doen, al voorkomt herstellen latere problemen.", "Controleer de lengte van de lus: maximaal 800 meter. Te lang? Verklein het werkgebied of vervang eilanden door fysieke barrières.", "Vervang beschadigde stukken draad.", "Controleer of de draden goed vastzitten en of connectoren en pennen niet beschadigd of gecorrodeerd zijn.", "Blijft het lampje branden? Neem contact op met je Husqvarna-dealer."])];
  m.src = [...m.src, "husqGeel", "husqBlauw"]; })(MODELS.find(x => x.id === "husqvarna-automower"));
Object.assign(SRC,{ husqLaadt: ["Husqvarna – Automower laadt niet op of geeft melding Lege accu", "https://www.husqvarna.com/nl/ondersteuning/husqvarna-self-service/automower-laadt-niet-op-of-geeft-lege-accu-foutmelding-weer-ka-70405/"] });
(m => { m.faults = [...m.faults,
  N("Laadt niet op of melding Lege accu", 1, "Slecht contact met het laadstation, een te koude of warme accu, diepontlading na de winter, verkeerde gebiedsmodus of een versleten accu.", ["Zet de maaier recht in het laadstation en maak de laadcontacten van maaier en station schoon van blad en maaisel.", "Na de winterstalling: zet de maaier een paar uur op het laadstation zodat de lege accu weer kan beginnen met laden.", "Staat de maaier op Bijgebied? Zet hem terug op Hoofdgebied.", "Controleer of het laadstation vlak staat met genoeg vrije ruimte eromheen, en of de kabels goed vastzitten.", "Haal obstakels weg op de route naar het laadstation.", "Knippert het lampje rood? Dan kan de antenne in de bodemplaat beschadigd zijn: laat dat nakijken bij een erkend servicecentrum.", "Is de accu oud? Dan is hij mogelijk aan vervanging toe."])];
  m.src = [...m.src, "husqLaadt"]; })(MODELS.find(x => x.id === "husqvarna-automower"));
Object.assign(SRC,{ neffInductie: ["NEFF – probleemoplossing inductiekookplaten", "https://www.neff-home.com/nl/service/probleemoplossing-en-foutcodes/inductiekookplaten/reparatie"] });
MODELS.push(G("inductiekookplaat-werkt-niet", "Inductiekookplaat werkt niet of geeft foutcode", "kookplaten", "Doet je inductiekookplaat niets, of staat er een code met een E of F op het display? Begin met de stroom en een herstart. Specifieke codes vind je bij het merk van je kookplaat.", [
  N("Kookplaat doet helemaal niets", 2, "De stroom is onderbroken.", ["Kijk in de meterkast of de groep van de kookplaat is uitgeschakeld.", "Zet de groep weer aan en kijk of de kookplaat werkt.", "Slaat de groep steeds opnieuw uit? Bel een erkend installateur of de servicedienst."]),
  N("Foutcode met een E op het display", 2, "Het apparaat meldt een storing; de code zegt welke.", ["Zet de kookplaat uit en weer aan, en laat hem tussendoor afkoelen.", "Haal pannen en kookgerei van de kookplaat.", "Zorg dat er geen pan te dicht bij het bedieningspaneel staat.", "Blijft de melding? Zoek de code op bij het merk van je kookplaat of bel de servicedienst en geef de exacte code door."])],
  ["neffInductie"], { also: "NEFF, Bosch, Siemens, AEG, Zanussi, Miele, ATAG, Etna" }));
Object.assign(SRC,{ bekoWasSpoelt: ["Beko – wasmachine spoelt niet goed", "https://www.beko.com/be-nl/Ondersteuning/wasmachine--problemen-oplossen--artikel/hoe-kan-ik-een-wasmachine-repareren-die-niet-spoelt"], bekoDroogVent: ["Beko – ventilatieopening wasdroger verstopt", "https://www.beko.com/nl-nl/ondersteuning/wasdroger--problemen-oplossen--artikel/hoe-weet-ik-of-de-ventilatieopening-van-mijn-wasdroger-verstopt-is"] });
MODELS.push(G("wasmachine-zeepresten", "Zeepresten op de was of wasmachine spoelt slecht", "wasmachines", "Witte vlekken of zeepresten op je kleding? Dan spoelt de machine niet goed uit. Meestal is het pompfilter verstopt of zit de trommel te vol.", [
  N("Zeepresten of witte vlekken op de was", 1, "Verstopt pompfilter, te volle trommel, te veel of verkeerd wasmiddel, verkeerd vakje, geknikte afvoerslang of te lage waterdruk.", ["Maak het pompfilter schoon (meestal rechtsonder achter een klepje): zet een bakje of handdoeken eronder, laat het water weglopen, draai het filter linksom los en spoel het af. Draai het daarna rechtsom weer vast. Doe dit ongeveer elke drie maanden.", "Stop niet meer was in de trommel dan het programma aankan (zie handleiding).", "Gebruik het juiste wasmiddel en niet meer dan de aanbevolen dosis.", "Doe wasmiddel in het vak voor de hoofdwas en wasverzachter in het vakje daarvoor.", "Controleer de afvoerslang op knikken en verstoppingen.", "Twijfel je aan de waterdruk? Sluit de kraan en schakel een erkende loodgieter in."])],
  ["bekoWasSpoelt"], { also: WM, tasks: [{ m: 3, t: "Pompfilter schoonmaken" }] }));
(m => { m.faults = [...m.faults,
  N("Droogt langer, wordt te heet of geeft condens", 2, "De ventilatieopening is mogelijk verstopt of geblokkeerd. Dat is slecht voor de prestaties én voor de veiligheid.", ["Vergelijk de droogtijd met de handleiding: langer drogen is het duidelijkste signaal.", "Voel of droger en was warmer zijn dan normaal.", "Kijk naar stoom of condens op deur en display, en naar water rond of achter de droger.", "Zit er opvallend weinig pluis in het filter? Ook dat wijst op een verstopping.", "Zie je een of meer signalen? Maak de ventilatieopening vrij of laat hem nakijken; hij mag nooit geblokkeerd zijn."])];
  m.src = [...m.src, "bekoDroogVent"]; })(MODELS.find(x => x.id === "droger-droogt-niet"));
Object.assign(SRC,{ cbWhirlWD: ["Coolblue – storingen Whirlpool was-droogcombinaties", "https://www.coolblue.nl/advies/hoe-los-je-de-meest-voorkomende-storingen-van-whirlpool-was-droogcombinaties-op.html"] });
{ const RT = "Komt de code terug? Trek de stekker 30 minuten uit het stopcontact en start opnieuw. Helpt dat niet, vraag een reparatie aan.";
MODELS.push({ id: "whirlpool-was-droogcombinatie", brand: "Whirlpool", name: "Was-droogcombinatie", cat: "wasmachines", years: "Alle bouwjaren", unit: null, also: "Codes kunnen per model verschillen",
  intro: "Whirlpool was-droogcombinaties tonen een F-code op het display. Dit zijn de meest voorkomende, met wat je zelf kunt doen.", weak: [], parts: [], tasks: [],
  faults: [
    F("F05", "Watertemperatuursensor", 2, "De sensor die de watertemperatuur meet, geeft een storing.", ["Trek de stekker uit het stopcontact en wacht 30 minuten.", "Steek de stekker terug en zet de machine aan.", RT]),
    F("F13", "Probleem met de deur", 1, "De deur is niet goed dicht of het slot is vuil.", ["Kijk of er een sok of ander kledingstuk tussen de deur zit en klik de deur goed dicht.", "Maak het deurslot schoon met een vochtige doek.", "Zit de trommel te vol? Haal er wat uit en start het programma opnieuw.", RT]),
    F("F18", "Te veel schuim", 1, "Er is te veel wasmiddel gebruikt.", ["Haal de was uit de trommel.", "Draai een wasprogramma zonder wasmiddel om het schuim weg te spoelen.", "Doe de was er daarna weer in.", "Gebruik voortaan minder wasmiddel."])],
  src: ["cbWhirlWD"] }); }
Object.assign(SRC,{ cbSamWD: ["Coolblue – storingen Samsung was-droogcombinaties", "https://www.coolblue.nl/advies/de-meest-voorkomende-storingen-van-samsung-was-droogcombinaties.html"], cbLgWD: ["Coolblue – storingen LG was-droogcombinaties", "https://www.coolblue.nl/advies/de-meest-voorkomende-storingen-van-lg-was-droogcombinaties.html"], cbAegWD: ["Coolblue – storingen AEG was-droogcombinaties", "https://www.coolblue.nl/advies/de-meest-voorkomende-storingen-van-aeg-was-droogcombinaties.html"], cbBoschWD: ["Coolblue – storingen Bosch en Siemens was-droogcombinaties", "https://www.coolblue.nl/advies/hoe-los-je-voorkomende-storingen-bosch-en-siemens-wasdroogcombinaties-op.html"], cbHaierWD: ["Coolblue – storingen Haier was-droogcombinaties", "https://www.coolblue.nl/advies/de-meest-voorkomende-storingen-van-haier-was-droogcombinaties.html"] });
{ const RT = "Komt de code terug? Trek de stekker 30 minuten uit het stopcontact en start opnieuw. Helpt dat niet, vraag een reparatie aan.";
  const FILTER = ["Zet een teil of handdoeken onder het klepje onderaan de machine.", "Draai het afvoerfilter voorzichtig los en laat het water weglopen.", "Spoel het filter schoon onder de kraan en veeg de filterholte schoon.", "Draai het filter weer vast."];
  const SLANG = ["Controleer of de afvoerslang niet geknikt of verstopt is.", "De slang mag niet dieper dan 10 cm in de afvoerbuis hangen en de afvoer niet hoger dan 1 meter zijn."];
  const TOE = ["Controleer of de kraan helemaal open staat en de aanvoerslang geen knik heeft.", "Draai de kraan dicht, maak de aanvoerslang los en maak het zeefje in het uiteinde schoon, bijvoorbeeld met een tandenborstel.", "Draai de slang weer vast en open de kraan."];
  const WD = (id, brand, src, intro, faults) => ({ id, brand, name: "Was-droogcombinatie", cat: "wasmachines", years: "Alle bouwjaren", unit: null, also: "Codes kunnen per model verschillen", intro, weak: [], parts: [], tasks: [{ m: 3, t: "Afvoerfilter schoonmaken" }], faults, src: [src] });
MODELS.push(
WD("samsung-was-droogcombinatie", "Samsung", "cbSamWD", "Samsung was-droogcombinaties tonen een code van twee of drie letters. Dit zijn de meest voorkomende, met wat je zelf kunt doen.", [
  F("C5", "Probleem met de waterafvoer", 1, "Het water loopt niet goed weg.", ["Controleer of de afvoerslang niet verstopt of geknikt is.", ...FILTER, "Staat de machine in een koude schuur? In de winter kan de afvoerslang bevroren zijn.", RT]),
  F("DC", "Deurfout", 1, "De deur is niet goed dicht.", ["Sluit de deur goed.", "Kijk of er geen wasgoed tussen de deur klemt.", RT]),
  F("DDC", "AddWash-luik te vroeg geopend", 1, "Alleen bij modellen met een AddWash-deur.", ["Sluit het AddWash-luik.", "Druk eerst op pauze en open daarna pas het luik om iets toe te voegen."]),
  F("Controleer afvoerfilter", "Afvoerfilter vervuild", 1, "Er zit mogelijk iets vast in het afvoerfilter.", [...FILTER, "Haal voorzichtig obstakels weg uit de filterholte."]),
  F("UC", "Probleem met de stroomtoevoer", 2, "Mogelijk een probleem met de stroomtoevoer of de spanning.", ["Zet de machine uit en trek de stekker eruit.", "Wacht 15 minuten, sluit hem weer aan en start het programma.", "Blijft de code? Vraag een monteur aan."]),
  F("HC", "Temperatuursensor", 2, "Probleem met de temperatuursensor.", ["Zet de machine uit en trek de stekker eruit.", "Laat hem 30 minuten afkoelen, sluit hem weer aan en start het programma.", "Blijft het? Dan is mogelijk een monteur nodig."])]),
WD("lg-was-droogcombinatie", "LG", "cbLgWD", "LG was-droogcombinaties tonen een code van twee of drie tekens. Dit zijn de meest voorkomende, met wat je zelf kunt doen.", [
  F("IE", "Probleem met de watertoevoer", 1, "Er komt te weinig water binnen.", [...TOE, RT]),
  F("AE", "Lekkage", 3, "De machine detecteert een lek.", ["Zet de machine uit en trek de stekker eruit.", "Draai de waterkraan helemaal dicht.", "Neem contact op met het verkooppunt, of buiten de garantie direct met LG."]),
  F("OE", "Probleem met de waterafvoer", 1, "Het water loopt niet goed weg.", [...SLANG, "Maak het filter onderin de machine schoon.", RT]),
  F("dE / dE1 / dEz / dE4", "Deurfout", 1, "De deur is niet goed vergrendeld.", ["Open de deur en haal wasgoed weg dat in de weg zit.", "Duw de deur stevig dicht tot je een klik hoort.", "Helpt dat niet? Dan is de deurvergrendeling of deursensor mogelijk kapot: vraag een LG-monteur aan."]),
  F("dHE", "Droogfunctie werkt niet", 2, "De droogfunctie heeft een storing.", ["Trek de stekker eruit, wacht 30 seconden en steek hem terug.", "Zet de machine aan.", "Blijft de code? Neem contact op met het verkooppunt of LG."]),
  F("TE", "Bedieningsfout", 2, "Storing in de besturing.", ["Zet de machine uit, trek de stekker eruit en draai de kraan dicht.", "Neem contact op met het verkooppunt of LG."])]),
WD("aeg-was-droogcombinatie", "AEG", "cbAegWD", "AEG was-droogcombinaties tonen codes als E20, C2 of EF0. Dit zijn de meest voorkomende, met wat je zelf kunt doen.", [
  F("E20 / F2 / C2", "Probleem met de waterafvoer", 1, "Het water loopt niet goed weg.", [...SLANG, "Controleer of het filter verstopt zit en maak het schoon.", RT]),
  F("E10 / F1 / C1", "Probleem met de watertoevoer", 1, "Er komt te weinig water binnen.", [...TOE, "Zet de machine aan en start een programma.", RT]),
  F("EH0 / EHO", "Probleem met de stroomtoevoer", 2, "De machine krijgt geen goede stroom.", ["Test het stopcontact met een ander apparaat. Werkt dat ook niet? Schakel een elektricien in.", "Werkt het wel? Trek de stekker eruit, wacht 30 seconden, steek hem terug en zet de machine aan."]),
  F("EF0 / EFO", "Verstopt filter of te veel schuim", 1, "Meerdere oorzaken mogelijk: een verstopt afvoerfilter of te veel wasmiddel.", [...FILTER, "Te veel schuim? Wacht een paar uur tot het schuim weg is en draai dan een lege trommel op 60 °C.", RT])]),
WD("bosch-siemens-was-droogcombinatie", "Bosch / Siemens", "cbBoschWD", "Bosch- en Siemens-was-droogcombinaties tonen codes als E:36 of H:32. Dit zijn de meest voorkomende, met wat je zelf kunt doen.", [
  F("E:36 / E36", "Probleem met de waterafvoer", 1, "Afvoerbuis, -slang of -pomp is mogelijk verstopt.", ["Controleer of de afvoerslang geknikt is.", "Haal de afvoerslang voorzichtig los en maak hem schoon.", "Maak de afvoerpomp onderaan de machine schoon volgens de handleiding.", RT]),
  F("E:35 / E35", "Lekkage", 3, "De machine detecteert een lek.", ["Zet de machine uit.", "Draai de kraan helemaal dicht.", "Neem contact op met het verkooppunt, of buiten de garantie direct met Bosch of Siemens."]),
  F("H:95 / H95", "Geen water in de droogfase", 1, "In de droogfase is water nodig om de condensor te spoelen. Meestal zit het zeefje in de aanvoerslang verstopt.", TOE),
  F("H:32 / H32", "Onbalans in de trommel", 1, "De was ligt scheef; de machine stopt met centrifugeren.", ["Pauzeer het programma en wacht tot de deur open kan.", "Maak in elkaar gedraaide kleding los en verdeel de was gelijkmatig.", "Hervat het programma."])]),
WD("haier-was-droogcombinatie", "Haier", "cbHaierWD", "Haier was-droogcombinaties tonen een E-code. Dit zijn de meest voorkomende, met wat je zelf kunt doen.", [
  F("E1", "Waterafvoer werkt niet goed", 1, "Meestal zit het afvoerfilter verstopt.", [...FILTER, RT]),
  F("E4", "Te weinig watertoevoer", 1, "Er komt te weinig water binnen.", [...TOE, RT]),
  F("E9 / F9", "Probleem met de temperatuursensor", 2, "De temperatuursensor geeft een storing.", ["Zet de machine uit en trek de stekker eruit.", "Neem contact op met het verkooppunt; een monteur moet dit oplossen."])]));
}
Object.assign(SRC,{ cbBekoWD: ["Coolblue – storingen Beko was-droogcombinaties", "https://www.coolblue.nl/advies/hoe-los-je-een-beko-was-droogcombinatie-storing-op.html"], cbMieleWD: ["Coolblue – storingen Miele was-droogcombinaties", "https://www.coolblue.nl/advies/de-meest-voorkomende-storingen-van-miele-was-droogcombinaties.html"], cbZanWD: ["Coolblue – storingen Zanussi was-droogcombinaties", "https://www.coolblue.nl/advies/de-meest-voorkomende-storingen-van-zanussi-was-droogcombinaties.html"] });
{ const RT = "Komt de code terug? Trek de stekker 30 minuten uit het stopcontact en start opnieuw. Helpt dat niet, vraag een reparatie aan.";
  const FILTER = ["Zet een teil of handdoeken onder het klepje rechtsonder aan de machine.", "Draai het afvoerfilter voorzichtig los en laat het water weglopen.", "Haal muntjes en andere voorwerpen eruit, spoel het filter af en veeg de filterholte schoon.", "Draai het filter weer vast."];
  const TOE = ["Controleer of de kraan helemaal open staat en de aanvoerslang geen knik heeft.", "Draai de kraan dicht, maak de aanvoerslang los en maak het zeefje in het uiteinde schoon met een borsteltje.", "Draai de slang weer vast en open de kraan."];
  const WD = (id, brand, src, intro, faults) => ({ id, brand, name: "Was-droogcombinatie", cat: "wasmachines", years: "Alle bouwjaren", unit: null, also: "Codes kunnen per model verschillen", intro, weak: [], parts: [], tasks: [{ m: 3, t: "Afvoerfilter schoonmaken" }], faults, src: [src] });
MODELS.push(
WD("miele-was-droogcombinatie", "Miele", "cbMieleWD", "Bij Miele was-droogcombinaties zie je soms de code F4 of de melding Waterproof systeem geactiveerd.", [
  F("F4", "Storing temperatuursensor", 3, "Stroomstoring in de temperatuursensor; hiervoor is een monteur nodig.", ["Zet de machine uit en trek de stekker eruit.", "Neem contact op met het verkooppunt of met Miele."]),
  F("Waterproof systeem geactiveerd", "Lek gedetecteerd", 3, "Er is een lek in de bodem, de trommel of de aanvoerslang.", ["Zet de machine uit en trek de stekker eruit.", "Draai de waterkraan dicht.", "Haal de was eruit met de noodhendel achter het klepje van de waterpomp (zie handleiding).", "Neem contact op met Miele of het verkooppunt."])]),
WD("zanussi-was-droogcombinatie", "Zanussi", "cbZanWD", "Zanussi was-droogcombinaties tonen codes als E10, E20 en E40. Dit zijn de meest voorkomende, met wat je zelf kunt doen.", [
  F("E10", "Probleem met de watertoevoer", 1, "Er komt te weinig water binnen.", [...TOE, "Maak ook het afvoerfilter rechtsonder voorzichtig schoon.", RT]),
  F("E20", "Probleem met de waterafvoer", 1, "De machine pompt het water niet goed weg.", ["Controleer of de afvoerbuis niet verstopt is en haal knikken uit de afvoerslang.", ...FILTER, RT]),
  F("E40", "Deurprobleem", 1, "De deur zit niet goed in het slot; het programma start niet.", ["Kijk of er geen kledingstuk tussen de deur zit en of alle was in de trommel ligt.", "Duw de deur dicht tot hij klikt en start het programma opnieuw.", RT])]),
{ id: "beko-was-droogcombinatie", brand: "Beko", name: "Was-droogcombinatie", cat: "wasmachines", years: "Alle bouwjaren", unit: null, also: "Voor foutcodes: zie de handleiding van je model", intro: "Heeft je Beko was-droogcombinatie een storing zonder duidelijke code? Zoek je klacht hieronder op.", weak: [], parts: [], tasks: [{ m: 3, t: "Afvoerfilter schoonmaken" }], src: ["cbBekoWD"], faults: [
  N("Voert geen water af of lekt", 1, "Knik of verstopping in de afvoerslang, of een vol afvoerfilter.", ["Trek knikken in de afvoerslang recht en maak de slang vrij.", "Maak het afvoerfilter onderin schoon."]),
  N("Droogt niet", 1, "Droogfunctie staat uit, te volle trommel of te lage centrifugesnelheid.", ["Controleer of de droogfunctie aan staat en kies een droogprogramma dat bij de was past.", "Haal een deel van de was eruit als de trommel te vol is.", "Kies bij het wassen een hogere centrifugesnelheid."]),
  N("Pakt geen water", 1, "Kraan dicht, geknikte slang, vuil toevoerfilter of deur niet dicht.", ["Draai de kraan helemaal open en trek knikken uit de toevoerslang.", "Maak het zeefje van de watertoevoer schoon.", "Sluit de deur tot je een klik hoort."]),
  N("Deur gaat niet open", 1, "Het programma loopt nog of er staat water in de trommel.", ["Wacht tot het programma klaar is.", "Laat het water weg met het programma Pompen of Centrifugeren.", "Duw tegen de deur en trek hem voorzichtig open.", "Bij stroomuitval: open het klepje van het afvoerfilter en trek de noodhendel naar beneden."]),
  N("Maakt lawaai of trilt", 1, "Niet waterpas, transportbouten nog aanwezig, vol filter of ongelijk verdeelde was.", ["Zet de machine waterpas met de pootjes.", "Verwijder de transportbouten als die er nog in zitten.", "Maak het afvoerfilter schoon.", "Verdeel de was gelijkmatig en doe er niet te veel in.", "Zorg dat de machine nergens tegenaan staat."]),
  N("Start niet", 1, "Stekker, deur, programma of kinderslot.", ["Controleer of de stekker goed in het stopcontact zit.", "Sluit de deur tot je een klik hoort.", "Kies een programma en druk op start.", "Zet het kinderslot uit als dat aan staat."])] });
}
Object.assign(SRC,{ cbKoelGeluid: ["Coolblue – geluid bij je koelkast oplossen", "https://www.coolblue.nl/advies/koelkast-maakt-geluid.html"], cbKoelIjs: ["Coolblue – ijsvorming in het koelgedeelte oplossen", "https://www.coolblue.nl/advies/hoe-los-je-ijsvorming-in-het-koelgedeelte-op.html"] });
MODELS.push(
G("koelkast-maakt-geluid", "Koelkast maakt geluid", "koelkasten", "Zoemt, tikt, blaast of klotst je koelkast? Veel geluiden zijn normaal. Is het geluid harder dan vroeger, dan ligt het vaak aan de plek of de opstelling.", [
  N("Zoemen, tikken, blazen of stromend water", 1, "Normaal: de compressor slaat aan, de ventilator van een (No) Frost-model draait of het koelmiddel stroomt door de leidingen. Een nieuwe koelkast maakt de eerste tijd extra lawaai.", ["Geen actie nodig."]),
  N("Trillen of rammelen", 1, "De koelkast staat niet waterpas of iets raakt de leidingen achterop.", ["Zet de koelkast waterpas met de stelpootjes.", "Haal voorwerpen weg die tegen de leidingen aan de achterkant zitten."]),
  N("Koelkast draait harder en vaker dan normaal", 1, "Te warme plek, warm eten erin, te weinig ruimte eromheen of stof op de condensor.", ["Zet de koelkast uit de zon en niet naast een oven of radiator.", "Laat restjes eerst afkoelen voor je ze erin zet.", "Houd minstens 5 cm vrij aan de zijkanten en achterkant.", "Zet de koelkast uit en maak de condensor achterop voorzichtig stofvrij met een zachte borstel of doek."])],
  ["cbKoelGeluid"], { also: KK, tasks: [{ m: 6, t: "Condensor stofvrij maken", v: 1 }] }),
G("koelkast-ijs-achterwand", "IJs op de achterwand van de koelkast", "koelkasten", "Een dun laagje ijs of druppels op de achterwand is normaal: daar zit de verdamper. Groeit het ijs, dan komt er te veel warme of vochtige lucht in de koelkast.", [
  N("Dikke ijslaag op de achterwand", 1, "Warme omgeving, te weinig luchtcirculatie, te koude instelling, deur vaak open, warme restjes of versleten deurrubbers.", ["Zet de koelkast uit de zon en weg van warmtebronnen.", "Houd minstens 5 cm vrij aan de zijkanten en achterkant.", "Zet de koelkast op ongeveer 4 °C.", "Open de deur zo kort mogelijk.", "Laat warme restjes eerst afkoelen.", "Test de deurrubbers: leg een brandende zaklamp in de koelkast gericht op de deur. Zie je licht als de deur dicht is? Vervang de rubbers."])],
  ["cbKoelIjs"], { also: KK }));
Object.assign(SRC,{ taBlendAan: ["Test Aankoop Repairguide – blender gaat niet aan", "https://www.test-aankoop.be/repairguide/blenders/blender-reageert-niet"], taBlendLek: ["Test Aankoop Repairguide – blender lekt", "https://www.test-aankoop.be/repairguide/blenders/blender-lekt"], taBlendMes: ["Test Aankoop Repairguide – messen snijden niet meer", "https://www.test-aankoop.be/repairguide/blenders/messen-blender-snijden-niet-meer"], taBlendTus: ["Test Aankoop Repairguide – blender werkt met tussenpozen", "https://www.test-aankoop.be/repairguide/blenders/blender-werkt-met-tussenpozen"], taBlendAcc: ["Test Aankoop Repairguide – accessoires werken niet", "https://www.test-aankoop.be/repairguide/blenders/accessoires-blender-werken-niet"] });
MODELS.push(G("blender-werkt-niet", "Blender of staafmixer werkt niet", "kleine-apparaten", "Doet je blender niets, lekt hij of snijdt hij niet meer goed? Veel kun je zelf controleren. Trek altijd eerst de stekker eruit en pas op voor de scherpe messen. Is hij jonger dan twee jaar? Dan geldt de wettelijke garantie: de verkoper moet hem gratis herstellen of vervangen.", [
  N("Blender gaat niet aan", 1, "Vuile of vastzittende veiligheidsschakelaar, onderdelen niet goed geplaatst, beschadigd snoer, oververhitte motor of een probleem met het stopcontact.", ["Sluit een ander apparaat aan op hetzelfde stopcontact. Werkt dat ook niet? Dan zit het probleem in de groep of installatie.", "Controleer of de kan, het deksel en alle onderdelen goed op hun plek zitten: de motor draait pas als alles klopt.", "Maak de veiligheidsschakelaar schoon als er aangekoekte resten of vet in zitten.", "Bekijk snoer en stekker op brandplekken of beschadiging. Gebruik hem dan niet meer.", "Heb je hem lang laten draaien? Laat hem volledig afkoelen en probeer het opnieuw.", "Werkt hij nog niet? Laat hem nakijken bij een Repair Café of reparateur."]),
  N("Blender werkt af en toe, lampjes knipperen willekeurig", 2, "Waarschijnlijk een elektronisch probleem, bijvoorbeeld een condensator, weerstand of triac. Ook verkeerd gebruik kan meespelen.", ["Lees in de handleiding of je hem goed gebruikt en onderhoudt.", "Open hem niet zelf: condensatoren kunnen ook zonder stekker nog onder spanning staan.", "Ga naar een Repair Café of reparateur."]),
  N("Blender lekt", 1, "Losse messen of onderdelen, een versleten afdichtingsring, een lekke kan of een beschadigd metalen deel.", ["Controleer of alle onderdelen, vooral het mesblok, stevig vastzitten.", "Vervang een versleten rubberen of plastic afdichtingsring; zoek een ring die op jouw model past.", "Lekt de kan zelf? Vervang de kan.", "Lekt het bij een metalen onderdeel? Laat het repareren."]),
  N("Messen snijden niet meer goed", 1, "De messen zijn bot.", ["Doe een paar kleine stukjes grof zout in de kan en laat de blender even draaien om de messen te slijpen.", "Helpt dat niet? Vervang het mesblok."]),
  N("Accessoire draait niet mee", 2, "De koppeling tussen motor en accessoire (garde, hakmes, rasp) is versleten of gebroken.", ["Zoek een reserveonderdeel bij de fabrikant.", "Niet te krijgen? Soms kan een 3D-printdienst het onderdeel namaken.", "Laat het vervangen bij een reparateur of Repair Café."])],
  ["taBlendAan", "taBlendTus", "taBlendLek", "taBlendMes", "taBlendAcc"], { also: "Philips, Tefal, Krups, Kenwood, Bosch, Braun, Princess, Domo" }));
Object.assign(SRC,{ taStofZuigt: ["Test Aankoop Repairguide – stofzuiger zuigt niet meer goed", "https://www.test-aankoop.be/repairguide/stofzuigers/stofzuiger-zuigt-niet-meer"], taStofStinkt: ["Test Aankoop Repairguide – stofzuiger stinkt", "https://www.test-aankoop.be/repairguide/stofzuigers/stofzuiger-stinkt"], taStofSnoer: ["Test Aankoop Repairguide – snoer rolt niet meer op", "https://www.test-aankoop.be/repairguide/stofzuigers/stofzuiger-snoer-rolt-niet-meer-op"], taStofUit: ["Test Aankoop Repairguide – stofzuiger valt uit", "https://www.test-aankoop.be/repairguide/stofzuigers/stofzuiger-valt-uit"], taStofWiel: ["Test Aankoop Repairguide – wieltjes draaien niet meer", "https://www.test-aankoop.be/repairguide/stofzuigers/stofzuiger-wieltjes-draaien-niet-meer"] });
const SZ = "Philips, Miele, Bosch, Dyson, Samsung, AEG, Rowenta, Vorwerk";
MODELS.push(
G("stofzuiger-zuigt-niet-goed", "Stofzuiger zuigt niet goed", "stofzuigers", "Zuigt je stofzuiger slechter dan vroeger? Bijna altijd is het een volle zak, een vies filter, een verstopping of een lek in slang of buis. Zo spoor je het op, van makkelijk naar lastig.", [
  N("Zuigkracht is (veel) minder", 1, "Zuigkracht staat laag, volle zak of bak, vieze filters, verstopping, losse onderdelen of een open klepje.", ["Zet de zuigkrachtregeling (op de buis, de voet of het apparaat) weer hoog.", "Vervang de stofzak of leeg de stofbak. Maak de filters schoon of vervang ze.", "Controleer of het klepje op de buis dicht zit en alle onderdelen goed aan elkaar vastzitten."]),
  N("Verstopping zoeken", 1, "Iets zit vast in buis, slang, mondstuk of borstel.", ["Haal de buis los en voel of de slang zuigt.", "Zuigt de slang wel? Dan zit de verstopping in de buis of het mondstuk: duw hem eruit met bijvoorbeeld een plumeausteel. Knip haren los van de borstelrol.", "Zuigt de slang niet? Haal hem los van het apparaat en maak hem vrij.", "Zuigt het apparaat zelf ook niet, terwijl alles goed vastzit? Dan is mogelijk de motor kapot: breng hem naar een Repair Café of reparateur."]),
  N("Lek in slang of buis", 1, "Een scheur in de slang, een kapot uiteinde of een losse rubberen afdichting.", ["Een klein gaatje midden in de slang plak je af met siliconentape of ducttape.", "Kapot uiteinde? Draai het los, knip het kapotte stuk eraf en draai het er weer op (de slang wordt wel korter).", "Lijm een losse rubberen afdichting vast of vervang hem."]),
  N("Snoer rolt niet meer op", 1, "Het snoer is vuil of het oprolmechanisme loopt stroef.", ["Stekker eruit. Trek het snoer helemaal uit, maak het schoon en laat het rustig weer oprollen.", "Helpt dat niet? Spuit een beetje siliconenspray in de snoeropening en wacht een halfuur voor je de stofzuiger weer aanzet."]),
  N("Wieltjes draaien niet", 1, "Vuil en haren rond de as, of versleten wieltjes.", ["Haal haren en vuil weg rond de wieltjes en spuit eventueel wat siliconenspray op de as.", "Draait het nog niet? Vervang het wieltje."])],
  ["taStofZuigt", "taStofSnoer", "taStofWiel"], { also: SZ, tasks: [{ m: 3, t: "Filters schoonmaken of vervangen", v: 1 }] }),
G("stofzuiger-stinkt-of-valt-uit", "Stofzuiger stinkt of valt uit", "stofzuigers", "Ruikt je stofzuiger vies of naar brand, of slaat hij af tijdens het zuigen? Ruik je brand: trek direct de stekker eruit.", [
  N("Stofzuiger valt uit tijdens het zuigen", 1, "Verstopte slang, volle zak of vieze filters laten de motor oververhit raken. Of er zit iets vast.", ["Trek de stekker eruit en laat de stofzuiger afkoelen.", "Controleer de slang op verstoppingen.", "Vervang de zak of leeg de bak, en maak de filters schoon of vervang ze.", "Gebruik een gewone stofzuiger niet voor bouwstof, puin of water; huur daarvoor een bouw- of waterstofzuiger."]),
  N("Muffe of vieze geur", 1, "Er zit iets stinkends vast in de voet, buis, slang of zak. Bij een robotstofzuiger soms uitwerpselen van een huisdier.", ["Zoek het voorwerp en haal het eruit.", "Vervang de zak of leeg de bak, en maak de filters schoon of vervang ze.", "Robotstofzuiger: haal alle losse onderdelen eruit en maak ze schoon. Houd de accu droog; veeg hem alleen af met een licht vochtige doek."]),
  N("Brandlucht", 3, "Een verbrand onderdeel, mogelijk de motor, of een probleem met snoer, stekker of stopcontact.", ["Trek meteen de stekker eruit.", "Kijk of stopcontact, stekker of snoer verbrand zijn.", "Gebruik de stofzuiger niet meer en laat hem nakijken bij een Repair Café of reparateur. De motor van een robotstofzuiger vervang je niet zelf."])],
  ["taStofUit", "taStofStinkt"], { also: SZ }));
Object.assign(SRC,{ taKoelLamp: ["Test Aankoop Repairguide – binnenverlichting koelkast werkt niet", "https://www.test-aankoop.be/repairguide/koelkasten/verlichting-koelkast-kapot"], taKoelBarst: ["Test Aankoop Repairguide – barst in de onderwand", "https://www.test-aankoop.be/repairguide/koelkasten/barst-in-wand-frigo"] });
MODELS.push(G("koelkast-lampje-kapot", "Koelkastlampje doet het niet of barst in de bak", "koelkasten", "Brandt het lampje in je koelkast niet meer, of zit er een scheur in de binnenwand? Het lampje kun je vaak zelf vervangen. Is de koelkast jonger dan twee jaar? Dan geldt de wettelijke garantie.", [
  N("Binnenverlichting werkt niet", 1, "Een kapot of los lampje, roest op de contacten, of een probleem met snoer of stekker.", ["Steek de stekker rechtstreeks in een stopcontact in de muur, niet in een verlengsnoer of stekkerdoos.", "Kijk of het snoer beschadigd of geknikt is. Is het beschadigd? Repareer het niet zelf maar laat een technicus kijken.", "Controleer of het lampje goed vastzit en of er roest op de contacten zit. Draai het zo nodig opnieuw vast.", "Is het lampje kapot? Koop een passend vervangend lampje bij een elektrozaak, online of bij de fabrikant.", "Brandt hij nog niet? Laat de koelkast nakijken."]),
  N("Barst of scheur in de binnenwand", 1, "Een klein, oppervlakkig scheurtje is niet erg zolang de koelkast goed blijft koelen.", ["Houd de scheur in de gaten en kijk of hij groter wordt.", "Koelt de koelkast door de scheur niet meer goed? Dan is hij niet te repareren en is vervangen de enige optie."])],
  ["taKoelLamp", "taKoelBarst"], { also: KK }));
Object.assign(SRC,{ cbOntkalkLamp: ["Coolblue – knipperend ontkalkingslampje op je volautomaat uitzetten", "https://www.coolblue.be/nl/advies/hoe-zet-je-een-knipperend-ontkalkingslampje-op-je-volautomaat-uit.html"] });
MODELS.push(G("ontkalkingslampje-blijft-branden", "Ontkalkingslampje blijft branden of knipperen", "koffiemachines", "Heb je je volautomaat ontkalkt, maar blijft het ontkalkingslampje branden of knipperen? Dan is er vaak een stap overgeslagen. Zo krijg je het lampje uit.", [
  N("Ontkalkingslampje blijft aan na het ontkalken", 1, "De machine heeft het ontkalken niet als afgerond geregistreerd, bijvoorbeeld omdat het naspoelen niet helemaal is doorlopen.", ["Vul het waterreservoir met kraanwater tot de max-streep.", "Zet een opvangbak van minstens 1,5 liter onder de koffie- en heetwateruitloop en start het doorspoelen via de instellingen.", "Leeg de bak en vul het reservoir opnieuw met kraanwater. Het lampje hoort nu uit te gaan.", "Nog niet? Vul het reservoir half met water (zonder ontkalker) en start het ontkalkprogramma met een bak eronder; dat duurt 20 tot 30 minuten.", "Vraagt de machine om het reservoir te vullen? Spoel het om, vul het met vers water en bevestig met OK. Laat hem doorspoelen.", "Blijft het lampje branden? Doorloop het volledige ontkalkprogramma volgens de handleiding."])],
  ["cbOntkalkLamp"], { also: KM }));
Object.assign(SRC,{ dlGeenKoffie: ["De'Longhi – waarom geeft mijn volautomaat geen koffie af?", "https://www.delonghi.com/nl-nl/faqs/Waarom-geeft-mijn-volautomaat-geen-koffie-af/a/62780"] });
(m => { m.faults = [...m.faults,
  N("Geen of bijna geen koffie", 1, "Maalgraad te fijn, te veel gemalen koffie, of een vuile zetgroep.", ["Draai tijdens het malen de maalgraadknop naar een grovere stand en zet een nieuw kopje.", "Gebruik je gemalen koffie? Neem maximaal één maatschepje.", "Zet de machine uit met de aan/uit-knop, wacht tot hij helemaal uit is en trek dan de stekker eruit.", "Open het deurtje, druk de twee rode (soms gele) knoppen in en haal de zetgroep eruit.", "Spoel de zetgroep af onder lauw water en zet hem terug. Let op: de zetgroep mag niet in de vaatwasser.", "Een goede espresso is 30 tot 40 ml en loopt langzaam door met een bruine crema."])];
  m.src = [...m.src, "dlGeenKoffie"]; })(MODELS.find(x => x.id === "delonghi-magnifica"));
Object.assign(SRC,{ idLaad: ["ID.nl – Help, mijn EV laadt niet op", "https://id.nl/mobiliteit/auto/elektrisch-rijden/help-mijn-ev-laadt-niet-op-zo-los-je-de-meest-voorkomende-laadpaalproblemen-op"], gazelleProb: ["Gazelle – problemen met je e-bike", "https://www.gazellebikes.com/nl-be/advies/e-bike/problemen-met-ebike"] });
(m => { m.faults = [...m.faults,
  N("Thuislaadpaal start niet", 2, "Storing in de paal of de stroomtoevoer, of de aardlekschakelaar is uitgeslagen.", ["Kijk in de meterkast of de aardlekschakelaar of groep van de laadpaal is uitgeslagen.", "Haal de laadkabel los en steek hem opnieuw in.", "Kijk of de paal stroom heeft en lees het display of de lampjes af.", "Zet de stroom van de paal kort uit en weer aan.", "Helpt het niet? Bel de leverancier of een installateur. Sleutel niet zelf aan de elektra."]),
  N("Laden gaat langzaam", 1, "Kabel niet geschikt, de auto heeft een eigen maximum, te veel verbruikers tegelijk, of een 1-fase aansluiting.", ["Controleer of je laadkabel geschikt is voor het laadvermogen.", "Kijk wat het maximale laadvermogen van je auto is.", "Sneller laden dan 3,7 kW vraagt een 3-fase aansluiting; dat staat vaak op je meter. Twijfel je? Laat een installateur kijken."]),
  N("Auto laadt niet tot 100%", 1, "Een ingestelde laadlimiet die de accu spaart, of een probleem met de accu.", ["Kijk in de handleiding of app van je auto of er een laadlimiet staat ingesteld.", "Vermoed je een accuprobleem? Laat het onderzoeken en check de garantie."]),
  N("Laadpas of app wordt niet herkend", 1, "De pas is niet actief of er is te weinig tegoed; of de app hapert.", ["Controleer of de pas geactiveerd is en of er tegoed is.", "Herstart de app, installeer updates of installeer hem opnieuw.", "Neem contact op met je laadpasprovider."])];
  m.src = [...m.src, "idLaad"]; })(MODELS.find(x => x.id === "auto-laadt-niet-op"));
(m => { m.faults = [...m.faults,
  N("Accu zit vast in de houder", 1, "Het slot loopt stroef of roest, de sleutel zit niet ver genoeg in, of de accu is na jaren iets uitgezet.", ["Smeer het slot met een beetje olie.", "Steek de sleutel een paar keer helemaal in en uit.", "Roest, of zit de accu klem? Ga naar de fietsenmaker. Open de accu nooit zelf."]),
  N("Motor helpt niet meer (tijdelijk)", 1, "Vaak een tijdelijke storing.", ["Zet het systeem uit via het display, wacht 10 seconden en start opnieuw.", "Of haal de accu eruit, wacht even en plaats hem terug.", "Helpt het niet? Ga naar de fietsenmaker."]),
  N("Licht gaat niet aan of flikkert", 2, "Licht moet soms eerst door de winkel worden geactiveerd, een vervangen lamp past niet bij de spanning, of corrosie in de lamp of kabel.", ["Controleer kabel en lamphuis op corrosie.", "Heb je zelf een lamp vervangen? Check of hij bij de spanning van je systeem past.", "Werkt het nog niet? Laat de fietsenmaker kijken."]),
  N("Kraken bij het trappen", 1, "Droge of vuile lagers, water in de trapas of versleten kettingbladen.", ["Smeer de schroefdraad van de pedalen, zeker na een natte rit.", "Laat de trapas en kettingbladen controleren door de fietsenmaker als het blijft kraken."])];
  m.src = [...m.src, "gazelleProb"]; })(MODELS.find(x => x.id === "e-bike-problemen"));
Object.assign(SRC,{ cbIndegoAccu: ["Coolblue – accuproblemen Bosch Indego (Engels)", "https://coolblue.nl/en/advice/how-do-you-solve-battery-problems-from-your-indego-robot-vacuum.html"], cbIndegoRoute: ["Coolblue – maairoute Bosch Indego (Engels)", "https://coolblue.be/en/advice/how-do-you-solve-problems-with-the-mowing-route-of-your-indego-robot-lawn-mower.html"] });
MODELS.push({ id: "bosch-indego", brand: "Bosch", name: "Indego robotmaaier", cat: "tuin", years: "Alle bouwjaren", unit: null, also: "Indego S, M en XS", intro: "Laadt je Bosch Indego niet op, stopt hij halverwege of slaat hij stukken gazon over? Dit zijn de meest voorkomende oorzaken.", weak: [], parts: [], tasks: [{ m: 1, t: "Spanning begrenzingsdraad controleren", v: 1 }], src: ["cbIndegoAccu", "cbIndegoRoute"], faults: [
  N("Staat in het laadstation maar laadt niet", 1, "Normaal: de accu laadt pas bij als hij onder 80% zit.", ["Laat de maaier eerst maaien tot de accu onder 80% zit."]),
  N("Accu laadt helemaal niet", 1, "De hoofdschakelaar staat uit of het laadstation heeft geen stroom.", ["Zet de schakelaar achter op de maaier op I.", "Controleer of de voedingskabel goed in het laadstation zit."]),
  N("Accu werkt slechter", 1, "De temperatuur is buiten 5 tot 45 °C.", ["Zet laadstation en maaier niet lang in de volle zon.", "Berg de maaier in de winter binnen op."]),
  N("Stopt halverwege of slaat stukken over", 1, "Te hoog gras, oneffen grond, draad te dicht bij obstakels, losse draad, of obstakels die hij bij het inleren heeft onthouden.", ["Gras hoger dan 10 cm? Maai eerst met een gewone maaier.", "Maak hobbels, zandhopen en wortels vlakker, of leg de draad om die plekken heen.", "Houd de draad minstens 30 cm (Indego 350 en 400) of 35 cm (andere modellen) van bomen en vijvers.", "Past er een vinger tussen gras en draad? Span de draad strakker.", "Geen evenwijdige baantjes na de eerste drie rondes? Laat de maaier de tuin opnieuw inleren."])] });
Object.assign(SRC,{ toppyRobot: ["Toppy – robotmaaier problemen oplossen", "https://www.toppy.nl/advies/318/robotmaaier-problemen-oplossen.html"], husqSchema: ["Husqvarna – Automower volgt de geplande maaitijden niet", "https://www.husqvarna.com/nl/ondersteuning/husqvarna-self-service/automower-robotmaaier-volgt-de-geplande-maaitijden-niet-ka-01506/"], husqWiel: ["Husqvarna – Wielmotor overbelast", "https://www.husqvarna.com/nl/ondersteuning/husqvarna-self-service/wielmotor-overbelast-rechts-links-foutmelding-automower-ka-01456/"] });
MODELS.push(G("robotmaaier-problemen", "Robotmaaier: geen lussignaal, loopt vast of vindt laadstation niet", "tuin", "De meeste robotmaaierproblemen komen door de begrenzingsdraad, grasresten onder de maaier of obstakels. Kijk eerst naar de melding op het display en het lampje op het laadstation.", [
  N("Geen lussignaal of draadbreuk", 2, "Losse of verkeerd aangesloten draad, of een breuk door graven, kantensteken of verticuteren.", ["Controleer alle aansluitingen op het laadstation en zet ze opnieuw vast.", "Kijk of de draad goed om eilanden zoals perkjes heen loopt.", "Zet de maaier in het laadstation en laat hem zo nodig een nieuw lussignaal maken (zie handleiding).", "Zoek de breuk door het gazon steeds te halveren met een extra stuk draad, en vervang het kapotte stuk met nieuwe draad en koppelstukken."]),
  N("Maaier loopt vast", 1, "Grasresten onder de maaier, te hoog gras, takken, hoogteverschillen of een omwikkeld mes.", ["Zet de veiligheidsschakelaar uit voordat je onder de maaier kijkt.", "Spuit grasresten weg met de tuinslang en haal obstakels uit het maaidek.", "Zet de maaihoogte hoger.", "Vul kuilen op met aarde en houd te steile hellingen buiten de draad."]),
  N("Gras wordt slecht gemaaid", 1, "Te weinig maaiuren in het schema, of botte messen.", ["Controleer het maaischema en geef de maaier meer uren.", "Vervang de messen door nieuwe."]),
  N("Maaier vindt het laadstation niet", 1, "Obstakels op de route, een scheve gidsdraad, een scheef laadstation of vuile laadcontacten.", ["Haal obstakels weg en leg de gidsdraad recht naar het laadstation.", "Zet het laadstation vlak en maak de laadstrips schoon.", "Zet het station liefst in de schaduw en minstens 1 meter van sproeiers."]),
  N("Maaier stopt of start niet", 1, "Regen (sommige modellen pauzeren), een oververhitte motor, of geen stroom op het station.", ["Bij regen of oververhitting start de maaier vaak vanzelf weer.", "Controleer of de voeding van het laadstation in het stopcontact zit; trek hem 10 seconden uit en steek hem terug.", "Maak de laadcontacten schoon."])],
  ["toppyRobot"], { also: "Husqvarna, Gardena, Worx, Bosch, Robomow, Wolf-Garten, McCulloch, Segway", tasks: [{ m: 1, t: "Onderkant schoonspuiten", v: 1 }] }));
(m => { m.faults = [...m.faults,
  N("Wielmotor overbelast (rechts of links)", 1, "Een aandrijfwiel ondervindt te veel weerstand.", ["Haal gras en andere rommel weg rond het aandrijfwiel.", "Haal obstakels van het maaipad, of leg de draad of een eiland om het obstakel heen.", "Zit de maaier vast? Haal hem eruit.", "Komt de melding steeds terug? Neem contact op met je Husqvarna-dealer."]),
  N("Maaier volgt het schema niet", 1, "Vaak normaal (accu laden, daglimiet bereikt, te warm of koud), of een instelling overschrijft het schema.", ["Kijk in de app of de maaier op Geparkeerd staat; kies dan Schema hervatten.", "Staat hij op Bijgebied? Zet hem terug op Hoofdgebied.", "Controleer of de weertimer, vorstbescherming (geen maaien onder 5 °C) of een slimme routine het maaien tegenhoudt.", "Controleer of datum en tijd goed staan.", "Wordt de tijd tussen het laden steeds korter? Dan is de accu mogelijk aan vervanging toe."])];
  m.src = [...m.src, "husqWiel", "husqSchema"]; })(MODELS.find(x => x.id === "husqvarna-automower"));
(m => { m.faults = [...m.faults,
  N("Lampje laadstation: wat betekent de kleur?", 1, "Constant groen: alles werkt. Blauw of geel knipperend: probleem met de begrenzingsdraad. Rood knipperend: onderbroken antenne. Constant rood: storing in de print of voeding.", ["Blauw of geel knippert? Controleer de aansluitingen van de draad op het laadstation en zoek naar een draadbreuk.", "Rood (knipperend of constant)? Neem contact op met de Gardena-klantenservice."])];
  m.src = [...m.src, "toppyRobot"]; })(MODELS.find(x => x.id === "gardena-sileno"));
Object.assign(SRC,{ daikinHyb: ["Daikin – uitgebreide handleiding gebruiker Altherma hybride warmtepomp (EJHA, pdf)", "https://www.daikin.nl/content/dam/document-library/user%20reference%20guide/heat/Hybrid%20heat%20pump/EJHA-AV3,NHY2KOMB-A_User%20reference%20guide_4PNL556862-1A_Dutch.pdf"] });
MODELS.push({ id: "daikin-altherma-hybride", brand: "Daikin", name: "Altherma hybride warmtepomp", cat: "warmtepompen", years: "Alle bouwjaren", unit: null, also: "EJHA, ook met een gasketel van een ander merk", intro: "Bij een storing toont de Daikin hybride warmtepomp een melding op het startscherm; druk erop voor meer uitleg. De storingsgeschiedenis vind je onder Informatie > Storingsbehandeling. Houd de cv-druk van de gasketel boven 1 bar.", weak: [], parts: [], tasks: [{ m: 1, t: "Cv-druk gasketel controleren (boven 1 bar)", v: 1 }, { m: 12, t: "Onderhoud door de installateur" }], src: ["daikinHyb"], faults: [
  N("Huis te koud of te warm", 1, "De gewenste temperatuur staat verkeerd, de aanvoertemperatuur is te laag of de stooklijn (weersafhankelijke curve) klopt niet.", ["Zet de gewenste kamertemperatuur hoger of lager; komt het elke dag terug, pas dan het programma aan.", "Wordt de temperatuur niet gehaald? Verhoog de gewenste aanvoerwatertemperatuur.", "Pas de weersafhankelijke curve aan, of vraag je installateur dat te doen.", "Gasketel van een ander merk die niet bijspringt? Laat de installateur de evenwichtstemperatuur iets verhogen (niet te hoog, dan presteert de warmtepomp slechter)."]),
  N("Kraanwater te koud", 1, "Het warme water in de tank is op of de tanktemperatuur staat te laag.", ["Zet direct de boosterstand van de tank aan (kost extra energie), of verhoog de tanktemperatuur als je kunt wachten.", "Komt het vaak voor? Verhoog de ingestelde tanktemperatuur of pas het programma aan."]),
  N("Storing in de warmtepomp", 3, "De warmtepomp is beschadigd of in storing.", ["Lees de melding op het scherm en bevestig opnieuw.", "Laat de gasketel de verwarming volledig overnemen (noodbedrijf); het gasverbruik stijgt dan flink.", "Neem contact op met je installateur voor reparatie."]),
  N("Gorgelen in de leidingen", 1, "Lucht in het systeem, vaak na de ingebruikname.", ["Kijk eerst of er een storingsmelding op het scherm staat.", "Geen melding? Dan mag je de radiatoren ontluchten. Liever laat je de installateur ontluchten met de ontluchtingsfunctie.", "Wél een melding? Zorg voor goede ventilatie bij het ontluchten: er kan koudemiddel in het water zijn gelekt. Bel dan je installateur."])] });
Object.assign(SRC,{ bekoVaatPompt: ["Beko – vaatwasser pompt het water niet weg", "https://www.beko.com/be-nl/Ondersteuning/Vaatwasmachine--problemen-oplossen--artikel/wat-moet-ik-doen-als-mijn-vaatwasmachine-het-water-niet-wegpompt"] });
MODELS.push(G("vaatwasser-pompt-niet-af", "Vaatwasser pompt niet af", "vaatwassers", "Blijft er water onderin je vaatwasser staan? Meestal is het filter verstopt of zit de afvoer dicht. Dit kun je bijna altijd zelf oplossen.", [
  N("Water blijft onderin staan", 1, "Vuil of verstopt filter, geknikte of verstopte afvoerslang, een dichte gootsteenafvoer of een scheve vaatwasser.", ["Trek het onderste rek eruit, haal het filter onderin los en spoel het schoon onder de kraan. Doe dit ongeveer elke week.", "Controleer of de afvoerslang niet geknikt is en aansluit op een afvoer tussen 50 en 100 cm boven de vloer.", "Giet water door de gootsteenafvoer om te testen of die vrij is. Verstopt? Gebruik een ontstopper, of schakel een loodgieter in.", "Kijk of de vaatwasser wiebelt en zet hem waterpas met de stelpootjes.", "Blijft het water staan? Neem contact op met een erkend servicebedrijf."])],
  ["bekoVaatPompt"], { also: VW, tasks: [{ m: 0.25, t: "Filter schoonspoelen", v: 1 }] }));
Object.assign(SRC,{ husqStart: ["Husqvarna – Automower start niet of blijft stoppen", "https://www.husqvarna.com/nl/ondersteuning/husqvarna-self-service/automower-start-niet-of-blijft-stoppen-ka-01503/"] });
(m => { m.faults = [...m.faults,
  N("Start niet of blijft stoppen", 1, "Iemand drukte STOP of pauze, een slimme routine (regen, vorst, dieren) houdt hem tegen, of na de winter is de accu diep leeg.", ["Melding Gestopt - handmatige actie vereist? Start de maaier op de maaier zelf; via de app kan dat dan niet.", "Gepauzeerd? Start hem opnieuw, eventueel via de app. Misschien heeft een andere gebruiker hem gepauzeerd.", "Controleer in de app (Meer > Smart Home) of een slimme routine hem tegenhoudt; die hervat vanzelf.", "Status Onderweg maar hij beweegt niet? Haal obstakels weg, kijk naar foutmeldingen en herstart hem.", "Draadloos model: wacht tot hij satellieten heeft gevonden en controleer internet en het referentiestation."]),
  N("Start niet na de winter", 1, "De accu is diep ontladen.", ["Laat de maaier binnen op kamertemperatuur komen.", "Zet hem een paar uur op het laadstation tot hij vol is.", "Herstart de maaier en kijk in de app naar foutmeldingen.", "Helpt dat niet? Neem contact op met je Husqvarna-dealer."])];
  m.src = [...m.src, "husqStart"]; })(MODELS.find(x => x.id === "husqvarna-automower"));
Object.assign(SRC,{ husqDuw: ["Husqvarna – waarom knippert de fout-led op mijn gazonmaaier?", "https://www.husqvarna.com/nl/ondersteuning/husqvarna-self-service/waarom-knippert-de-fout-led-op-mijn-gazonmaaier-veelvoorkomende-oorzaken-en-oplossingen-ka-70158/"] });
MODELS.push(G("accu-grasmaaier-stopt", "Accugrasmaaier stopt of fout-led knippert", "tuin", "Stopt je accugrasmaaier, vertraagt hij of knippert de fout-led? Meestal is het mes geblokkeerd, het gras te hoog of de accu te warm. Hoe vaak de led knippert verschilt per model: kijk in de handleiding.", [
  N("Mes geblokkeerd", 1, "Gras of vuil zit rond het mes.", ["Zet de veiligheidssleutel op 0 en haal de accu eruit; wacht minstens 5 seconden.", "Trek handschoenen aan en maak het mesgebied vrij.", "Blijft het? Neem contact op met de dealer."]),
  N("Motor vertraagt of stopt", 1, "Maaihoogte te laag, of dik of nat gras.", ["Stop en haal de accu eruit.", "Zet de maaihoogte hoger en start opnieuw. Zet hem niet te laag: het mes kan de grond raken."]),
  N("Accu of motor te warm", 1, "Oververhitting zet de maaier uit voor de veiligheid.", ["Zet de maaier uit en haal de accu eruit.", "Laat maaier en accu helemaal afkoelen voor je verder gaat."]),
  N("Accufout of geen signaal", 1, "De accu zit niet goed of er is vuil op de contacten.", ["Haal de accu eruit en zet hem opnieuw goed vast.", "Controleer de aansluiting op vuil en of hij recht zit.", "Knippert de led op de accu zelf ook? Kijk in de handleiding wat dat betekent."]),
  N("Start niet", 1, "De startprocedure ging te snel.", ["Laat de remhendel los, wacht 5 seconden en druk hem opnieuw in om te starten."])],
  ["husqDuw"], { also: "Husqvarna, Gardena, Bosch, Makita, Ryobi, Einhell, Greenworks" }));
Object.assign(SRC,{ cbDysonV15: ["Coolblue – aan de slag met de Dyson V12 en V15", "https://www.coolblue.nl/advies/aan-de-slag-met-de-dyson-v12-en-v15-steelstofzuigers.html"] });
(m => { m.faults = [...m.faults,
  N("Filtermelding op het scherm (V12, V15)", 1, "Het filter moet worden schoongemaakt of vervangen.", ["Volg de stappen op het scherm: maak het filter los, spoel het schoon en laat het helemaal drogen.", "Klop het filter af en toe uit, dan komt de melding later."]),
  N("Zuigt minder door volle bak of borstel", 1, "Een vol stofreservoir of haren rond de borstel blokkeren de luchtstroom; een te volle bak kan de motor beschadigen.", ["Leeg de bak regelmatig met de rode hendel en veeg hem af met een doek als hij stoffig is.", "Open het klepje aan de zijkant van de borstel en haal haren en vuil weg. De borstel is wasbaar (zie handleiding)."])];
  m.src = [...m.src, "cbDysonV15"]; })(MODELS.find(x => x.id === "dyson-v-serie"));
Object.assign(SRC,{ bekoIjs: ["Beko – ijsblokjesmaker maakt geen ijs", "https://www.beko.com/nl-nl/ondersteuning/koel-vriescombinatie--problemen-oplossen--artikel/wat-moet-ik-doen-als-mijn-ijsblokjesmaker-geen-ijs-maakt"], bekoDispGeen: ["Beko – geen water uit de waterdispenser", "https://www.beko.com/nl-nl/ondersteuning/koel-vriescombinatie--problemen-oplossen--artikel/wat-moet-ik-doen-als-er-geen-water-uit-de-waterdispenser-van-mijn-koelkast-komt"], bekoDispLek: ["Beko – waterdispenser lekt", "https://www.beko.com/nl-nl/ondersteuning/koel-vriescombinatie--problemen-oplossen--artikel/wat-moet-ik-doen-als-de-waterdispenser-lekt"] });
MODELS.push(G("waterdispenser-ijsmaker-werkt-niet", "Waterdispenser of ijsmaker werkt niet", "koelkasten", "Komt er geen water of ijs uit je Amerikaanse koelkast, of druppelt de dispenser? Vaak zit er lucht in de leiding, is het reservoir leeg of zit er ijs vast.", [
  N("Geen water uit de dispenser", 1, "Leeg reservoir, losse of verstopte aansluiting, geen watertoevoer, lucht in de leiding of te lage waterdruk.", ["Geen wateraansluiting? Vul het reservoir bij.", "Controleer of de aansluitingen goed vastzitten en niet verstopt zijn (zie handleiding).", "Kijk of er water uit de kraan komt en of de hoofdkraan open staat.", "Ontlucht: zet een grote bak eronder en druk ongeveer elke vijf seconden op de hendel tot er water komt. Ga door tot er zo'n 15 liter is getapt.", "Komt er nog niets? Haal het waterfilter eruit (volgens de handleiding) en kijk of er dan wel water komt; zo test je de waterdruk.", "Helpt niets? Neem contact op met een erkend servicebedrijf."]),
  N("Dispenser druppelt of lekt", 1, "Lucht in de leiding (na aansluiten of een nieuw filter) of een losse afdichting.", ["Ontlucht de leiding: tap met tussenpozen ongeveer 15 liter water.", "Zet het waterfilter opnieuw goed vast.", "Lekt het nog? Neem contact op met een erkend servicebedrijf."]),
  N("IJsmaker maakt geen ijs", 1, "Leeg reservoir, de vriezerdeur gaat te vaak open, verstopte of losse aansluiting, of ijs dat vastzit.", ["Vul het reservoir bij als je koelkast niet op de waterleiding zit.", "Open de vriezerdeur minder vaak en korter.", "Controleer of de wateraansluitingen goed vastzitten.", "Kijk of er ijsblokjes vastzitten in de ijsmaker of in de goot naar de dispenser.", "Blijft het? Neem contact op met een erkend servicebedrijf."])],
  ["bekoDispGeen", "bekoDispLek", "bekoIjs"], { also: "Samsung, LG, Beko, Haier, Whirlpool, Bosch, Siemens" }));
Object.assign(SRC,{ bekoKoelLekt: ["Beko – koelkast lekt", "https://www.beko.com/nl-nl/ondersteuning/koel-vriescombinatie--problemen-oplossen--artikel/wat-moet-ik-doen-als-mijn-koelkast-lekt"] });
(m => { m.faults = [...m.faults,
  N("Water onder of voor de koelkast", 1, "De opvangbak voor dooiwater loopt over omdat de koelkast scheef staat, de dooiwaterafvoer is verstopt, of een wateraansluiting lekt.", ["Beweeg de koelkast heen en weer. Wiebelt hij? Zet hem waterpas met de stelpootjes op een vlakke vloer.", "Haal de groentelades eruit en kijk of de dooiwaterafvoer verstopt is. Maak hem vrij met een ontstoppingsveertje en spoel na met warm water.", "Heb je een waterdispenser of wateraansluiting? Controleer of de aansluitingen goed vastzitten."])];
  m.src = [...m.src, "bekoKoelLekt"]; })(MODELS.find(x => x.id === "koelkast-water-condens"));
module.exports = { CATS, MODELS, SRC };
