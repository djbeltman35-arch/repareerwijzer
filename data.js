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
  { id: "tuin", name: "Robotmaaiers", one: "robotmaaier", intro: "Messen, winterbeurt en storingen van robotmaaiers." },
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
    F("W011", "Snelheid wordt niet gemeten", 2, "Sensor of magneet op de remschijf.", ["Laat de dealer de positie van de snelheidssensor en de magneet controleren."]),
    F("W013", "Koppelsensor niet goed opgestart", 1, "Voet stond op het pedaal bij het aanzetten.", ["Haal je voet van het pedaal.", "Zet de accu uit en weer aan met de knop."]),
    F("W020", "Accu buiten temperatuurbereik", 1, "Te warm of te koud.", ["Laat de accu in de schaduw afkoelen of binnen opwarmen."]),
    F("E010", "Systeemfout", 1, "Tijdelijke storing.", ["Start opnieuw met de aan-knop.", "Komt de code terug, ga naar de dealer."]),
    F("E013", "Afwijking in de firmware van de motor", 3, "Firmware.", ["Neem contact op met je dealer."]),
    F("E014", "Snelheidssensor mogelijk verkeerd gemonteerd", 3, "Montage.", ["Neem contact op met je dealer."]),
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

{ id: "atag-vaatwasser", brand: "Atag", name: "Vaatwasser (alle modellen)", cat: "vaatwassers", years: "Alle bouwjaren met display", unit: null,
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

{ id: "aeg-zanussi-kookplaat", brand: "AEG / Zanussi", name: "Inductie- en elektrische kookplaat", cat: "kookplaten", years: "Alle bouwjaren", unit: null, also: "Ook Electrolux",
  intro: "AEG, Zanussi en Electrolux gebruiken dezelfde meldingen op het display.", weak: ["Een la of kastje onder de kookplaat dat de ventilator blokkeert."], parts: [], tasks: [],
  faults: [
    F("E3 / E8", "Spanning te laag of te hoog", 3, "Meestal een verkeerde aansluiting.", ["Laat de elektrische aansluiting controleren door een erkend installateur."]),
    F("E4", "Oververhittingsbeveiliging", 1, "Meestal een drooggekookte pan.", ["Zet de kookzone uit, laat een paar minuten afkoelen en zet weer aan."]),
    F("E7", "Probleem met de ventilator", 1, "Ventilator geblokkeerd of te weinig ventilatie.", ["Controleer of niets in een la of kastje onder de kookplaat de ventilator blokkeert.", "Controleer of de kookplaat goed is ingebouwd."]),
    F("F", "Probleem met de pan", 1, "Pan niet geschikt, te klein of niet in het midden.", ["Zet de pan midden op de zone en gebruik een pan die geschikt is voor inductie.", "Op een flexibele zone met ProCook: maar één pan per zone."]),
    F("L", "Toetsenblokkering of kinderslot aan", 1, "Geen storing.", ["Zet het kinderslot uit volgens de handleiding."])],
  src: ["aegKook"] },

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
    F("F22", "Geen of te weinig water, druk te laag", 2, "Te weinig water, of een defecte druksensor, pomp of expansievat.", ["Vul bij volgens je handleiding als de druk te laag is.", "Vaillant raadt aan de oorzaak niet zelf te repareren: bel de installateur als de code terugkomt."]),
    F("F28", "Geen vlam bij ontsteken", 2, "Bevroren condensafvoer, gastoevoer of ontsteking.", ["Controleer of de gas aan staat en andere gasapparaten werken.", "Bij vorst: giet warm (geen kokend) water over de bevroren condensafvoer buiten.", "Reset de ketel volgens de handleiding.", "Komt de code terug, bel de installateur."]),
    F("F29", "Vlam gaat uit", 2, "Vaak een bevroren condensafvoer bij vorst.", ["Ontdooi de condensafvoer met warm water en isoleer de leiding daarna.", "Komt de code terug, bel de installateur."])],
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
    F("109 / 110 / 112 / 114 / 142 / 201 / 203 / 303 / 304", "Storing in sensor, pomp of printplaat", 3, "Onderdeel of te vaak gereset.", installer)],
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

module.exports = { CATS, MODELS, SRC };
