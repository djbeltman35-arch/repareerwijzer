// Kennisbank: uitlegartikelen. Elke uitspraak komt uit de genoemde bronnen.
const A = [
{
  id: "cv-ketel-druk-zakt",
  cat: "cv-ketels",
  q: "Waarom zakt de druk van mijn cv-ketel?",
  title: "Druk cv-ketel zakt: oorzaken, bijvullen en wanneer bellen",
  desc: "De druk van een cv-ketel hoort tussen 1,5 en 2 bar. Waarom zakt hij, hoe vul je bij en wanneer is vaker bijvullen een teken van een lek of kapot expansievat?",
  lead: "De waterdruk van een cv-ketel hoort tussen 1,5 en 2 bar te staan. Een beetje drukverlies over een stookseizoen is normaal. Moet je vaak bijvullen, dan is er iets aan de hand.",
  secs: [
    ["Welke druk is goed?", `<ul><li><b>1,5 tot 2 bar</b>: goed.</li><li><b>1 tot 1,5 bar</b>: kan, maar let op dat de druk niet verder daalt.</li><li><b>Onder 1 bar</b>: de ketel werkt niet goed en kan stoppen.</li><li><b>Boven 2 bar</b>: het expansievat kan beschadigd raken, boven 2,5 bar op lange termijn ook de pomp. Rond 2,8 bar laat het overstortventiel water weglopen.</li></ul>`],
    ["Waarom zakt de druk?", `<ul><li><b>Normaal drukverlies</b>: langzaam zakken over een stookseizoen hoort erbij. Ook na het ontluchten van radiatoren zakt de druk.</li><li><b>Kapot expansievat</b>: het rubberen membraan scheurt, het vat loopt vol water en vangt de drukschommelingen niet meer op. Er loopt dan water uit het overstortventiel. Tik tegen de boven- en onderkant van het vat: klinken beide dof, dan zit het vol water.</li><li><b>Lekkage</b>: een druppelende koppeling is al genoeg. Bij oudere ketels kan ook de warmtewisselaar lekken. Kalkaanslag of lekkagesporen in de cv-kast zijn een aanwijzing.</li><li><b>Defect overstortventiel</b>: het ventiel blijft druppelen.</li></ul>`],
    ["Zo vul je bij", `<ol><li>Zet de thermostaat op de laagste stand en wacht tot de ketel is afgeslagen en ongeveer 40 °C aangeeft.</li><li>Sluit de vulslang aan op de vulkraan.</li><li>Open de vulkraan (bij één kraan is een kwartslag genoeg).</li><li>Stop als de naald midden in het groene vlak staat. Bij een meter met twee naalden moeten ze op elkaar staan.</li><li>Sluit de vulkraan en de waterkraan.</li><li>Ontlucht alle radiatoren en zet de thermostaat terug.</li><li>Controleer de druk na minimaal 24 uur opnieuw.</li></ol><p>Is de druk te hoog? Ontlucht eerst de radiatoren. Helpt dat niet, laat dan via de vulslang wat water in een emmer lopen.</p>`],
    ["Hoe vaak bijvullen is normaal?", `<p>Controleer de druk aan het begin van het stookseizoen, daarna ongeveer om de twee maanden en altijd na het ontluchten. Eén of twee keer per jaar bijvullen is meestal geen probleem. Moet je na een week alweer bijvullen, dan is een lek of een kapot expansievat waarschijnlijk: bel dan je installateur of onderhoudsbedrijf.</p>`]
  ],
  faq: [
    ["Wat is de juiste druk van een cv-ketel?", "Tussen 1,5 en 2 bar. Tussen 1 en 1,5 bar kan ook, maar houd dan in de gaten dat de druk niet verder daalt."],
    ["Hoe vaak moet je een cv-ketel bijvullen?", "Eén of twee keer per jaar is meestal geen probleem. Moet je na ongeveer een week alweer bijvullen, dan is er waarschijnlijk een lek of een kapot expansievat."],
    ["Wat gebeurt er als de druk te hoog is?", "Boven 2 bar kan het expansievat beschadigd raken en boven 2,5 bar op lange termijn de pomp. Rond 2,8 bar laat het overstortventiel water weglopen."]
  ],
  src: [["ID.nl – Zo check je de druk van je cv-ketel en stel je hem goed af", "https://id.nl/energie-en-klimaat/elektriciteit/energiezuinigheid/zo-check-je-de-druk-van-je-cv-ketel-en-stel-je-hem-goed-af"]],
  rel: [["cv-ketel-waterdruk.html", "Cv-ketel: druk te laag en resetten"], ["kennisbank-radiatoren-ontluchten.html", "Radiatoren ontluchten"], ["cv-ketels.html", "Alle cv-ketels en foutcodes"]]
},
{
  id: "radiatoren-ontluchten",
  cat: "cv-ketels",
  q: "Hoe ontlucht je radiatoren?",
  title: "Radiatoren ontluchten: stappenplan en signalen",
  desc: "Tikt of borrelt je verwarming, of wordt een radiator bovenaan niet warm? Zo ontlucht je je radiatoren in tien stappen en controleer je daarna de druk.",
  lead: "Tikt of borrelt de verwarming, of blijft een radiator bovenaan koud? Dan zit er lucht in het systeem. Ontluchten kun je prima zelf.",
  secs: [
    ["Zit er lucht in?", `<ul><li>Je hoort tikken of klikken in de radiatoren.</li><li>Sommige radiatoren worden niet goed warm.</li><li><b>Bovenaan koud, onderaan warm</b>: meestal veel lucht.</li><li><b>Onderaan koud</b>: dat wijst meestal op roest of slib, niet op lucht. Doorspoelen is werk voor een vakman.</li></ul>`],
    ["Stappenplan", `<ol><li>Zet alle radiatorkranen helemaal open, ook van kamers die je weinig gebruikt.</li><li>Zet de thermostaat hoog, bijvoorbeeld op 25 °C, zodat de lucht naar de ontluchtingsnippels gaat.</li><li>Zet na ongeveer 15 minuten de verwarming uit door de thermostaat laag te zetten (bijvoorbeeld 15 °C), of haal de stekker van de ketel eruit.</li><li>Wacht 10 minuten en draai alle radiatorkranen dicht.</li><li>Begin bij de laagste radiator en werk naar boven.</li><li>Zoek de ontluchtingsnippel: een klein vierkant nippeltje bovenin een hoek. Niet verwarren met de aftapkraantjes onderaan.</li><li>Draai de nippel met een ontluchtingssleutel ongeveer een halve slag linksom open. Houd een bakje of doek eronder. Je hoort sissen, dan sputteren, dan komt er een straaltje water (dat heet kan zijn). Donker water is normaal.</li><li>Draai de nippel dicht zodra er een gelijkmatige straal water komt.</li><li>Zet de radiatoren die je gebruikt weer open.</li><li>Zet de thermostaat terug of steek de stekker van de ketel weer in.</li></ol>`],
    ["Daarna: druk controleren", `<p>Kijk na ongeveer 15 minuten op de drukmeter van de ketel. De druk hoort tussen 1,5 en 2 bar te staan. Is hij lager, vul dan bij. Controleer ook of alle radiatoren weer goed warm worden.</p>`]
  ],
  faq: [
    ["Waarom tikt mijn verwarming?", "Tikken of klikken in de radiatoren is een teken dat er lucht in het systeem zit. Ontluchten helpt dan meestal."],
    ["Moet de cv-ketel uit bij het ontluchten?", "Zet de verwarming eerst ongeveer 15 minuten hoog, daarna uit (thermostaat laag of stekker eruit) en wacht 10 minuten voordat je begint."],
    ["Mijn radiator is onderaan koud, helpt ontluchten?", "Meestal niet: een koude onderkant wijst op roest of slib. Doorspoelen laat je doen door een vakman."]
  ],
  src: [["ID.nl – Stappenplan: radiatoren op de juiste manier ontluchten", "https://id.nl/energie-en-klimaat/klimaat-en-luchtkwaliteit/klimaatbeheersing/stappenplan-radiatoren-op-de-juiste-manier-ontluchten"]],
  rel: [["kennisbank-cv-ketel-druk-zakt.html", "Waarom zakt de druk van mijn cv-ketel?"], ["cv-ketel-waterdruk.html", "Cv-ketel: druk te laag en resetten"]]
},
{
  id: "rookmelder-regels",
  cat: "rookmelders",
  q: "Hoeveel rookmelders moet ik hebben, en waar?",
  title: "Rookmelder verplicht: hoeveel, waar ophangen en wie betaalt",
  desc: "Sinds 1 juli 2022 is een rookmelder verplicht op elke verdieping. Waar hang je hem op, wie moet hem plaatsen (eigenaar of verhuurder) en hoe onderhoud je hem?",
  lead: "Sinds 1 juli 2022 is een rookmelder verplicht op iedere verdieping van je huis met een woonkamer, slaapkamer of keuken.",
  secs: [
    ["Waar is een rookmelder verplicht?", `<p>Op elke verdieping met een woonkamer, slaapkamer of keuken. Een zolder of kelder die je alleen als berging of droogruimte gebruikt, valt er niet onder.</p>`],
    ["Waar hang je hem op?", `<ul><li>Bij voorkeur in de hal, aan het plafond.</li><li>Minimaal 50 cm van een muur of hoek en minimaal 30 cm van een lamp.</li><li>Niet bij ventilatieopeningen of de verwarming.</li><li>Bevestig de melder met de plakker of een schroef, en lees eerst de gebruiksaanwijzing.</li></ul>`],
    ["Wie moet hem plaatsen?", `<ul><li><b>Eigen huis</b>: de eigenaar.</li><li><b>Huurhuis</b>: de verhuurder zorgt dat er rookmelders zijn.</li><li><b>Appartement met vve</b>: de bewoner of eigenaar plaatst ze in de eigen woning. Het trappenhuis en de entree vallen er niet onder.</li></ul>`],
    ["Kopen en onderhouden", `<ul><li>Kies een melder die minimaal 10 jaar meegaat en de norm (N)EN 14604 heeft. Een rookmelder kost ongeveer €16.</li><li>Test de rookmelder regelmatig.</li><li>Zuig de melder ongeveer elke maand stofvrij, zodat stof geen vals alarm geeft.</li><li>Vervang losse batterijen op tijd; een sticker met de datum helpt.</li></ul>`]
  ],
  faq: [
    ["Is een rookmelder verplicht?", "Ja, sinds 1 juli 2022 is een rookmelder verplicht op iedere verdieping van je huis met een woonkamer, slaapkamer of keuken."],
    ["Moet de verhuurder rookmelders plaatsen?", "Ja. In een huurwoning moet de verhuurder zorgen dat er rookmelders aanwezig zijn."],
    ["Waar hang je een rookmelder op?", "Bij voorkeur in de hal aan het plafond, minimaal 50 cm van een muur of hoek, minimaal 30 cm van een lamp en niet bij ventilatieopeningen of verwarming."]
  ],
  src: [["Rijksoverheid – Hoeveel rookmelders moet ik in mijn huis hebben?", "https://www.rijksoverheid.nl/onderwerpen/gezond-en-veilig-wonen/vraag-en-antwoord/hoeveel-rookmelders-moet-ik-in-mijn-huis-hebben"], ["Hart van Nederland – Rookmelder vanaf 1 juli verplicht op elke verdieping (2022)", "https://www.hartvannederland.nl/nieuws/economie/rookmelder-vanaf-1-juli-verplicht-op-elke-verdieping-dit-moet-je-weten"]],
  rel: [["rookmelder-vals-alarm.html", "Rookmelder gaat zomaar af of piept"], ["rookmelders.html", "Alle rookmelders en CO-melders"], ["kennisbank-koolmonoxide.html", "Koolmonoxide herkennen en voorkomen"]]
},
{
  id: "koolmonoxide",
  cat: "rookmelders",
  q: "Hoe herken en voorkom je koolmonoxide?",
  title: "Koolmonoxide: klachten herkennen, voorkomen en CO-melder ophangen",
  desc: "Hoofdpijn, duizelig en misselijk als de verwarming aan staat? Zo herken je koolmonoxidevergiftiging, zo voorkom je het en zo hang je een CO-melder goed op.",
  safety: "Vermoed je koolmonoxide of gaat de CO-melder af? Ga direct naar buiten en bel 112.",
  lead: "Koolmonoxide (CO) kan ontstaan bij verbrandingstoestellen, zoals gastoestellen voor verwarming en warm water. Lichte klachten lijken op griep, daarom wordt een vergiftiging snel gemist.",
  secs: [
    ["Welke klachten?", `<ul><li><b>Licht</b>: hoofdpijn, duizeligheid, misselijkheid, braken en wazig zien. Hoofdpijn en duizeligheid komen het meest voor.</li><li><b>Matig</b>: verwardheid, flauwvallen, pijn op de borst, kortademigheid en spierzwakte.</li><li><b>Ernstig</b>: lage bloeddruk, hartritmestoornissen, stuipen, ademstilstand en coma.</li></ul><p>Omdat lichte klachten lijken op griep of voedselvergiftiging, is de situatie vaak de beste aanwijzing: klachten die ontstaan als een verbrandingstoestel aan staat.</p>`],
    ["Voorkomen: ventileer, controleer, alarmeer", `<ul><li><b>Ventileer</b>: laat 24 uur per dag, zeven dagen per week een rooster open of een raam op een kier.</li><li><b>Controleer</b>: laat verbrandingstoestellen minstens één keer per jaar onderhouden door een gecertificeerde vakman. Sinds 1 juli 2020 mogen alleen gecertificeerde installateurs gasinstallaties voor verwarming en warm water plaatsen en onderhouden.</li><li><b>Alarmeer</b>: hang een koolmonoxidemelder op, in ieder geval in de ruimte met het verwarmingstoestel. Kies een melder met de norm EN 50291-1 en let op de vervaldatum.</li></ul>`],
    ["Zo hang je een CO-melder op", `<ul><li>In een ruimte met een verbrandingstoestel: aan het plafond, 1 tot 3 meter van het toestel, minstens 30 cm van muren, niet achter gordijnen of kasten en niet naast luchtinlaten of -uitlaten.</li><li>In een ruimte zonder toestel waar je veel bent: op ademhoogte.</li></ul><p>Let op: gewone melders geven pas alarm vanaf ongeveer 30 ppm. Lage concentraties merken ze niet betrouwbaar op.</p>`]
  ],
  faq: [
    ["Wat zijn de klachten van koolmonoxidevergiftiging?", "Bij een lichte vergiftiging vooral hoofdpijn en duizeligheid, en verder misselijkheid, braken en wazig zien. Bij ernstigere vergiftiging verwardheid, flauwvallen, pijn op de borst en kortademigheid."],
    ["Waar hang je een koolmonoxidemelder op?", "In de ruimte met het verbrandingstoestel aan het plafond, 1 tot 3 meter van het toestel en minstens 30 cm van muren. In een ruimte zonder toestel op ademhoogte."],
    ["Hoe vaak moet een cv-ketel onderhouden worden?", "Laat verbrandingstoestellen minstens één keer per jaar onderhouden door een gecertificeerde vakman."]
  ],
  src: [["RIVM – GGD-richtlijn koolmonoxide: risico's verbrandingstoestellen", "https://www.rivm.nl/ggd-richtlijn-mmk-koolmonoxide/voorlichting-koolmonoxide/risicos-verbrandingstoestellen"], ["RIVM – Werkingsmechanismen en symptomen koolmonoxidevergiftiging", "https://www.rivm.nl/ggd-richtlijn-mmk-koolmonoxide/gezondheidseffecten-koolmonoxide/werkingsmechanismen-symptomen-koolmonoxidevergiftiging"]],
  rel: [["kidde-co-melder.html", "Kidde CO-melder: piepjes en lampjes"], ["rookmelders.html", "Alle rookmelders en CO-melders"], ["eerste-hulp-bij-storingen.html", "Eerste hulp bij storingen"]]
},
{
  id: "omvormer-valt-uit-hoge-netspanning",
  cat: "zonnepanelen",
  q: "Waarom valt mijn omvormer uit als de zon schijnt?",
  title: "Omvormer valt uit bij zon: te hoge netspanning",
  desc: "Valt je zonnepanelen-omvormer uit op zonnige dagen? Meestal is de netspanning te hoog (boven 253 volt). Wat het betekent en wat je kunt doen.",
  lead: "Valt je omvormer juist op zonnige middagen uit? Dan is de spanning op het stroomnet waarschijnlijk te hoog. De omvormer schakelt zich dan automatisch uit, zo is het wettelijk geregeld.",
  secs: [
    ["Wat gebeurt er?", `<p>De netspanning is normaal 230 volt, met een marge van ongeveer 10%: tussen 207 en 253 volt. Als veel mensen tegelijk stroom terugleveren, stijgt de spanning. Boven 253 volt schakelt de omvormer uit. Hij kan ook uitschakelen als de spanning langer dan 10 minuten op 250 volt of hoger blijft. Zodra de spanning weer normaal is, schakelt hij meestal vanzelf weer in.</p><p>De netbeheerder zet je omvormer niet zelf uit: dat gebeurt automatisch.</p>`],
    ["Wat kun je doen?", `<ol><li>Gebruik de stroom zoveel mogelijk zelf op het moment dat de zon schijnt, bijvoorbeeld door de wasmachine of vaatwasser dan te laten draaien.</li><li>Valt hij vaak uit? Meld de hoge netspanning bij je netbeheerder. Die moet de spanning meten en het probleem binnen een redelijke termijn oplossen.</li><li>Heb je een 3-fase-aansluiting en een 1-fase-omvormer? Soms kan de installateur de omvormer op een andere fase aansluiten.</li></ol>`]
  ],
  faq: [
    ["Bij welke spanning schakelt een omvormer uit?", "Boven 253 volt, of als de spanning langer dan 10 minuten op 250 volt of hoger blijft."],
    ["Zet de netbeheerder mijn zonnepanelen uit?", "Nee. De omvormer schakelt automatisch uit bij te hoge spanning. Zodra de spanning weer normaal is, gaat hij meestal vanzelf weer aan."],
    ["Bij wie meld ik hoge netspanning?", "Bij je netbeheerder. Die moet de spanning meten en het probleem binnen een redelijke termijn oplossen."]
  ],
  src: [["Zonneplan – Hoge netspanning", "https://www.zonneplan.nl/zonnepanelen/hoge-netspanning"], ["AVROTROS Radar – Waarom jouw zonnepanelen soms automatisch worden uitgezet", "https://radar.avrotros.nl/artikel/waarom-jouw-zonnepanelen-soms-automatisch-worden-uitgezet-60728"]],
  rel: [["omvormer-resetten.html", "Omvormer resetten"], ["zonnepanelen.html", "Alle omvormers en foutcodes"]]
},
{
  id: "garantie-apparaat-kapot",
  cat: null,
  q: "Apparaat kapot: heb ik recht op gratis reparatie?",
  title: "Apparaat kapot binnen of na de garantie: je rechten",
  desc: "Wasmachine of tv kapot? In Nederland geldt geen vaste garantietermijn. Wanneer heb je recht op gratis reparatie, wie moet het bewijzen en bij wie meld je het?",
  lead: "In Nederland heb je altijd recht op een product dat goed werkt, zo lang als je redelijkerwijs mag verwachten. Daar staat geen vaste termijn voor.",
  secs: [
    ["Wettelijke garantie", `<p>Bij elke aankoop heb je wettelijke garantie: recht op een goed product. Er is geen vaste termijn; het hangt af van het product. Van een wasmachine mag je verwachten dat hij langer meegaat dan kinderschoenen. Is het product kapot, dan heb je recht op gratis reparatie, een nieuw product of je geld terug. Dat geldt niet als je het zelf hebt veroorzaakt of als het om normale slijtage gaat.</p>`],
    ["Wie moet wat bewijzen?", `<ul><li><b>Binnen 12 maanden na aankoop</b>: de verkoper moet bewijzen dat het jouw schuld is, bijvoorbeeld door verkeerd gebruik.</li><li><b>Na 12 maanden</b>: jij moet aantonen dat het defect niet jouw schuld is en in het product zelf zit.</li></ul>`],
    ["Bij wie meld je het?", `<p>Bij de <b>verkoper</b>, niet bij de fabrikant. De verkoper moet een oplossing bieden. Een fabrieks- of verkopersgarantie komt bovenop je wettelijke recht en geldt een vaste periode, bijvoorbeeld een jaar. Ook na die periode kan je wettelijke recht nog gelden: gaat de motor van een wasmachine na twee jaar kapot bij normaal gebruik, dan kun je nog recht hebben op gratis reparatie of een nieuw apparaat. Onderdelen die gewoon slijten, zoals een lampje in de koelkast, vervang je meestal zelf.</p>`],
    ["Extra garantie kopen?", `<p>Bijgekochte garantie kost geld. Het loont alleen als die je meer rechten geeft dan de wettelijke garantie. Lees dus eerst de voorwaarden.</p><p class="muted">Dit is algemene informatie, geen juridisch advies.</p>`]
  ],
  faq: [
    ["Hoe lang is de garantie op een apparaat?", "In Nederland geldt geen vaste wettelijke garantietermijn. Een product moet zo lang meegaan als je redelijkerwijs mag verwachten; dat verschilt per product."],
    ["Moet ik naar de winkel of de fabrikant?", "Naar de verkoper. De verkoper moet een oplossing bieden: gratis reparatie, een nieuw product of je geld terug."],
    ["Wie moet bewijzen dat het defect niet mijn schuld is?", "Binnen 12 maanden na aankoop moet de verkoper bewijzen dat het jouw schuld is. Daarna moet jij aantonen dat het defect in het product zelf zit."]
  ],
  src: [["Rijksoverheid – Welke garanties heb ik op een product?", "https://www.rijksoverheid.nl/onderwerpen/bescherming-van-consumenten/vraag-en-antwoord/welke-garanties-heb-ik-op-een-product"]],
  rel: [["recht-op-reparatie.html", "Recht op reparatie"], ["repareren-of-vervangen.html", "Repareren of vervangen?"]]
},
{
  id: "wasmachine-onderhoud",
  cat: "wasmachines",
  q: "Hoe onderhoud je een wasmachine?",
  title: "Wasmachine onderhouden: pompfilter, zeepbakje en heet wassen",
  desc: "Voorkom storingen en vieze luchtjes: maak het pompfilter elk half jaar schoon, spoel het zeepbakje en draai eens per maand een hete was. Zo doe je het.",
  lead: "Met een paar minuten onderhoud houd je je wasmachine schoon. Een plas water onder de machine is vaak al opgelost door het pompfilter schoon te maken.",
  secs: [
    ["Pompfilter: minstens elk half jaar", `<ol><li>Open het klepje van het filter, onderaan de voorkant.</li><li>Zet een bak eronder en laat het restwater weglopen.</li><li>Draai het filter los en haal pluizen en vuil eruit.</li><li>Draai het filter weer vast.</li></ol><p>Een plas water onder de machine is vaak al opgelost door het filter schoon te maken.</p>`],
    ["Zeepbakje en deurrubber", `<ul><li>Maak het zeepbakje regelmatig schoon: in aangekoekte zeepresten groeien bacteriën. Trek het bakje er helemaal uit en spoel het goed af, bijvoorbeeld met de harde straal van de douchekop.</li><li>Neem de deurrubber en de scharnieren af met een vochtige doek.</li></ul>`],
    ["Heet wassen en ontkalken", `<ul><li>Draai ongeveer eens per maand een lege of lichte was op 90 °C (of minstens 75 °C als je machine niet heter kan), zeker als je meestal op lage temperatuur wast.</li><li>Ontkalk met een ontkalker zoals de fabrikant in de handleiding aanraadt. Was je veel, dan maandelijks; anders niet te vaak.</li><li>Gebruik niet minder wasmiddel dan aangegeven: dat kan juist meer kalkaanslag geven.</li></ul>`]
  ],
  faq: [
    ["Hoe vaak moet je het pompfilter van de wasmachine schoonmaken?", "Minstens elk half jaar, of vaker als je wilt."],
    ["Waarom staat er water onder mijn wasmachine?", "Vaak is het pompfilter vuil of niet goed vastgedraaid. Schoonmaken en goed vastdraaien lost het dan op."],
    ["Hoe vaak moet je een hete was draaien?", "Ongeveer eens per maand een lege of lichte was op 90 °C, of minstens 75 °C."]
  ],
  src: [["ID.nl – Je wasmachine onderhouden? Let hier op", "https://id.nl/huis-en-entertainment/huishouden/wassen-en-drogen/je-wasmachine-onderhouden-let-hier-op"]],
  rel: [["wasmachines.html", "Alle wasmachines en foutcodes"], ["repareren-of-vervangen.html", "Repareren of vervangen?"]]
},
{
  id: "vaatwasser-onderhoud",
  cat: "vaatwassers",
  q: "Hoe onderhoud je een vaatwasser?",
  title: "Vaatwasser onderhouden: filter, sproeiarmen, zout en glansmiddel",
  desc: "Vaat niet schoon of vlekken op de glazen? Maak het filter elke week schoon, vul zout en glansspoelmiddel bij (ook met all-in-one tabletten) en stel de waterhardheid in.",
  lead: "Vaat niet schoon of vlekken op de glazen? Met vast onderhoud en genoeg zout en glansspoelmiddel voorkom je verstoppingen, kalk en vlekken.",
  secs: [
    ["Schoonmaakschema", `<ul><li><b>Filter, elke week</b>: haal het eruit en spoel het onder heet water met een beetje afwasmiddel.</li><li><b>Leeg heet programma, elke 2 à 3 maanden</b>: draai een leeg programma op de hoogste temperatuur om vet op te lossen.</li><li><b>Deurrubbers, elk kwartaal</b>: schrob ze met warm sop en een oude tandenborstel. Geen agressieve middelen, die tasten het rubber aan.</li><li><b>Sproeiarmen, twee keer per jaar</b>: haal ze eruit, spoel ze af en prik verstopte gaatjes open met een satéprikker.</li></ul>`],
    ["Zout: ook met all-in-one tabletten", `<p>Nederlands kraanwater is hard. Het zout zorgt dat de waterontharder in de vaatwasser kalk uit het water haalt. Zonder zout krijg je kalk op het verwarmingselement, doffe glazen en verstopte filters en sproeiarmen.</p><ul><li>All-in-one tabletten bevatten zout en glansmiddel, maar soms te weinig. Bij zacht water (onder 8 °dH) is het tablet meestal genoeg; vanaf 8 °dH moet je mogelijk zout bijvullen.</li><li>Gebruik alleen vaatwaszout, geen keukenzout.</li><li>Zoek de waterhardheid op bij je waterbedrijf en stel die in in het menu van de vaatwasser.</li></ul>`],
    ["Glansspoelmiddel", `<p>Glansspoelmiddel laat het water van de vaat aflopen in plaats van op te drogen tot vlekken, en de vaat droogt sneller. Strepen of vlekken: dosering te laag. Een blauwe waas of regenboogglans: dosering te hoog.</p>`]
  ],
  faq: [
    ["Hoe vaak moet je het filter van de vaatwasser schoonmaken?", "Elke week: haal het eruit en spoel het onder heet water met een beetje afwasmiddel."],
    ["Heb je zout nodig met all-in-one tabletten?", "Bij water vanaf 8 °dH vaak wel, omdat het tablet te weinig zout kan bevatten. Nederlands kraanwater is meestal hard."],
    ["Waarom zitten er vlekken op mijn glazen?", "Strepen of vlekken betekenen meestal te weinig glansspoelmiddel. Een blauwe waas of regenboogglans betekent juist te veel."]
  ],
  src: [["ID.nl – Zo houd je je vaatwasser schoon en fris", "https://id.nl/huis-en-entertainment/koken-en-tafelen/keukenapparatuur/zo-houd-je-je-vaatwasser-schoon-en-fris-de-beste-tips"], ["ID.nl – Zout en glansspoelmiddel in de vaatwasser: zo zit het", "https://id.nl/huis-en-entertainment/koken-en-tafelen/keukenapparatuur/waarom-je-vaatwasser-zout-en-glansspoelmiddel-nodig-heeft-ook-met-all-in-one-tabletten"]],
  rel: [["vaatwassers.html", "Alle vaatwassers en foutcodes"]]
},
{
  id: "ebike-accu-veilig-laden",
  cat: "e-bikes",
  q: "Hoe laad je een e-bike-accu veilig op?",
  title: "E-bike-accu veilig opladen en bewaren",
  desc: "Laad je e-bike-accu overdag met de originele lader, niet binnen, en haal de stekker eruit als hij vol is. Wat te doen bij een gevallen accu of rook tijdens het laden.",
  safety: "Rook, brand of lekkage tijdens het laden? Haal meteen de stekker eruit, blus niet met water en bel 112.",
  lead: "Een e-bike-accu is veilig als je hem goed behandelt. Met deze tips verklein je de kans op brand en gaat de accu langer mee.",
  secs: [
    ["Veilig laden", `<ul><li>Gebruik alleen de oplader die bij de e-bike is geleverd.</li><li>Laad overdag, niet 's nachts, en haal de stekker eruit zodra de accu vol is.</li><li>Laad niet binnenshuis, maar op een stabiele ondergrond waar de accu niet kan vallen.</li><li>Zorg dat de oplader zijn warmte kwijt kan.</li><li>Je hoeft niet altijd tot 100% te laden; dat is alleen nodig voor een lange tocht.</li></ul>`],
    ["Bewaren", `<ul><li>Bewaar fiets en accu niet in een verwarmd huis, maar in een schuur, berging of garage.</li><li>Laat de accu niet urenlang in de volle zon staan.</li><li>Houd de accu droog; hij is niet waterdicht.</li><li>Zet de fiets niet in de vluchtweg, hang een rookmelder in de buurt en houd een brandblusser bij de hand.</li><li>Gebruik de fiets regelmatig, ook als het koud is.</li></ul>`],
    ["Accu gevallen of beschadigd?", `<p>Na een val kan kortsluiting ontstaan. Leg een gevallen, beschadigde of vervormde accu buiten neer en laat hem testen door de fietsenmaker of een gespecialiseerd bedrijf.</p>`]
  ],
  faq: [
    ["Mag je een e-bike-accu 's nachts opladen?", "Het advies is om overdag te laden en de stekker eruit te halen zodra de accu vol is."],
    ["Wat doe je als een e-bike-accu gaat roken?", "Haal meteen de stekker uit het stopcontact, blus niet met water en bel 112."],
    ["Mijn accu is gevallen, kan ik hem nog gebruiken?", "Leg hem buiten neer en laat hem eerst testen door de fietsenmaker of een gespecialiseerd bedrijf. Na een val kan kortsluiting ontstaan."]
  ],
  src: [["ANWB – Fietsaccu's en veiligheid", "https://www.anwb.nl/fiets/fietsaccu/fietsaccus-en-veiligheid"]],
  rel: [["e-bikes.html", "Alle e-bikes en foutcodes"]]
},
{
  id: "gaslucht-in-huis",
  cat: "cv-ketels",
  q: "Ik ruik gas in huis: wat moet ik doen?",
  title: "Gaslucht in huis: dit moet je meteen doen",
  desc: "Ruik je gas? Ramen open, hoofdkraan dicht, geen licht of stekkers, naar buiten en bel 0800-9009. Zo herken je een gaslek en dit moet je niet doen.",
  safety: "Ruik je gas? Ramen en deuren open, gaskraan dicht, geen licht, schakelaars, stekkers of vuur. Ga met iedereen naar buiten en bel buiten 0800-9009.",
  lead: "Aardgas ruikt van nature niet, maar er is een geurstof aan toegevoegd. Daardoor ruik je het al bij 1 procent gas in de lucht. Vanaf 5 procent is er ontploffingsgevaar.",
  secs: [
    ["Zo herken je een gaslek", `<ul><li>Je ruikt gas.</li><li>Je hoort een sissend geluid.</li><li>Er zitten verkleurde vlekken op de gasleidingen.</li><li>Je hebt klachten zoals hoofdpijn, misselijkheid, benauwdheid of braken.</li></ul>`],
    ["Stappenplan", `<ol><li>Zet alle ramen en deuren open.</li><li>Draai de hoofdkraan dicht. Die zit in de meterkast bij de gasmeter: een gele knop, een draaiwiel of een hendel.</li><li>Heb je kampeergasflessen in huis? Controleer ze op lekkage of roest.</li><li>Ga met iedereen naar buiten en blijf buiten.</li><li>Bel buiten het Nationaal Storingsnummer Gas en Stroom: <b>0800-9009</b> (gratis, 24 uur per dag).</li><li>Laat het lek verhelpen door een erkende installateur.</li></ol><p>Ruik je gas op straat? Bel hetzelfde nummer en blijf minstens 50 meter weg.</p>`],
    ["Dit doe je níet", `<ul><li>Geen elektrische apparaten gebruiken, ook je telefoon niet binnen.</li><li>Het licht niet aan- of uitdoen.</li><li>Geen stekkers in of uit het stopcontact halen.</li><li>Geen sigaret, kaars of ander vuur aansteken.</li></ul><p>Een klein vonkje kan al een ontploffing veroorzaken.</p>`]
  ],
  faq: [
    ["Welk nummer bel je bij gaslucht?", "Het Nationaal Storingsnummer Gas en Stroom: 0800-9009. Het is gratis en 24 uur per dag bereikbaar. Bel buiten, niet in huis."],
    ["Waar zit de hoofdkraan van het gas?", "In de meterkast bij de gasmeter. Het is een gele knop, een draaiwiel of een hendel."],
    ["Mag ik het licht aandoen als ik gas ruik?", "Nee. Doe geen licht aan of uit, gebruik geen elektrische apparaten en steek geen stekkers in of uit: een vonkje kan een ontploffing veroorzaken."]
  ],
  src: [["ID.nl – Gaslek in huis: zo herken je het en dit moet je doen", "https://id.nl/zekerheid-en-gemak/alarm-en-beveiliging/alarm-beveiliging/gaslek-in-huis-zo-herken-je-het-en-dit-moet-je-doen"]],
  rel: [["eerste-hulp-bij-storingen.html", "Eerste hulp bij storingen"], ["kennisbank-koolmonoxide.html", "Koolmonoxide herkennen en voorkomen"]]
},
{
  id: "stroomstoring-wat-doen",
  cat: "meterkast",
  q: "Geen stroom: wat moet ik doen?",
  title: "Stroomstoring: eigen huis of de hele buurt? Zo pak je het aan",
  desc: "Geen stroom? Kijk eerst in de groepenkast, dan bij de buren. Is de hele straat donker, meld het dan bij 0800-9009. Waarom je zonnepanelen dan ook niet werken.",
  lead: "Bij geen stroom wil je eerst weten of het probleem in je eigen huis zit of in de buurt. Dat zie je binnen een minuut.",
  secs: [
    ["Stap 1: kijk in de groepenkast", `<p>Is er een groep of de aardlekschakelaar uitgeslagen? Dan zit het probleem in huis, bijvoorbeeld door kortsluiting, overbelasting of een natte kabel. Zet de schakelaar terug. Valt hij direct weer uit, volg dan het stappenplan bij <a href="aardlekschakelaar-groepenkast.html">aardlekschakelaar of groep springt eruit</a>.</p>`],
    ["Stap 2: kijk bij de buren en op straat", `<p>Hebben de buren ook geen stroom en brandt de straatverlichting niet? Dan is het waarschijnlijk een storing in het stroomnet.</p>`],
    ["Stap 3: meld de storing", `<p>Bel het Nationaal Storingsnummer Gas en Stroom: <b>0800-9009</b>. Je wordt doorgeschakeld naar je netbeheerder. Je kunt ook je netbeheerder zelf bellen.</p>`],
    ["Zonnepanelen tijdens een storing", `<p>Tijdens een stroomstoring werken je zonnepanelen niet. De omvormer schakelt automatisch uit, zodat monteurs die aan het net werken niet onder spanning komen te staan.</p>`]
  ],
  faq: [
    ["Waar meld ik een stroomstoring?", "Bij het Nationaal Storingsnummer Gas en Stroom, 0800-9009. Je wordt doorgezet naar je netbeheerder."],
    ["Hoe weet ik of de storing alleen bij mij is?", "Kijk in de groepenkast of er een schakelaar is uitgeslagen. Hebben de buren ook geen stroom en is de straatverlichting uit, dan is het een storing in de buurt."],
    ["Werken mijn zonnepanelen tijdens een stroomstoring?", "Nee. De omvormer schakelt dan automatisch uit, zodat monteurs niet onder spanning komen te staan."]
  ],
  src: [["Pure Energie – Wat te doen bij een stroomstoring?", "https://pure-energie.nl/kennisbank/wat-te-doen-bij-een-stroomstoring/"], ["Hager – consumentenhandleiding groepenverdeler Vision", "https://download.hager.com/nl/bestelhulp/vision/consumentenhandleiding_vision.pdf"]],
  rel: [["aardlekschakelaar-groepenkast.html", "Aardlekschakelaar of groep springt eruit"], ["meterkast.html", "Meterkast en stroomstoringen"], ["kennisbank-omvormer-valt-uit-hoge-netspanning.html", "Omvormer valt uit bij zon"]]
},
{
  id: "wasmachine-stinkt",
  cat: "wasmachines",
  q: "Waarom stinkt mijn wasmachine?",
  title: "Wasmachine stinkt: oorzaak en zo krijg je hem weer fris",
  desc: "Een vieze lucht uit de wasmachine komt van zeepresten, huidvet en vuil (vetluis). Draai maandelijks een hete was, doseer goed en laat deur en zeepbakje open.",
  lead: "Na elke was blijven er resten achter: zeep, huidvet, haren en vuil. Dat plakkerige spul heet vetluis en zit in de deurrubber, het filter, het zeepbakje en de slangen. Het groeit vooral als je vaak op lage temperatuur wast of te veel wasmiddel gebruikt.",
  secs: [
    ["Zo wordt hij weer fris", `<ol><li>Draai eens per maand een lege hete was op 60 °C of hoger, met een beetje waspoeder voor witte was. Gebruik daarvoor geen eco-programma: dat is vaak te kort of te koel. Sommige machines hebben een hygiëne- of trommelreinigingsprogramma; kijk in de handleiding.</li><li>Haal het zeepbakje eruit, spoel het af onder de kraan, maak ook de opening in de machine schoon en droog alles goed.</li><li>Trek de deurrubber voorzichtig naar voren, haal haren en vuil eruit en maak hem schoon met sop of verdunde azijn. Droog hem af.</li><li>Maak het pompfilter onderaan de voorkant schoon. Vang het water op met een handdoek of lage bak.</li><li>Controleer af en toe de toevoerslang op slijtage of verstopping.</li></ol>`],
    ["Voorkomen", `<ul><li>Laat na elke was de deur en het zeepbakje open, zodat het vocht kan verdampen.</li><li>Doseer wasmiddel op de hoeveelheid was, hoe vuil die is en de waterhardheid. Te weinig geeft vuile was, te veel blijft in de machine achter en geeft schuim en stank.</li><li>Zet de optie extra spoelen aan als je machine die heeft.</li></ul>`]
  ],
  faq: [
    ["Waarom ruikt mijn wasmachine muf?", "Door vetluis: resten van zeep, huidvet, haren en vuil in de deurrubber, het filter, het zeepbakje en de slangen. Dat groeit vooral bij vaak wassen op lage temperatuur of te veel wasmiddel."],
    ["Hoe krijg je een stinkende wasmachine weer fris?", "Draai eens per maand een lege hete was op 60 °C of hoger met wat waspoeder, en maak het zeepbakje, de deurrubber en het filter schoon."],
    ["Moet de deur van de wasmachine open blijven?", "Ja, laat de deur en het zeepbakje na elke was open zodat het vocht kan verdampen."]
  ],
  src: [["AVROTROS Radar – Hoe houd je de wasmachine vrij van vieze luchtjes?", "https://radar.avrotros.nl/artikel/hoe-houd-je-de-wasmachine-vrij-van-vieze-luchtjes-61630"]],
  rel: [["kennisbank-wasmachine-onderhoud.html", "Wasmachine onderhouden"], ["wasmachines.html", "Alle wasmachines en foutcodes"]]
},
{
  id: "koelkast-vriezer-temperatuur",
  cat: "koelkasten",
  q: "Op welke temperatuur moet mijn koelkast en vriezer staan?",
  title: "Juiste temperatuur koelkast (4 °C) en vriezer (-18 °C)",
  desc: "Een koelkast hoort op 4 °C, een vriezer op -18 °C. Zo meet je het, zo stel je het in en zo voorkom je dat je koelkast te warm wordt of te veel stroom gebruikt.",
  lead: "De koelkast hoort op 4 °C te staan, de vriezer op -18 °C. Kouder vriezen kan, maar kost meer stroom zonder extra voordeel.",
  secs: [
    ["Koelkast: 4 °C", `<ul><li>Onderin is het meestal iets kouder, in de deurvakken iets warmer.</li><li>Meet op verschillende plekken met een koelkastthermometer. Is het verschil tussen boven en onder, of tussen midden en deur, groter dan 3 °C? Verdeel de inhoud dan anders.</li><li>Bewaar vlees, vis, zuivel en eieren bij voorkeur op de middelste planken.</li><li>Met een draaiknop zit je meestal goed op stand 3 of 4. Met een display stel je direct 4 °C in.</li></ul>`],
    ["Vriezer: -18 °C", `<p>Bij -18 °C stoppen bacteriën en schimmels vrijwel met groeien, zodat eten maandenlang veilig blijft. Elke graad kouder kost ongeveer 5% meer energie. Met een draaiknop zit je meestal op stand 5; controleer het met een vriezerthermometer.</p>`],
    ["Tips", `<ul><li>Laat warme gerechten eerst afkoelen.</li><li>Houd de deur zo kort mogelijk open en controleer minstens één keer per jaar de deurrubbers.</li><li>Zet het apparaat niet in de zon of naast de oven, het fornuis of een radiator.</li><li>Laat ruimte rondom, vooral aan de achterkant, en maak de condensor stofvrij.</li><li>Ontdooi de vriezer regelmatig: een ijslaag isoleert slecht en kost extra stroom.</li></ul>`]
  ],
  faq: [
    ["Wat is de juiste temperatuur van een koelkast?", "4 °C. Onderin is het meestal iets kouder en in de deurvakken iets warmer."],
    ["Wat is de juiste temperatuur van een vriezer?", "-18 °C. Kouder kan, maar elke graad lager kost ongeveer 5% meer energie zonder extra voordeel."],
    ["Op welke stand moet de knop van mijn koelkast?", "Met een draaiknop zit je meestal goed op stand 3 of 4 voor de koelkast en stand 5 voor de vriezer. Controleer het met een thermometer."]
  ],
  src: [["ID.nl – Wat is de ideale temperatuur voor jouw koelkast en vriezer?", "https://id.nl/huis-en-entertainment/huishouden/koelen-en-vriezen/wat-is-de-ideale-temperatuur-voor-jouw-koelkast-en-vriezer"]],
  rel: [["koelkasten.html", "Alle koelkasten en foutcodes"]]
},
{
  id: "droger-droogt-niet-goed",
  cat: "drogers",
  q: "Waarom droogt mijn droger niet goed?",
  title: "Droger droogt niet goed: controleer deze 6 dingen zelf",
  desc: "Blijft de was vochtig of duurt drogen eindeloos? Controleer het pluizenfilter, de condensor, de vochtsensoren, de belading, de luchtafvoer en het programma.",
  lead: "Blijft de was vochtig of duurt het drogen veel langer dan vroeger? Meestal kun je de oorzaak zelf vinden met deze zes controles.",
  secs: [
    ["1. Pluizenfilter", `<p>Het filter zit meestal in de deuropening. Haal de pluizen eruit en kijk ook in de filterhouder. Een dun laagje kan de gaatjes dichtzetten, ook als het filter schoon lijkt: was het dan volgens de handleiding en laat het helemaal drogen. Een verstopt filter remt de luchtstroom en maakt het drogen veel langer.</p>`],
    ["2. Condensor of warmtewisselaar", `<p>Bij een condens- of warmtepompdroger kan pluis in de condensor of warmtewisselaar het drogen verslechteren. Open alleen het onderhoudsluik dat in de handleiding staat en gebruik geen scherpe voorwerpen tussen de lamellen. Haal de warmtewisselaar van een warmtepompdroger er alleen uit als de handleiding dat toestaat.</p>`],
    ["3. Vochtsensoren", `<p>Dat zijn meestal metalen strips in of bij de trommelopening. Resten van wasmiddel of wasverzachter kunnen de meting verstoren, waardoor de droger te vroeg stopt. Maak ze schoon zoals de handleiding aangeeft.</p>`],
    ["4. Belading", `<p>Blijf onder de maximale belading van het gekozen programma; die kan lager zijn dan wat op de machine staat. Heel kleine ladingen zijn moeilijk te meten voor de sensoren. Droog zware dingen zoals badhanddoeken en spijkerbroeken apart van dunne shirts.</p>`],
    ["5. Luchtstroom en afvoer", `<p>Houd de ventilatieopeningen en de ruimte rond de droger vrij. Bij een afvoerdroger mag de afvoerslang niet geknikt zijn. Bij een condens- of warmtepompdroger leeg je het waterreservoir als het vol is en controleer je of de waterafvoerslang niet klem zit.</p>`],
    ["6. Programma en centrifuge", `<p>Strijkdroog laat de was bewust iets vochtig; kies kastdroog voor was die zo de kast in gaat. Centrifugeer in de wasmachine op een hoger toerental als de wasvoorschriften dat toestaan: hoe minder water in de was, hoe sneller hij droogt.</p><p>Blijft de was vochtig, geeft de droger een foutcode, maakt hij veel lawaai of wordt hij nauwelijks warm? Kijk in de handleiding en schakel een monteur in. Open de behuizing niet zelf.</p>`]
  ],
  faq: [
    ["Waarom droogt mijn droger niet meer goed?", "Vaak door een verstopt pluizenfilter, een vuile condensor of vochtsensoren, te veel of te weinig was, een geblokkeerde luchtafvoer of een programma zoals strijkdroog."],
    ["Hoe maak je de vochtsensoren van een droger schoon?", "Het zijn meestal metalen strips bij de trommelopening. Maak ze schoon zoals de handleiding aangeeft; resten van wasmiddel of wasverzachter verstoren de meting."],
    ["Wanneer moet er een monteur naar de droger kijken?", "Als de was vochtig blijft na alle controles, of als de droger een foutcode geeft, veel lawaai maakt of nauwelijks warm wordt."]
  ],
  src: [["ID.nl – Wasdroger droogt niet goed meer? Controleer deze 6 dingen zelf", "https://id.nl/huis-en-entertainment/huishouden/wassen-en-drogen/wasdroger-droogt-niet-goed-meer-controleer-deze-6-dingen-zelf"]],
  rel: [["drogers.html", "Alle drogers en foutcodes"], ["kennisbank-wasmachine-onderhoud.html", "Wasmachine onderhouden"]]
},
{
  id: "koffiemachine-ontkalken",
  cat: "koffiemachines",
  q: "Hoe vaak moet je een koffiemachine ontkalken?",
  title: "Koffiemachine ontkalken en schoonmaken: hoe vaak en waarmee",
  desc: "Ontkalk je koffiemachine ongeveer elke 2 à 3 maanden en reinig hem apart. Waarom azijn niet geschikt is voor een volautomaat en hoe vaak het waterfilter eruit moet.",
  lead: "Kalk en koffievet maken je koffie minder lekker en je machine minder betrouwbaar. Ontkalken en schoonmaken zijn twee aparte klussen.",
  secs: [
    ["Hoe vaak?", `<ul><li><b>Ontkalken</b>: ongeveer elke 2 à 3 maanden. Hoe vaker je koffie zet, hoe eerder. Ontkalk in elk geval als je kalk ziet.</li><li><b>Binnenkant reinigen</b>: elke drie weken met een reinigingstablet, tegen koffieaanslag.</li><li><b>Waterfilter</b>: elke 3 maanden schoonmaken of vervangen.</li></ul>`],
    ["Azijn of ontkalker?", `<p>Azijn en soda kunnen werken voor een ouder filterkoffiezetapparaat. Een volautomaat werkt met hogere watertemperatuur en druk en is daardoor gevoeliger: gebruik daarvoor een echte ontkalker en reinigingsmiddel voor koffiemachines.</p>`],
    ["Volgorde", `<ol><li>Eerst ontkalken: dat lost de kalk op.</li><li>Dan de binnenkant reinigen met een speciaal koffiemachinereiniger. Koffie is vettig, dus een ontvetter werkt beter dan gewoon afwasmiddel. Gebruik geen geparfumeerd middel: dat proef je in je koffie.</li><li>De buitenkant afnemen als je wilt.</li></ol>`]
  ],
  faq: [
    ["Hoe vaak moet je een koffiemachine ontkalken?", "Ongeveer elke 2 à 3 maanden, afhankelijk van hoeveel koffie je zet. Ontkalk in elk geval als je kalk ziet."],
    ["Mag je een koffiemachine ontkalken met azijn?", "Bij een ouder filterkoffiezetapparaat kan het. Een volautomaat is gevoeliger door de hogere temperatuur en druk: gebruik daarvoor een echte ontkalker."],
    ["Is ontkalken hetzelfde als schoonmaken?", "Nee. Ontkalken lost kalk op; reinigen haalt koffievet en aanslag weg. Doe eerst het ontkalken en reinig daarna."]
  ],
  src: [["AVROTROS Radar – Je koffiezetapparaat ontkalken en schoonmaken: experts geven tips", "https://radar.avrotros.nl/artikel/je-koffiezetapparaat-ontkalken-en-schoonmaken-experts-geven-tips-36355"]],
  rel: [["koffiemachines.html", "Alle koffiemachines en foutcodes"]]
},
{
  id: "wifi-traag",
  cat: "internet",
  q: "Waarom is mijn wifi zo traag?",
  title: "Traag wifi: zo maak je je draadloze internet sneller",
  desc: "Traag wifi komt vaak door de plek van de router, storing van andere apparaten of buren op hetzelfde kanaal. Vier tips om je wifi sneller te maken.",
  lead: "Je internetabonnement kan snel zijn terwijl je wifi traag is. Vaak ligt het aan de plek van de router of aan storing in de buurt.",
  secs: [
    ["Tips", `<ol><li><b>Zet de router in het open.</b> Verstop hem niet in de meterkast of achter meubels. Moet het modem in de meterkast blijven, hang hem dan zo hoog mogelijk en houd andere apparaten er weg.</li><li><b>Weg van storingsbronnen.</b> Een magnetron, babyfoon of draadloze huistelefoon kan het signaal verstoren.</li><li><b>Kies een ander kanaal.</b> In flats gebruiken routers van buren vaak hetzelfde kanaal. Zoek met een wifi-app het rustigste kanaal en stel dat in de router in.</li><li><b>Wifi-versterker.</b> Zet een repeater of versterker net vóór de plek waar het signaal zwakker wordt. Die vergroot het bereik, maar kan de snelheid wat verlagen.</li></ol>`],
    ["Nog steeds problemen?", `<p>Neem contact op met je internetprovider. Geeft je modem of tv-ontvanger een foutcode? Zoek die op bij <a href="internet.html">internet en tv</a>.</p>`]
  ],
  faq: [
    ["Waar zet je de router het beste neer?", "In het open, niet in de meterkast of achter meubels. Moet hij in de meterkast blijven, hang hem dan zo hoog mogelijk."],
    ["Welke apparaten storen wifi?", "Onder meer een magnetron, een babyfoon en een draadloze huistelefoon."],
    ["Helpt een wifi-versterker?", "Een repeater of versterker vergroot het bereik als je hem net vóór de plek zet waar het signaal zwakker wordt. Hij kan wel wat snelheid kosten."]
  ],
  src: [["ID.nl – Traag internet? Zo maak je je wifi sneller", "https://id.nl/huis-en-entertainment/computer-en-gaming/netwerk/traag-internet-zo-maak-je-je-wifi-sneller"]],
  rel: [["internet.html", "Alle modems, routers en tv-ontvangers"]]
},
{
  id: "warmtepomp-zuinig-instellen",
  cat: "warmtepompen",
  q: "Hoe stel je een warmtepomp zuinig in?",
  title: "Warmtepomp zuinig gebruiken: thermostaat, aanvoertemperatuur en onderhoud",
  desc: "Laat de thermostaat van je warmtepomp zoveel mogelijk staan, verlaag 's nachts maximaal 2 graden en houd de aanvoertemperatuur laag. Zo blijft het stroomverbruik laag.",
  lead: "Een warmtepomp werkt anders dan een cv-ketel: hij is het zuinigst als de temperatuur in huis zo gelijkmatig mogelijk blijft.",
  secs: [
    ["Thermostaat", `<ul><li>Verander de thermostaat zo min mogelijk: telkens bijstellen kost meer stroom.</li><li>Laat de temperatuur 's nachts maximaal 2 graden zakken, zodat de warmtepomp 's ochtends niet hard hoeft te werken.</li><li>Eén graad lager (bijvoorbeeld 20 in plaats van 21 °C) scheelt ongeveer 2,5% op de energierekening.</li><li>Gebruik bij voorkeur de thermostaat van hetzelfde merk als de warmtepomp.</li></ul>`],
    ["Aanvoertemperatuur", `<ul><li>De meeste systemen kunnen werken met water van 40 °C of lager.</li><li>Met een buitenvoeler past de warmtepomp de watertemperatuur aan het weer aan. Hang de voeler op de noordkant van het huis, uit de zon.</li><li>Vloerverwarming, lagetemperatuurradiatoren en ventilatorconvectoren werken goed op die lage temperatuur.</li><li>Warm tapwater kan op 45 °C. Laat de legionellafunctie aan staan.</li></ul>`],
    ["Onderhoud", `<ul><li>Vuile of verstopte filters verminderen de luchtstroom; dat kan tot 25% hogere energiekosten geven.</li><li>Haal blad en vuil weg bij de ventilator en het rooster van de buitenunit.</li><li>Laat de warmtepomp elk jaar of elke twee jaar onderhouden door een vakman die geregistreerd is in het Centraal Register Techniek.</li></ul>`]
  ],
  faq: [
    ["Moet je een warmtepomp 's nachts lager zetten?", "Hooguit 2 graden, zodat de warmtepomp 's ochtends niet hard hoeft te werken om het huis weer op temperatuur te krijgen."],
    ["Welke aanvoertemperatuur is goed voor een warmtepomp?", "De meeste systemen kunnen werken met water van 40 °C of lager. Met een buitenvoeler past de warmtepomp de temperatuur aan het weer aan."],
    ["Hoe vaak moet een warmtepomp onderhouden worden?", "Elk jaar of elke twee jaar, door een vakman die in het Centraal Register Techniek staat."]
  ],
  src: [["ID.nl – Zo houd je het stroomverbruik van je warmtepomp zo laag mogelijk", "https://id.nl/energie-en-klimaat/klimaat-en-luchtkwaliteit/klimaatbeheersing/zo-houd-je-het-stroomverbruik-van-je-warmtepomp-zo-laag-mogelijk"]],
  rel: [["warmtepompen.html", "Alle warmtepompen en foutcodes"]]
},
{
  id: "koelkast-lekt-of-koelt-niet",
  cat: "koelkasten",
  q: "Koelkast lekt water of koelt niet: wat nu?",
  title: "Koelkast lekt water, koelt niet of maakt lawaai: oplossingen",
  desc: "Water onderin de koelkast? Dan is het afvoergaatje verstopt. Ook: ijs in de vriezer, een koelkast die niet koelt, lawaai en een deur die niet goed sluit.",
  lead: "Veel koelkastproblemen los je zelf op in een paar minuten. Hieronder de vijf meest voorkomende.",
  secs: [
    ["Water onderin of eronder", `<p>Het afvoergaatje in de goot onderin de achterwand is verstopt of bevroren. Maak het schoon met het schoonmaakstaafje dat bij de koelkast zat, een pijpenrager of een wattenstaafje.</p>`],
    ["IJs in de vriezer", `<p>Controleer de deurrubbers op scheurtjes of vuil en maak ze schoon of vervang ze. Een vriezer zonder no-frost moet je regelmatig ontdooien.</p>`],
    ["Koelkast koelt niet", `<ol><li>Controleer of de thermostaat goed staat (koelkast 4 °C).</li><li>Is een vriezer zonder no-frost dichtgevroren? Ontdooi hem.</li><li>Zet de koelkast uit en zuig het stoffige rooster (de condensor) achterop schoon.</li><li>Bij een inbouwkoelkast: zorg voor genoeg ventilatie, zoals een rooster in de plint.</li></ol>`],
    ["Lawaai", `<p>Zoemen, tikken of blazen kan normaal zijn; nieuwere koelkasten en no-frost-vriezers maken vaak meer geluid. Kijk in de handleiding welke geluiden normaal zijn. Hard bonken, piepen of rammelen, zeker als het geluid ineens verandert, kan wijzen op een probleem met de ventilator of compressor: laat er dan een vakman naar kijken.</p>`],
    ["Deur sluit niet goed", `<p>Controleer de deurrubbers op scheuren of schade en vervang ze zo nodig. Zorg dat de koelkast waterpas staat: een scheef apparaat kan de deur niet goed laten sluiten.</p>`]
  ],
  faq: [
    ["Waarom staat er water onderin mijn koelkast?", "Het afvoergaatje in de goot onderin de achterwand is verstopt of bevroren. Maak het schoon met het meegeleverde staafje, een pijpenrager of een wattenstaafje."],
    ["Waarom koelt mijn koelkast niet meer goed?", "Controleer de thermostaat, ontdooi een dichtgevroren vriezer zonder no-frost en zuig het stoffige rooster achterop schoon. Een inbouwkoelkast heeft genoeg ventilatie nodig."],
    ["Is het normaal dat een koelkast geluid maakt?", "Zoemen, tikken of blazen kan normaal zijn. Hard bonken, piepen of rammelen, zeker als het geluid ineens verandert, kan op een defecte ventilator of compressor wijzen."]
  ],
  src: [["ID.nl – Koelkastproblemen: zo los je ze op", "https://id.nl/huis-en-entertainment/huishouden/koelen-en-vriezen/koelkast-problemen-zo-los-je-ze-op"]],
  rel: [["kennisbank-koelkast-vriezer-temperatuur.html", "Juiste temperatuur koelkast en vriezer"], ["koelkasten.html", "Alle koelkasten en foutcodes"]]
},
{
  id: "stofzuiger-zuigt-slecht",
  cat: "stofzuigers",
  q: "Waarom zuigt mijn stofzuiger slecht?",
  title: "Stofzuiger zuigt slecht: oorzaken, verstopping en onderhoud",
  desc: "Minder zuigkracht komt meestal door een volle zak of bak, vuile filters, een verstopte slang of haren op de borstel. Zo los je het op en zo onderhoud je je stofzuiger.",
  lead: "Zuigt je stofzuiger minder goed dan vroeger? Meestal is de oorzaak eenvoudig te vinden en zelf op te lossen.",
  secs: [
    ["Oorzaken", `<ul><li><b>Volle stofzak of stofbak</b>: die remt de luchtstroom en de motor moet harder werken.</li><li><b>Verstopte slang of buis</b>: zakloze stofzuigers zijn hier gevoeliger voor.</li><li><b>Vuile filters</b>: maak ze regelmatig schoon en controleer ze twee keer per jaar.</li><li><b>Haren of vuil op de borstelrol</b>.</li></ul>`],
    ["Verstopping verhelpen", `<p>Gebruik een flexibele slangreiniger, een stuk pvc-buis of de steel van een zwabber. Gebruik geen metalen kleerhanger: die kan de slang beschadigen.</p>`],
    ["Onderhoudsschema", `<ul><li><b>Na elk gebruik</b>: leeg de zak of bak en haal haren en vuil van de borstelrol.</li><li><b>Elke maand</b>: maak bij een zakloze stofzuiger de filters schoon en controleer de slang. Vervang de stofzak als hij voor ongeveer tweederde vol zit. Maak borstels en wieltjes schoon en controleer het snoer op schade.</li><li><b>Twee keer per jaar</b>: controleer filters, borstels en onderdelen op slijtage en vervang ze waar nodig.</li><li>Veeg de buitenkant af met een vochtige doek, maar houd vocht uit de elektronica.</li></ul>`]
  ],
  faq: [
    ["Waarom heeft mijn stofzuiger minder zuigkracht?", "Meestal door een volle zak of stofbak, vuile filters, een verstopte slang of buis, of haren op de borstelrol."],
    ["Hoe maak je een verstopte stofzuigerslang vrij?", "Met een flexibele slangreiniger, een stuk pvc-buis of de steel van een zwabber. Gebruik geen metalen kleerhanger."],
    ["Wanneer vervang je de stofzak?", "Als hij voor ongeveer tweederde vol zit."]
  ],
  src: [["ID.nl – Je stofzuiger onderhouden: dit moet je weten", "https://id.nl/huis-en-entertainment/huishouden/schoonmaken/je-stofzuiger-onderhouden-dit-moet-je-weten"]],
  rel: [["stofzuigers.html", "Alle stofzuigers en foutcodes"]]
},
{
  id: "accu-telefoon-laptop-gezond",
  cat: "smartphones",
  q: "Hoe gaat de accu van je telefoon of laptop langer mee?",
  title: "Accu van telefoon of laptop gezond houden: 20–80% en niet te warm",
  desc: "Houd je accu tussen 20 en 80 procent, beperk snelladen en warmte, en bewaar een ongebruikt apparaat op 50 procent. Zo stel je een laadlimiet in op iPhone en Android.",
  lead: "Een accu slijt door laden, warmte en helemaal vol of leeg staan. Met een paar gewoontes gaat hij merkbaar langer mee.",
  secs: [
    ["Laden", `<ul><li>Houd de accu het liefst tussen 20 en 80 procent. Laad niet steeds tot 100 procent en laat hem niet vaak onder 5 procent zakken.</li><li>Snelladen en draadloos laden geven warmte en versnellen de slijtage. Gebruik ze alleen als het nodig is.</li><li>Een omgevingstemperatuur van ongeveer 16 tot 22 °C is ideaal; vermijd meer dan 35 °C. Wordt het toestel warm tijdens het laden, haal het hoesje er dan even af.</li></ul>`],
    ["Laadlimiet instellen", `<ul><li><b>iPhone 15 of nieuwer</b>: Instellingen > Batterij > Bezig met opladen, kies 80 procent. Met Geoptimaliseerd laden blijft de accu 's nachts op 80 procent en laadt hij pas vlak voor je opstaat verder.</li><li><b>Android</b>: Instellingen > Batterij > Batterijbescherming, en stel een maximum in zoals 80 of 85 procent. Bij Samsung heet de optie Maximum.</li><li><b>Windows-laptop</b>: maak een batterijrapport met <span class="mono">powercfg /batteryreport</span> in de opdrachtprompt. Je ziet laadcycli en hoe de capaciteit terugloopt.</li></ul>`],
    ["Apparaat opbergen", `<p>Gebruik je een apparaat een tijd niet? Laad de accu tot ongeveer 50 procent en zet het helemaal uit. Ligt het langer dan 6 maanden, laad het dan elke 6 maanden weer tot ongeveer 50 procent. Bewaar het droog en niet warmer dan 32 °C.</p>`]
  ],
  faq: [
    ["Moet je je telefoon tot 100 procent opladen?", "Liever niet steeds. Houd de accu het liefst tussen 20 en 80 procent en laat hem niet vaak onder 5 procent zakken."],
    ["Is snelladen slecht voor de accu?", "Snelladen geeft warmte en versnelt de slijtage. Gebruik het alleen als het echt nodig is."],
    ["Hoe bewaar je een laptop of telefoon die je niet gebruikt?", "Laad de accu tot ongeveer 50 procent, zet het apparaat uit en bewaar het droog onder 32 °C. Laad het elke 6 maanden weer tot ongeveer 50 procent."]
  ],
  src: [["ID.nl – Tips voor een gezonde accu: zo doe je langer met een batterij", "https://id.nl/huis-en-entertainment/mobiel/smartphone-en-tablet/tips-voor-een-gezonde-accu-zo-doe-je-langer-met-een-batterij"]],
  rel: [["smartphones.html", "Alle smartphones en storingen"], ["laptops.html", "Alle laptops en storingen"]]
},
{
  id: "ventilatie-filters-onderhoud",
  cat: "ventilatie",
  q: "Hoe vaak moet je ventilatiefilters vervangen?",
  title: "Mechanische ventilatie onderhouden: filters, roosters en kanalen",
  desc: "Vervang de filters van je mechanische ventilatie 1 tot 2 keer per jaar, stof de roosters elke 1 à 3 maanden af en laat de kanalen eens per 4 jaar reinigen.",
  lead: "Filters en roosters houd je zelf schoon. Kanalen en de ventilatiebox laat je af en toe controleren door een vakman.",
  secs: [
    ["Zelf doen", `<ul><li><b>Roosters en ventielen</b>: stof ze elke 1 tot 3 maanden af, afhankelijk van het gebruik.</li><li><b>Filters</b>: vervang ze 1 tot 2 keer per jaar bij dagelijks gebruik. Je kunt een filter één keer met de stofzuiger schoonmaken, daarna moet het worden vervangen.</li></ul>`],
    ["Door een vakman", `<ul><li><b>Ventilatiekanalen</b>: minstens eens per 4 jaar laten reinigen. Dat kost gemiddeld €100 tot €300.</li><li><b>Ventilatiebox</b>: eens per 4 jaar de ventilator en motor laten controleren op slijtage en vuil. Maakt de box veel lawaai, dan kan onderhoud of vervanging nodig zijn.</li><li>Na ongeveer 15 jaar is het advies het systeem te vervangen.</li></ul>`]
  ],
  faq: [
    ["Hoe vaak vervang je de filters van mechanische ventilatie?", "Eén tot twee keer per jaar bij dagelijks gebruik. Je kunt een filter één keer stofzuigen, daarna moet hij worden vervangen."],
    ["Hoe vaak moeten ventilatiekanalen gereinigd worden?", "Minstens eens per 4 jaar, door een vakman. Dat kost gemiddeld €100 tot €300."],
    ["Waarom maakt mijn ventilatiebox veel lawaai?", "Veel lawaai kan betekenen dat de box onderhoud nodig heeft of aan vervanging toe is. Laat de ventilator en motor controleren."]
  ],
  src: [["Homedeal – Mechanische ventilatie reinigen en onderhoud", "https://www.homedeal.nl/ventilatie/mechanische-ventilatie-reinigen-en-onderhoud/"]],
  rel: [["ventilatie.html", "Alle ventilatiesystemen en foutcodes"]]
},
{
  id: "airco-onderhoud",
  cat: "airco",
  q: "Hoe onderhoud je een airco?",
  title: "Airco onderhouden: filters elke maand, monteur elk jaar",
  desc: "Maak de stoffilters van je airco elke maand schoon en laat hem elk jaar nakijken. Wat je zelf doet, wat de monteur doet en wanneer onderhoud nodig is.",
  lead: "Een schone airco koelt beter en gebruikt minder stroom. Het meeste onderhoud is een paar minuten werk per maand.",
  secs: [
    ["Zelf doen: elke maand", `<ul><li>Maak de stoffilters schoon en neem binnen- en buitenunit af met een doek.</li><li>Stofzuig alleen de buitenkant van de filters. Zuig je de binnenkant, dan duw je stof door het filter en kan de airco beschadigd raken.</li><li>Erg vuile filters kun je voorzichtig uitspoelen in lauw water.</li><li>Veel airco's hebben een zelfreinigingsfunctie die je kunt aanzetten.</li></ul>`],
    ["Door een monteur", `<ul><li><b>Elk jaar</b>: een gecertificeerde monteur controleert onder meer filters, koudemiddel, leidingen, instellingen, lekbak, verdamper, buitenunit en stroomverbruik.</li><li><b>Koudemiddel bijvullen</b> mag alleen een erkende vakman doen: de meeste koudemiddelen zijn giftig en licht ontvlambaar.</li><li>Of onderhoud verplicht is, hangt af van de hoeveelheid koudemiddel die op de buitenunit staat. Onder 7,4 kg is het niet verplicht, maar jaarlijks onderhoud blijft het advies.</li></ul>`],
    ["Signalen dat onderhoud nodig is", `<ul><li><b>Meer lawaai</b>: kijk eerst naar de filters. Hoor je rammelen of borrelen, bel dan direct een monteur.</li><li><b>Koelt trager</b>: mogelijk te weinig koudemiddel; laat het controleren.</li><li><b>Hoger stroomverbruik</b>: laat de airco nakijken.</li></ul>`]
  ],
  faq: [
    ["Hoe vaak moet je de filters van een airco schoonmaken?", "Elke maand. Stofzuig alleen de buitenkant van de filters; erg vuile filters kun je voorzichtig uitspoelen in lauw water."],
    ["Hoe vaak moet een airco onderhouden worden?", "Het advies is elk jaar een onderhoudsbeurt door een gecertificeerde monteur."],
    ["Mag ik zelf koudemiddel bijvullen?", "Nee, dat mag alleen een erkende vakman: de meeste koudemiddelen zijn giftig en licht ontvlambaar."]
  ],
  src: [["ID.nl – Airco's en onderhoud: wat komt er allemaal bij kijken?", "https://id.nl/energie-en-klimaat/klimaat-en-luchtkwaliteit/klimaatbeheersing/airco-s-en-onderhoud-wat-komt-er-allemaal-bij-kijken"]],
  rel: [["airco.html", "Alle airco's en foutcodes"]]
},
{
  id: "vriezer-ontdooien",
  cat: "koelkasten",
  q: "Hoe en hoe vaak ontdooi je een vriezer?",
  title: "Vriezer ontdooien: hoe vaak en stappenplan",
  desc: "Gaan de lades stroef door het ijs? Tijd om te ontdooien. Zo ontdooi je je vriezer veilig in acht stappen, en waarom je nooit een mes gebruikt.",
  lead: "IJs in de vriezer kost stroom, neemt ruimte in en verkort de levensduur. Gaan de lades stroef of niet meer dicht, dan is het tijd om te ontdooien.",
  secs: [
    ["Hoe vaak?", `<ul><li>Vriezer zonder no-frost: soms elk kwartaal.</li><li>Vriezer met no-frost: die voert vocht zelf af, maar één à twee schoonmaakbeurten per jaar blijft goed.</li><li>Een muffe geur is ook een reden om eerder schoon te maken.</li></ul>`],
    ["Stappenplan", `<ol><li>Zet de vriezer uit.</li><li>Haal alles eruit en bewaar het koel, bijvoorbeeld in een koeltas.</li><li>Haal de lades eruit en laat ze op kamertemperatuur komen.</li><li>Laat het ijs smelten. Een emmer heet water in de vriezer versnelt het; na ongeveer 30 minuten zit het meeste ijs los.</li><li>Haal de resten weg met een warme, natte doek of met de hand.</li><li>Maak de binnenkant schoon met warm water en een beetje afwasmiddel of soda.</li><li>Droog alles goed af en zet de vriezer weer aan.</li><li>Wacht tot hij op temperatuur is voordat je het eten terugzet.</li></ol>`],
    ["Dit niet doen", `<ul><li>Gebruik nooit een mes of schroevendraaier om ijs los te wrikken.</li><li>Geen chloor of sterk geurende middelen: die blijven in het plastic hangen.</li><li>Maak de lades niet schoon als ze nog koud zijn: ze kunnen barsten.</li></ul>`]
  ],
  faq: [
    ["Hoe vaak moet je een vriezer ontdooien?", "Een vriezer zonder no-frost soms elk kwartaal, of zodra de lades stroef gaan door het ijs. Een no-frost-vriezer één à twee keer per jaar schoonmaken."],
    ["Hoe ontdooi je een vriezer snel?", "Zet hem uit, haal alles eruit en zet een emmer heet water in de vriezer. Na ongeveer 30 minuten zit het meeste ijs los."],
    ["Mag je ijs met een mes loshalen?", "Nee, gebruik nooit een mes of schroevendraaier."]
  ],
  src: [["ID.nl – Hoe vaak moet je de vriezer ontdooien?", "https://id.nl/huis-en-entertainment/huishouden/koelen-en-vriezen/hoe-vaak-moet-je-de-vriezer-ontdooien"]],
  rel: [["kennisbank-koelkast-vriezer-temperatuur.html", "Juiste temperatuur koelkast en vriezer"], ["kennisbank-koelkast-lekt-of-koelt-niet.html", "Koelkast lekt water of koelt niet"]]
},
{
  id: "zonnepanelen-schoonmaken",
  cat: "zonnepanelen",
  q: "Moet je zonnepanelen schoonmaken?",
  title: "Zonnepanelen schoonmaken: meestal niet nodig, en zo doe je het wel",
  desc: "Regen spoelt het meeste vuil van zonnepanelen. Wanneer schoonmaken toch zin heeft, en waarom je nooit een hogedrukreiniger of zeep gebruikt.",
  lead: "Meestal is schoonmaken niet nodig: regen spoelt het meeste vuil weg. Saharazand kost ongeveer 1 tot 2 procent opbrengst en waait vaak vanzelf weer weg.",
  secs: [
    ["Wanneer wel?", `<ul><li>Je dak ligt dicht bij een drukke weg of een industriegebied.</li><li>De panelen blijven vuil, ook na regen.</li><li>De opbrengst daalt blijvend.</li></ul><p>Het beste moment is het begin van de lente. Controleer de panelen 2 tot 3 keer per jaar.</p>`],
    ["Zo maak je ze schoon", `<ol><li>Zet het systeem uit.</li><li>Kies een moment met weinig zon, zodat de panelen niet heet zijn.</li><li>Gebruik lauw, zacht of kalkvrij water, of regenwater.</li><li>Gebruik geen zeep of schoonmaakmiddel: dat kan de vuilafstotende laag beschadigen.</li><li>Gebruik een zachte spons, doek of borstel. Een schuurspons of hogedrukreiniger kan de panelen ernstig beschadigen.</li><li>Haal eerst droge bladeren weg, daarna hardnekkig vuil.</li></ol><p>Werk veilig, zeker als je het dak op moet. Wil je dat niet zelf, schakel dan een glazenwasser of andere professional in.</p>`]
  ],
  faq: [
    ["Moet je zonnepanelen schoonmaken?", "Meestal niet: regen spoelt het meeste vuil weg. Alleen bij een dak bij een drukke weg of industrie, vuil dat blijft zitten of een blijvend lagere opbrengst."],
    ["Mag je zonnepanelen met een hogedrukreiniger schoonmaken?", "Nee. Een hogedrukreiniger of schuurspons kan de panelen ernstig beschadigen. Gebruik een zachte spons of doek met lauw water."],
    ["Hoeveel opbrengst kost vuil op zonnepanelen?", "Saharazand verlaagt het rendement met ongeveer 1 tot 2 procent. Het verschil tussen schone en vuile panelen is klein."]
  ],
  src: [["Zonneplan – Zonnepanelen schoonmaken", "https://www.zonneplan.nl/kenniscentrum/zonnepanelen/onderhoud/schoonmaken/"]],
  rel: [["kennisbank-omvormer-valt-uit-hoge-netspanning.html", "Omvormer valt uit bij zon"], ["omvormer-resetten.html", "Omvormer resetten"], ["zonnepanelen.html", "Alle omvormers en foutcodes"]]
},
{
  id: "vaatwasser-pompt-niet-af",
  cat: "vaatwassers",
  q: "Er blijft water in mijn vaatwasser staan: wat nu?",
  title: "Vaatwasser pompt niet af: filter, pomp en afvoerslang controleren",
  desc: "Blijft er water onderin de vaatwasser staan? Maak het filter schoon, controleer de afvoerpomp op scherven en kijk of de afvoerslang geknikt of verstopt is.",
  lead: "Blijft er water onderin de vaatwasser staan, dan zit de afvoer ergens verstopt. Controleer het filter, de pomp en de afvoerslang. Het stappenplan komt van de supportpagina van Siemens; kijk bij een ander merk ook in je eigen handleiding.",
  secs: [
    ["1. Filter schoonmaken", `<ol><li>Haal het onderste rek eruit en ontgrendel de filtereenheid onderin.</li><li>Haal het grove filter los en spoel de filters onder stromend water. Gebruik een klein borsteltje, geen schuurmiddel.</li><li>Zet de filters terug en draai het grove filter vast tot de pijlen op elkaar staan.</li></ol>`],
    ["2. Afvoerpomp controleren", `<ol><li>Zet de vaatwasser uit en haal de stekker eruit.</li><li>Haal het onderste rek, de onderste sproeiarm en de filters eruit. Schep zoveel mogelijk water weg.</li><li>Draag handschoenen: er kunnen glasscherven in zitten.</li><li>Wip het pompdeksel open met een theelepel of handschroevendraaier (nooit een elektrische).</li><li>Haal vreemde voorwerpen en vuil uit de pomp en zet alles terug.</li></ol>`],
    ["3. Afvoerslang controleren", `<ol><li>Haal de stekker eruit.</li><li>Trek knikken uit de slang.</li><li>Leg het uiteinde in een emmer: er kan heet water uitkomen. Voel of er verstoppingen in zitten.</li><li>Spoel de slang zo nodig met heet water. Erg vuil? Vervang hem.</li></ol><p>Test daarna met het kortste programma. Pompt hij nog steeds niet af, laat dan een monteur kijken.</p>`]
  ],
  faq: [
    ["Waarom blijft er water in mijn vaatwasser staan?", "Meestal door een verstopt filter, iets in de afvoerpomp (zoals glasscherven) of een geknikte of verstopte afvoerslang."],
    ["Hoe maak je de afvoerpomp van een vaatwasser schoon?", "Stekker eruit, rek, sproeiarm en filters eruit, water wegscheppen en het pompdeksel openwippen met een theelepel. Draag handschoenen vanwege mogelijke scherven."],
    ["Wanneer bel je een monteur voor de vaatwasser?", "Als hij na het schoonmaken van filter, pomp en afvoerslang nog steeds niet afpompt."]
  ],
  src: [["Siemens Home – Water wordt niet afgevoerd uit mijn vaatwasser", "https://www.siemens-home.bsh-group.com/nl/service/ondersteuning/problemen/vaatwassers/pompt-niet-af"]],
  rel: [["kennisbank-vaatwasser-onderhoud.html", "Vaatwasser onderhouden"], ["vaatwassers.html", "Alle vaatwassers en foutcodes"]]
},
{
  id: "wasmachine-lekt",
  cat: "wasmachines",
  q: "Mijn wasmachine lekt: waar komt het water vandaan?",
  title: "Wasmachine lekt water: oorzaken per plek en oplossingen",
  desc: "Lekt je wasmachine aan de achterkant, onderaan voor, bij de deur of bij het zeepbakje? Per plek de oorzaak en wat je zelf kunt doen.",
  lead: "Waar het water vandaan komt, vertelt je meestal wat er lekt. Begin altijd met de veiligheid.",
  safety: "Zet de machine uit, haal de stekker eruit en draai de waterkraan dicht voordat je gaat zoeken. Leg handdoeken neer om het water op te vangen.",
  secs: [
    ["Achterkant of onderkant", `<p>De afvoerslang of de toevoerslang lekt, is gescheurd of aangetast, zit geknikt of klem tegen de muur, of is niet goed vastgedraaid. Is de slang verstopt, spoel hem dan door onder de kraan. Gebruik je een verlengstuk, controleer dan of de koppeling nog goed vastzit.</p>`],
    ["Voorkant, onderaan", `<p>De afvoerpomp kan lekken doordat de rubberen afdichtingen slijten of scheuren. Bij sommige machines moet je eerst via een aftapslangetje het water eruit laten lopen. Een nieuwe pomp is meestal niet duur; een monteur rekent er veel meer voor.</p>`],
    ["Deur", `<p>Het glas moet stevig tegen de rubberen deurrand drukken. Vuil kan dat verhinderen: maak de rand schoon. Scheurtjes in het rubber betekenen meestal dat de deurrubber vervangen moet worden.</p>`],
    ["Zeepbakje", `<p>Een bakje dat niet goed sluit, kan lekken. Te veel wasmiddel kan ook resten en lekkage geven.</p>`],
    ["Voorkomen", `<ul><li>Zet de machine waterpas en vul hem niet te vol.</li><li>Maak de deurrand en het zeepbakje regelmatig schoon.</li><li>Controleer de slangen en de afvoer een paar keer per jaar.</li><li>Gebruik de aanbevolen hoeveelheid wasmiddel.</li></ul>`]
  ],
  faq: [
    ["Waarom lekt mijn wasmachine aan de onderkant?", "Vaak lekt een slang (toevoer of afvoer) of de afvoerpomp. Controleer de slangen op scheuren en knikken en of ze goed vastzitten."],
    ["Mijn wasmachine lekt bij de deur, wat nu?", "Maak de rubberen deurrand schoon zodat het glas goed afsluit. Zitten er scheurtjes in het rubber, dan moet de deurrubber vervangen worden."],
    ["Kan te veel wasmiddel lekkage geven?", "Ja, te veel wasmiddel kan resten opbouwen en lekkage bij het zeepbakje geven."]
  ],
  src: [["ID.nl – Help, mijn wasmachine lekt! Dit zijn de verschillende oorzaken", "https://id.nl/huis-en-entertainment/huishouden/wassen-en-drogen/help-mijn-wasmachine-lekt-dit-zijn-de-verschillende-oorzaken"]],
  rel: [["kennisbank-wasmachine-onderhoud.html", "Wasmachine onderhouden"], ["wasmachines.html", "Alle wasmachines en foutcodes"]]
},
{
  id: "cv-ketel-onderhoud",
  cat: "cv-ketels",
  q: "Hoe vaak moet een cv-ketel onderhouden worden?",
  title: "Cv-ketel onderhoud: hoe vaak en waarom het nodig is",
  desc: "Laat je cv-ketel minstens elke twee jaar onderhouden, een oudere of veelgebruikte ketel elk jaar. Waarom onderhoud nodig is en wat de monteur doet.",
  lead: "Het advies is om je cv-ketel minstens elke twee jaar te laten onderhouden. Een oudere of veelgebruikte ketel heeft soms elk jaar een beurt nodig. Volg ook de richtlijnen van de fabrikant.",
  secs: [
    ["Waarom onderhoud?", `<ul><li><b>Veiligheid</b>: een slecht onderhouden ketel kan koolmonoxide uitstoten, een geurloos en kleurloos gas.</li><li><b>Zuiniger</b>: een onderhouden ketel verbruikt minder energie.</li><li><b>Langer mee</b>: slijtage wordt op tijd ontdekt.</li></ul>`],
    ["Wat doet de monteur?", `<p>De monteur maakt de brander, de warmtewisselaar en andere belangrijke onderdelen schoon, stelt ze af en controleert op lekkages en defecten. Laat het doen door een erkende monteur.</p><p>Heb je een hybride systeem (warmtepomp met cv-ketel)? Dan hebben beide onderdelen hun eigen onderhoud nodig; de warmtepomp meestal minder vaak. Kijk in beide handleidingen.</p>`],
    ["Wat je zelf kunt doen", `<p>De waterdruk controleren en bijvullen en de radiatoren ontluchten doe je zelf. Zie <a href="kennisbank-cv-ketel-druk-zakt.html">waarom zakt de druk van mijn cv-ketel</a> en <a href="kennisbank-radiatoren-ontluchten.html">radiatoren ontluchten</a>.</p>`]
  ],
  faq: [
    ["Hoe vaak moet een cv-ketel onderhouden worden?", "Minstens elke twee jaar. Een oudere of intensief gebruikte ketel kan elk jaar een controle nodig hebben."],
    ["Waarom is onderhoud van de cv-ketel nodig?", "Voor de veiligheid (een slecht onderhouden ketel kan koolmonoxide uitstoten), voor een lager energieverbruik en om slijtage op tijd te ontdekken."],
    ["Wat doet de monteur bij een onderhoudsbeurt?", "Hij maakt de brander, de warmtewisselaar en andere belangrijke onderdelen schoon, stelt ze af en controleert op lekkages en defecten."]
  ],
  src: [["ID.nl – Waarom is onderhoud aan de cv-ketel eigenlijk nodig?", "https://id.nl/energie-en-klimaat/klimaat-en-luchtkwaliteit/klimaatbeheersing/waarom-is-onderhoud-aan-de-cv-ketel-eigenlijk-nodig"]],
  rel: [["kennisbank-koolmonoxide.html", "Koolmonoxide herkennen en voorkomen"], ["cv-ketels.html", "Alle cv-ketels en foutcodes"]]
},
{
  id: "printer-strepen-slechte-afdruk",
  cat: "printers",
  q: "Mijn inkjetprinter print strepen: wat kan ik doen?",
  title: "Inkjetprinter print strepen of vage kleuren: zo los je het op",
  desc: "Strepen of ontbrekende kleuren? Print eerst een testpagina zonder computer, controleer de inkt, reinig en lijn de printkoppen uit en controleer de cartridges.",
  lead: "Strepen, vage of ontbrekende kleuren komen meestal door weinig inkt, opgedroogde printkoppen of een cartridge die niet goed zit.",
  secs: [
    ["Stap 1: testpagina zonder computer", `<p>Print een testpagina vanaf de printer zelf. Is die goed? Dan ligt het waarschijnlijk aan de printerdriver op je computer: werk de driver bij via Windows Update of de site van de fabrikant, of verwijder de printer en voeg hem opnieuw toe. Is de testpagina ook slecht, ga dan verder met de stappen hieronder.</p>`],
    ["Stap 2: inkt en printkoppen", `<ol><li>Controleer het inktniveau. Bij niet-originele cartridges geeft de printer soms geen waarschuwing.</li><li>Start een reinigingsronde van de printkoppen via het menu van de printer.</li><li>Lijn de printkoppen daarna uit met de testpagina van de printer.</li><li>Bij een hardnekkige verstopping kan een reinigingscartridge helpen; volg de instructies van de leverancier.</li></ol>`],
    ["Stap 3: cartridge", `<ol><li>Controleer of het de juiste cartridge voor je model is.</li><li>Zet de printer uit, haal de stekker eruit en wacht tien seconden.</li><li>Maak de chip van de cartridge schoon met je vinger en plaats hem opnieuw.</li><li>Helpt het niet, koop dan een nieuwe cartridge.</li></ol>`],
    ["Voorkomen", `<ul><li>Print elke twee tot vier weken een testpagina, zodat de inkt niet opdroogt.</li><li>Zet de printer niet steeds aan en uit: bij elke start kan hij een reinigingsronde doen die inkt kost.</li><li>Print je weinig? Kies dan geen XXL-cartridges.</li></ul>`]
  ],
  faq: [
    ["Waarom print mijn printer strepen?", "Meestal door weinig inkt, opgedroogde of verstopte printkoppen of een cartridge die niet goed contact maakt."],
    ["Hoe reinig je de printkoppen?", "Start een reinigingsronde via het menu van de printer en lijn de koppen daarna uit met de testpagina. Bij een hardnekkige verstopping kan een reinigingscartridge helpen."],
    ["Hoe voorkom je dat de inkt opdroogt?", "Print elke twee tot vier weken een testpagina en zet de printer niet steeds aan en uit."]
  ],
  src: [["Test-Aankoop Repair Guide – Inkjet: printkwaliteit is ondermaats", "https://www.test-aankoop.be/repairguide/printers/inkjet-printkwaliteit-is-ondermaats"]],
  rel: [["printers.html", "Alle printers en foutcodes"]]
},
{
  id: "inductie-pan-niet-herkend",
  cat: "kookplaten",
  q: "Mijn inductieplaat herkent de pan niet of zoemt: wat nu?",
  title: "Inductie: pan wordt niet herkend, zoemt of trilt",
  desc: "Knippert de kookzone of gebeurt er niets? Test je pan met een magneet en kies een pan die bij de kookzone past. Zoemen betekent meestal een te hoge stand.",
  lead: "Een inductiekookplaat werkt alleen met een pan met een magnetische bodem die bij de grootte van de kookzone past.",
  secs: [
    ["Pan wordt niet herkend", `<ol><li>Houd een koelkastmagneet tegen de bodem van de pan. Blijft hij stevig plakken, dan is de pan geschikt voor inductie.</li><li>Kies een pan die past bij de kookzone: een te kleine of te grote pan kan de herkenning verstoren.</li><li>Een bodem van minstens 4 à 5 mm dik beperkt aanbranden en trillen.</li></ol>`],
    ["Zoemen of trillen", `<p>Een zoemend geluid of een trillende pan betekent meestal dat de stand te hoog staat. Zet het vermogen lager.</p>`],
    ["Schoonmaken zonder krassen", `<ul><li>Suikers kunnen het glas aantasten.</li><li>Gebruik een licht vochtige doek met een mild middel, geen schuurmiddel of schuurspons.</li><li>Gebruik houten of siliconen keukengerei om krassen in de pannen te voorkomen.</li></ul>`]
  ],
  faq: [
    ["Hoe weet je of een pan geschikt is voor inductie?", "Houd een koelkastmagneet tegen de bodem. Blijft hij stevig plakken, dan is de pan geschikt."],
    ["Waarom zoemt mijn inductiekookplaat?", "Meestal staat het vermogen te hoog. Zet de stand lager."],
    ["Waarom herkent de kookplaat mijn pan niet?", "De bodem is niet magnetisch, of de pan is te klein of te groot voor de kookzone."]
  ],
  src: [["ID.nl – 5 veelgemaakte fouten bij het koken op inductie", "https://id.nl/huis-en-entertainment/koken-en-tafelen/keukenapparatuur/5-veelgemaakte-fouten-bij-het-koken-op-inductie"]],
  rel: [["kookplaten.html", "Alle kookplaten en foutcodes"]]
},
{
  id: "oven-schoonmaken-pyrolyse",
  cat: "ovens",
  q: "Hoe maak je een oven schoon, met of zonder pyrolyse?",
  title: "Oven schoonmaken: pyrolyse of baking soda",
  desc: "Pyrolyse verbrandt vet bij ongeveer 500 °C tot as. Geen pyrolyse? Gebruik een pasta van baking soda en water. Zo maak je je oven en ovenruit schoon zonder krassen.",
  lead: "Hoe eerder je schoonmaakt, hoe makkelijker het gaat: vuil zet zich steeds harder vast.",
  secs: [
    ["Met pyrolyse", `<ul><li>De oven warmt op tot ongeveer 500 °C en verbrandt vetresten tot as.</li><li>Haal vooraf roosters en bakplaten eruit, tenzij ze pyrolysebestendig zijn.</li><li>Volg voor de duur de instructies van de fabrikant.</li><li>Veeg na afloop de as weg.</li></ul>`],
    ["Zonder pyrolyse: baking soda", `<ol><li>Maak een pasta van baking soda en water en smeer die royaal uit. Laat de verwarmingselementen vrij.</li><li>Laat het een nacht inwerken en veeg de oven de volgende dag schoon met een vochtige doek.</li><li>Hardnekkige vlekken: combineer baking soda met azijn; het schuimen helpt het vuil loswerken.</li><li>Gebruik ammoniak of een chemische ovenreiniger alleen als laatste redmiddel, met goede ventilatie en rubberen handschoenen.</li></ol>`],
    ["Ovenruit", `<p>Maak een pasta van baking soda en citroensap, laat die een paar minuten inwerken en veeg zacht weg. Gebruik geen ruw schuurmiddel: dat geeft krassen.</p>`]
  ],
  faq: [
    ["Hoe werkt pyrolyse?", "De oven warmt op tot ongeveer 500 °C, waardoor vetresten verbranden tot as. Die veeg je na afloop weg."],
    ["Moeten de roosters eruit bij pyrolyse?", "Ja, haal roosters en bakplaten eruit, tenzij ze pyrolysebestendig zijn."],
    ["Hoe maak je een oven schoon zonder pyrolyse?", "Smeer een pasta van baking soda en water uit (niet op de verwarmingselementen), laat die een nacht inwerken en veeg hem dan weg met een vochtige doek."]
  ],
  src: [["ID.nl – De ultieme gids voor het schoonmaken van je oven", "https://id.nl/huis-en-entertainment/koken-en-tafelen/keukenapparatuur/de-ultieme-gids-voor-het-schoonmaken-van-je-oven"]],
  rel: [["ovens.html", "Alle ovens en foutcodes"]]
},
{
  id: "waterhardheid-kalk",
  cat: "waterontharders",
  q: "Hoe hard is mijn kraanwater, en heb ik een waterontharder nodig?",
  title: "Waterhardheid (°dH): hard of zacht water en kalk voorkomen",
  desc: "Waterhardheid geeft aan hoeveel calcium en magnesium er in je water zit. Wat °dH betekent, wanneer water hard is en hoe je vaatwasser en wasmiddel erop afstemt.",
  lead: "Waterhardheid geeft aan hoeveel calcium en magnesium er in het water zit. Hoe harder het water, hoe meer kalk in je apparaten.",
  secs: [
    ["Wat betekenen de getallen?", `<ul><li>Hardheid wordt vaak uitgedrukt in Duitse hardheid (°dH). 7,8 °dH is 1,40 mmol/l.</li><li>Tussen 8 en 12 °dH is water gemiddeld hard; boven 12 °dH is het hard.</li><li>Gemiddeld is het Nederlandse kraanwater 8 °dH.</li></ul>`],
    ["Hoe hard is mijn water?", `<p>Kijk op de website van je eigen waterbedrijf. Zo levert Waternet (Amsterdam en omgeving) water van 7,8 °dH. Volgens Waternet is daar geen waterontharder nodig, ook niet voor de wasmachine of vaatwasser.</p>`],
    ["Apparaten instellen", `<ul><li>Op de verpakking van je wasmiddel staat de dosering per waterhardheid.</li><li>Veel vaatwassers en koffiemachines hebben een instelling voor de waterhardheid; die staat in de handleiding.</li></ul>`],
    ["Kalk in huis voorkomen", `<ul><li>Spoel de douche na met koud water en droog de cabine af met een handdoek.</li><li>Kalk in de douchekop? Schroef hem los en laat hem een nacht weken in schoonmaakazijn.</li><li>Waterkoker of koffiezetapparaat: ontkalk volgens de instructies van de fabrikant.</li></ul>`]
  ],
  faq: [
    ["Wanneer is water hard?", "Boven 12 °dH. Tussen 8 en 12 °dH is water gemiddeld hard. Gemiddeld is Nederlands kraanwater 8 °dH."],
    ["Waar vind ik de waterhardheid van mijn kraanwater?", "Op de website van je waterbedrijf."],
    ["Heb ik een waterontharder nodig?", "Dat hangt af van je water. Waternet zegt bijvoorbeeld dat bij hun water (7,8 °dH) geen ontharder nodig is. Kijk bij je eigen waterbedrijf."]
  ],
  src: [["Waternet – Tap water hardness", "https://www.waternet.nl/en/service-and-contact/tap-water/tap-water-hardness/"], ["ID.nl – Zout en glansspoelmiddel in de vaatwasser: zo zit het", "https://id.nl/huis-en-entertainment/koken-en-tafelen/keukenapparatuur/waarom-je-vaatwasser-zout-en-glansspoelmiddel-nodig-heeft-ook-met-all-in-one-tabletten"]],
  rel: [["kennisbank-vaatwasser-onderhoud.html", "Vaatwasser: zout en glansmiddel"], ["kennisbank-koffiemachine-ontkalken.html", "Koffiemachine ontkalken"], ["waterontharders.html", "Waterontharders"]]
},
{
  id: "afzuigkap-filters",
  cat: "kookplaten",
  q: "Hoe vaak moet je het filter van de afzuigkap schoonmaken?",
  title: "Afzuigkapfilter reinigen of vervangen: vetfilter en koolstoffilter",
  desc: "Reinig het vetfilter van je afzuigkap ongeveer elke maand en vervang een koolstoffilter elke drie tot zes maanden. Welk filter je hebt en of het in de vaatwasser mag.",
  lead: "Vuile filters werken minder goed: vet en geuren hopen zich op en de motor moet harder werken, wat meer stroom kost.",
  secs: [
    ["Welke filters?", `<ul><li><b>Vetfilter</b> (metaal of kunststof): zit in elke afzuigkap en vangt vetdeeltjes op.</li><li><b>Koolstoffilter</b>: alleen bij een recirculatiekap. Het haalt geuren uit de lucht voordat die terug de keuken in gaat.</li></ul>`],
    ["Hoe vaak?", `<ul><li><b>Vetfilter</b>: ongeveer eens per maand reinigen, afhankelijk van hoe vaak je kookt. Metalen vetfilters mogen vaak in de vaatwasser; kijk in de handleiding.</li><li><b>Koolstoffilter</b>: meestal elke drie tot zes maanden vervangen. Sommige kappen hebben een indicator. Gaan geuren slechter weg, dan is het tijd voor een nieuw filter.</li></ul>`]
  ],
  faq: [
    ["Hoe vaak moet je het vetfilter van de afzuigkap schoonmaken?", "Ongeveer eens per maand, afhankelijk van hoe vaak je kookt."],
    ["Mag het filter van de afzuigkap in de vaatwasser?", "Metalen vetfilters kunnen vaak in de vaatwasser. Controleer het in de handleiding. Een koolstoffilter vervang je."],
    ["Hoe vaak vervang je een koolstoffilter?", "Meestal elke drie tot zes maanden, of eerder als geuren slechter worden afgevoerd."]
  ],
  src: [["ID.nl – Dit moet je weten over de filters in je afzuigkap", "https://id.nl/huis-en-entertainment/koken-en-tafelen/keukenapparatuur/dit-moet-je-weten-over-de-filters-in-je-afzuigkap"]],
  rel: [["kookplaten.html", "Alle kookplaten en foutcodes"]]
},
{
  id: "wasmachine-centrifugeert-niet",
  cat: "wasmachines",
  q: "Waarom centrifugeert mijn wasmachine niet?",
  title: "Wasmachine centrifugeert niet: onbalans, filter of slang",
  desc: "Is de was nog nat na het programma? Meestal is de lading uit balans, zit het pompfilter vol of is een slang geknikt. Zo controleer je het stap voor stap.",
  lead: "Een wasmachine centrifugeert niet of op een lager toerental als de was uit balans is: zo beschermt hij zichzelf. Ook een vol filter of een geknikte slang kan de oorzaak zijn.",
  secs: [
    ["1. Lading uit balans", `<p>Verdeel de was opnieuw in de trommel en start het centrifugeerprogramma opnieuw.</p>`],
    ["2. Programma", `<p>Controleer of je een programma hebt gekozen mét centrifugeren.</p>`],
    ["3. Pompfilter", `<p>Maak het pompfilter schoon en haal voorwerpen weg die de pomp kunnen blokkeren.</p>`],
    ["4. Slangen", `<ol><li>Controleer de toevoerslang op knikken en trek die recht.</li><li>Trek de machine iets naar voren en controleer ook de afvoerslang.</li><li>Test op verstopping: haal de afvoerslang los van de sifon, hang het uiteinde in een emmer en start het pompprogramma. Loopt de emmer langzaam of niet vol? Maak de afvoerslang en de sifon schoon.</li></ol><p>Centrifugeert hij daarna nog steeds niet, laat dan een monteur kijken.</p>`]
  ],
  faq: [
    ["Waarom centrifugeert mijn wasmachine niet?", "Meestal is de lading uit balans, zit het pompfilter vol of is een slang geknikt of verstopt. Controleer ook of het programma centrifugeren bevat."],
    ["Waarom centrifugeert de wasmachine niet bij weinig was?", "Bij een lading die uit balans is, centrifugeert de machine niet of langzamer om zichzelf te beschermen. Verdeel de was opnieuw."],
    ["Hoe test je of de afvoerslang verstopt is?", "Haal de afvoerslang los van de sifon, hang hem in een emmer en start het pompprogramma. Loopt de emmer langzaam of niet vol, dan is er een verstopping."]
  ],
  src: [["Siemens Home – Wasmachine centrifugeert niet of niet goed", "https://www.siemens-home.bsh-group.com/nl/service/ondersteuning/problemen/wasmachines/centrifugeert-niet"]],
  rel: [["kennisbank-wasmachine-onderhoud.html", "Wasmachine onderhouden"], ["wasmachines.html", "Alle wasmachines en foutcodes"]]
},
{
  id: "elektrische-auto-laadt-niet",
  cat: "laadpalen",
  q: "Mijn elektrische auto laadt niet: wat kan het zijn?",
  title: "Elektrische auto laadt niet: laadpas, kabel, laadpaal of instellingen",
  desc: "Laadt je elektrische auto niet op? Controleer de laadpas, de laadkabel, de laadpaal en of uitgesteld laden aan staat. Wanneer de Wegenwacht kan helpen.",
  lead: "Als je auto niet laadt, zit het probleem meestal in de laadpas, de kabel, de laadpaal of een instelling in de auto.",
  secs: [
    ["Controleer deze vier dingen", `<ol><li><b>Laadpas</b>: gebruik je de juiste pas en is de laadsessie gestart? Meestal hoor je een geluid of zie je een blauw lampje.</li><li><b>Laadkabel</b>: zit hij goed vast in de auto en in de laadpaal? Kijk of de kabel of stekker beschadigd is. De volgorde van aansluiten maakt tegenwoordig niet meer uit.</li><li><b>Laadpaal</b>: de paal kan een storing hebben. Probeer een andere laadpaal als dat kan.</li><li><b>Auto-instellingen</b>: staat uitgesteld laden aan, bijvoorbeeld om pas met het nachttarief te beginnen?</li></ol>`],
    ["Lukt het nog steeds niet?", `<p>Dan kan het gaan om software, een defect onderdeel of de stroomvoorziening. De Wegenwacht kan helpen met mobiele laders. Heb je een eigen laadpaal thuis? Kijk ook bij <a href="laadpaal-resetten.html">laadpaal herstarten</a>.</p>`]
  ],
  faq: [
    ["Waarom laadt mijn elektrische auto niet op?", "Meestal door de laadpas, een kabel die niet goed vastzit of beschadigd is, een storing in de laadpaal of een instelling zoals uitgesteld laden."],
    ["Maakt de volgorde van de laadkabel aansluiten uit?", "Nee, de volgorde van aansluiten is tegenwoordig niet meer relevant."],
    ["Wie helpt als mijn elektrische auto niet laadt?", "De Wegenwacht kan helpen met mobiele laders."]
  ],
  src: [["ANWB – Elektrische auto laadt niet op", "https://www.anwb.nl/auto/elektrisch-rijden/opladen/elektrische-auto-laadt-niet-op"]],
  rel: [["laadpaal-resetten.html", "Laadpaal herstarten"], ["laadkabel-zit-vast.html", "Laadkabel zit vast"], ["laadpalen.html", "Alle laadpalen en foutcodes"]]
},
{
  id: "mobiele-airco-goed-gebruiken",
  cat: "airco",
  q: "Hoe gebruik je een mobiele airco goed?",
  title: "Mobiele airco goed installeren: slang, raamafdichting en stroom",
  desc: "Koelt je mobiele airco slecht? Hang de slang niet zomaar uit het raam, maar dicht de raamopening af. Gebruik een vast stopcontact en leeg het condenswaterreservoir.",
  lead: "Een mobiele airco koelt alleen goed als de warme lucht echt naar buiten gaat en niet terugwaait.",
  secs: [
    ["Plaats en stroom", `<ul><li>Zet de airco bij een raam of deur en houd ruimte vrij rond het toestel, niet tegen een muur of kast.</li><li>Gebruik een vast stopcontact dat 1000 tot 2500 watt aankan. Een verlengsnoer of stekkerblok dat dit vermogen niet aankan, is gevaarlijk.</li></ul>`],
    ["Slang en raam", `<ul><li>Voer de warme lucht via de slang naar buiten. Hang de slang niet zomaar uit een open raam: dan waait de warme lucht terug naar binnen.</li><li>Dicht de raamopening af met een raamafdichtingskit, of met een zelfgemaakt paneel van plexiglas of hout met een gat voor de slang.</li></ul>`],
    ["Condenswater en vermogen", `<ul><li>Kijk of je model het condenswater via de slang laat verdampen of in een reservoir opvangt. Leeg een reservoir regelmatig, zeker op warme en vochtige dagen.</li><li>Kies het vermogen bij de grootte van de ruimte: bijvoorbeeld 9000 tot 12.000 BTU voor 30 tot 40 m². Een te klein model is een veelgemaakte fout.</li><li>Met een timer, wifi of slimme stekker gaat de airco op het juiste moment aan.</li></ul>`]
  ],
  faq: [
    ["Mag de slang van een mobiele airco gewoon uit het raam?", "Liever niet: dan waait de warme lucht terug naar binnen. Dicht de raamopening af met een raamafdichtingskit of een paneel met een gat voor de slang."],
    ["Mag een mobiele airco op een verlengsnoer?", "Gebruik een vast stopcontact. Een verlengsnoer of stekkerblok dat 1000 tot 2500 watt niet aankan, is gevaarlijk."],
    ["Hoeveel BTU heb ik nodig?", "Als richtlijn ongeveer 9000 tot 12.000 BTU voor een ruimte van 30 tot 40 m²."]
  ],
  src: [["ID.nl – Mobiele airco installeren zonder gedoe: zo doe je dat", "https://id.nl/energie-en-klimaat/klimaat-en-luchtkwaliteit/klimaatbeheersing-in-huis/mobiele-airco-installeren-zonder-gedoe-zo-doe-je-dat"]],
  rel: [["kennisbank-airco-onderhoud.html", "Airco onderhouden"], ["airco.html", "Alle airco's en foutcodes"]]
},
{
  id: "ebike-accu-winter",
  cat: "e-bikes",
  q: "Hoe kom je met je e-bike-accu de winter door?",
  title: "E-bike-accu in de winter: bereik, laden en opslaan",
  desc: "In de kou kan je e-bike-accu 25 tot 30 procent capaciteit verliezen. Laad hem op kamertemperatuur, bewaar hem boven 10 °C en op 40 tot 60 procent als je hem een tijd niet gebruikt.",
  lead: "In de kou kan een e-bike-accu 25 tot 30 procent capaciteit verliezen. Dat herstelt als het warmer wordt.",
  secs: [
    ["Laden in de winter", `<ul><li>Vriest het een paar dagen flink? Neem de accu dan mee naar binnen om te laden en te bewaren.</li><li>Laat een koude accu na een rit eerst minstens een uur binnen opwarmen voordat je hem laadt.</li><li>Laad nooit 's nachts of als er niemand thuis is, en hang een rookmelder bij de plek waar je laadt.</li></ul>`],
    ["Rijden en bereik", `<ul><li>Blijf fietsen: regelmatig gebruik houdt de cellen actief.</li><li>Een neopreen hoes houdt de accu warmer en kan bij strenge kou zo'n 5 tot 10 km extra bereik geven.</li><li>Neem op lange ritten de lader mee voor een korte tussenstop.</li></ul>`],
    ["Lange tijd niet gebruiken", `<p>Bewaar de accu droog op een plek die boven 10 °C blijft, en laad hem tot 40 à 60 procent. Laat hem om de paar weken bijladen. Een helemaal lege accu in de kou kan blijvend beschadigd raken.</p>`]
  ],
  faq: [
    ["Gaat een e-bike-accu minder lang mee in de winter?", "Ja, in de kou kan de capaciteit 25 tot 30 procent lager zijn. Dat herstelt als het warmer wordt."],
    ["Mag je een koude e-bike-accu meteen opladen?", "Laat hem na een koude rit eerst minstens een uur binnen opwarmen voordat je hem laadt."],
    ["Hoe bewaar je een e-bike-accu in de winter?", "Droog, op een plek die boven 10 °C blijft, en geladen tot 40 à 60 procent. Laad hem om de paar weken bij."]
  ],
  src: [["ID.nl – Haal genoeg bereik uit je fietsaccu in de winter", "https://id.nl/mobiliteit/fiets/e-bikes/haal-genoeg-bereik-uit-je-fietsaccu-in-de-winter"]],
  rel: [["kennisbank-ebike-accu-veilig-laden.html", "E-bike-accu veilig opladen"], ["e-bikes.html", "Alle e-bikes en foutcodes"]]
},
{
  id: "rookmelder-testen-vervangen",
  cat: "rookmelders",
  q: "Hoe vaak moet je een rookmelder testen en vervangen?",
  title: "Rookmelder testen, schoonmaken en vervangen: hoe vaak?",
  desc: "Test je rookmelder elke maand, maak hem minstens één keer per jaar stofvrij en vervang de hele melder na tien jaar. Wanneer de batterij vervangen moet, per soort melder.",
  lead: "Een rookmelder werkt alleen als je hem onderhoudt. Het kost een paar minuten per jaar.",
  secs: [
    ["Schema", `<ul><li><b>Elke maand</b>: test de melder met de testknop.</li><li><b>Minstens één keer per jaar</b>: stof de melder af of ga er met de stofzuigermond langs.</li><li><b>Na tien jaar</b>: vervang de hele melder, zodat de sensor betrouwbaar blijft.</li></ul>`],
    ["Batterij vervangen", `<ul><li>Melder met 9-voltbatterij (eenjarig): elk jaar een nieuwe batterij.</li><li>Melder met AA-batterijen: ongeveer om de drie jaar.</li><li>Melder met ingebouwde lithiumbatterij van tien jaar: de batterij hoeft nooit vervangen te worden.</li><li>Haal de batterij er alleen uit om hem te vervangen.</li></ul>`],
    ["Welke melder?", `<ul><li><b>Optisch</b>: aangeraden voor woningen, ziet ook een smeulende brand vroeg.</li><li><b>Thermisch</b>: reageert op warmte, niet op rook. Geschikt voor keuken, badkamer en garage.</li><li><b>Koppelbaar</b>: gaat één melder af, dan gaan ze allemaal af.</li><li><b>Ionisatiemelder</b>: bevat een radioactieve bron en wordt sinds eind 2005 niet meer verkocht. Vervang hem door een optische melder en lever hem in bij het klein chemisch afval.</li></ul>`]
  ],
  faq: [
    ["Hoe vaak moet je een rookmelder testen?", "Elke maand, met de testknop."],
    ["Wanneer moet je een rookmelder vervangen?", "Na tien jaar vervang je de hele melder, zodat de sensor betrouwbaar blijft."],
    ["Hoe vaak moet de batterij van een rookmelder vervangen?", "Een 9-voltbatterij elk jaar, AA-batterijen ongeveer om de drie jaar. Een melder met een ingebouwde lithiumbatterij van tien jaar hoeft geen nieuwe batterij."]
  ],
  src: [["Brandveilig.com – Algemene informatie over rookmelders", "https://www.brandveilig.com/nieuws/algemene-informatie-over-rookmelders-27022"]],
  rel: [["kennisbank-rookmelder-regels.html", "Hoeveel rookmelders moet ik hebben?"], ["rookmelder-vals-alarm.html", "Rookmelder gaat zomaar af of piept"], ["rookmelders.html", "Alle rookmelders en CO-melders"]]
},
{
  id: "radiator-blijft-koud",
  cat: "cv-ketels",
  q: "Eén radiator blijft koud: hoe los je dat op?",
  title: "Radiator blijft koud: lucht, lage druk of vastzittend pennetje",
  desc: "Bovenaan koud? Dan zit er lucht in. Bovenverdieping koud? Dan is de druk te laag. Eén radiator helemaal koud? Dan zit het pennetje van de thermostaatkraan vast.",
  lead: "Waar en hoe een radiator koud blijft, vertelt je wat er aan de hand is. Drie oorzaken los je meestal zelf op.",
  secs: [
    ["Bovenaan koud: lucht", `<p>Lucht stijgt op en verzamelt zich bovenin de radiator. Vaak hoor je ook tikken of borrelen. Ontlucht de radiatoren: zie het <a href="kennisbank-radiatoren-ontluchten.html">stappenplan radiatoren ontluchten</a>.</p>`],
    ["Bovenverdieping koud: druk te laag", `<p>De druk zakt ongeveer 0,1 bar per meter hoogte, dus de bovenverdieping merkt het eerst. De druk onderaan moet minstens 1,5 bar zijn om boven nog 1 bar over te houden. Vul bij tot 1,5 à 2 bar: zie <a href="kennisbank-cv-ketel-druk-zakt.html">waterdruk bijvullen</a>.</p>`],
    ["Eén radiator helemaal koud: pennetje vast", `<p>Worden de andere radiatoren wel warm? Dan zit het pennetje in de thermostaatkraan waarschijnlijk vast door kalk of vuil.</p><ol><li>Zet de knop op de hoogste stand, draai de moer los en haal de knop eraf.</li><li>Druk op het pennetje. Het moet makkelijk bewegen en terugveren.</li><li>Zit het vast? Tik een paar keer met een klein hamertje tegen de zijkant van de koppeling.</li><li>Beweegt het pennetje weer vrij, zet dan de knop terug.</li></ol>`],
    ["Wanneer bel je een monteur?", `<ul><li>De druk blijft zakken zonder duidelijke oorzaak (mogelijk een kapot expansievat).</li><li>De ketel blijft in storing na bijvullen en resetten.</li></ul><p>Krijg je hoofdpijn, word je duizelig of misselijk, of gaat de CO-melder af? Ga direct naar buiten: het kan koolmonoxide zijn.</p>`]
  ],
  faq: [
    ["Waarom blijft één radiator koud terwijl de rest warm wordt?", "Meestal zit het pennetje in de thermostaatkraan vast door kalk of vuil. Haal de knop eraf en maak het pennetje weer los."],
    ["Waarom wordt de radiator alleen onderaan warm?", "Dan zit er lucht bovenin de radiator. Ontluchten helpt."],
    ["Waarom zijn de radiatoren boven koud?", "De druk is te laag. De druk zakt ongeveer 0,1 bar per meter hoogte, dus onderaan moet minstens 1,5 bar staan."]
  ],
  src: [["Welingelichte Kringen – Zo krijg je een koude radiator zelf weer warm, zonder voorrijkosten", "https://www.welingelichtekringen.nl/tips/ketel-op-storing-bij-de-eerste-kou-deze-drie-dingen-los-je-zelf-op-zonder-monteur"]],
  rel: [["kennisbank-radiatoren-ontluchten.html", "Radiatoren ontluchten"], ["kennisbank-cv-ketel-druk-zakt.html", "Waarom zakt de druk van mijn cv-ketel?"], ["cv-ketels.html", "Alle cv-ketels en foutcodes"]]
},
{
  id: "wasmachine-trilt",
  cat: "wasmachines",
  q: "Waarom trilt of loopt mijn wasmachine?",
  title: "Wasmachine trilt of loopt weg: transportbouten, waterpas en ondergrond",
  desc: "Een wasmachine die trilt of door de ruimte loopt, staat vaak niet waterpas, heeft nog transportbouten of staat op een houten vloer. Zo los je het op.",
  lead: "Een wasmachine die trilt of wegloopt, heeft meestal een van deze vier oorzaken.",
  secs: [
    ["1. Transportbouten zitten er nog in", `<p>Vooral bij een nieuwe of verhuisde machine. Verwijder de transportbouten en hulzen, sluit de gaten af met de meegeleverde kapjes en bewaar de bouten voor een volgende verhuizing.</p>`],
    ["2. Niet waterpas", `<p>Controleer met een waterpas. Stel de voetjes bij en zet ze vast zoals de handleiding beschrijft.</p>`],
    ["3. Ondergrond", `<p>Vooral houten vloeren zijn niet geschikt. Zet de machine op een harde ondergrond, het liefst in een hoek van de ruimte.</p>`],
    ["4. Belading", `<p>Te veel of te weinig was kan trillen veroorzaken. Vul de machine volgens de handleiding.</p><p>Blijft hij trillen, laat dan een monteur kijken.</p>`]
  ],
  faq: [
    ["Waarom loopt mijn wasmachine weg tijdens het centrifugeren?", "Vaak zitten de transportbouten er nog in, staat de machine niet waterpas of staat hij op een houten vloer."],
    ["Hoe zet je een wasmachine waterpas?", "Controleer met een waterpas, stel de voetjes bij en zet ze vast zoals de handleiding beschrijft."],
    ["Moeten de transportbouten eruit?", "Ja. Verwijder bouten en hulzen, sluit de gaten af met de kapjes en bewaar de bouten voor een verhuizing."]
  ],
  src: [["Siemens Home – Hoe voorkom ik een trillende en wandelende wasmachine?", "https://www.siemens-home.bsh-group.com/nl/service/ondersteuning/problemen/wasmachines/trilt"]],
  rel: [["kennisbank-wasmachine-centrifugeert-niet.html", "Wasmachine centrifugeert niet"], ["wasmachines.html", "Alle wasmachines en foutcodes"]]
},
{
  id: "bevroren-waterleiding",
  cat: null,
  q: "Hoe voorkom je een bevroren waterleiding, en wat als hij toch bevriest?",
  title: "Bevroren waterleiding: voorkomen, ontdooien en wat te doen bij een lek",
  desc: "Tap je buitenkraan af, isoleer leidingen en houd de thermostaat op minstens 14 °C. Is een leiding bevroren? Hoofdkraan dicht en langzaam ontdooien met een föhn of kacheltje.",
  lead: "Als water in een leiding bevriest, kan de leiding scheuren. Met een paar maatregelen voor de vorst voorkom je veel waterschade.",
  secs: [
    ["Voorkomen", `<ul><li>Isoleer de waterleidingen met isolatiemateriaal of een deken.</li><li>Dicht kieren en tochtgaten in de ruimte met de watermeter en de hoofdkraan, en isoleer de hoofdkraan.</li><li>Zet de thermostaat nooit lager dan 14 °C, ook 's nachts en als je weg bent.</li><li>Tap kwetsbare leidingen die je weinig gebruikt, zoals de buitenkraan, af en sluit ze af.</li></ul>`],
    ["Leiding bevroren of gesprongen", `<ol><li>Draai de hoofdkraan dicht. Die zit meestal in de meterkast of onder een luikje bij de voordeur.</li><li>Zoek de bevroren of gescheurde leiding, vooral op koude, slecht geïsoleerde plekken. Zie je een scheur? Bel eerst een loodgieter voordat je gaat ontdooien.</li><li>Ontdooi de leiding langzaam: verwarm de ruimte, gebruik een elektrisch kacheltje of föhn, of wikkel er een doek met warm water omheen.</li><li>Zet alle kranen open, behalve de hoofdkraan, en zet er emmers onder.</li><li>Is de leiding ontdooid, draai de hoofdkraan dan langzaam open. Zie je een lek? Hoofdkraan weer dicht en bel een loodgieter.</li></ol>`]
  ],
  faq: [
    ["Hoe voorkom je dat de waterleiding bevriest?", "Isoleer de leidingen en de hoofdkraan, dicht kieren, zet de thermostaat niet lager dan 14 °C en tap de buitenkraan af."],
    ["Hoe ontdooi je een bevroren waterleiding?", "Draai eerst de hoofdkraan dicht. Ontdooi daarna langzaam met een föhn, een elektrisch kacheltje of een doek met warm water."],
    ["Waar zit de hoofdkraan van het water?", "Meestal in de meterkast of onder een luikje bij de voordeur."]
  ],
  src: [["Nationale-Nederlanden – Zo voorkom je een bevroren waterleiding en zo los je het op", "https://www.nn.nl/Inspiratie/Waterleiding-bevroren.htm"]],
  rel: [["kennisbank-stroomstoring-wat-doen.html", "Geen stroom: wat moet ik doen?"], ["eerste-hulp-bij-storingen.html", "Eerste hulp bij storingen"]]
},
{
  id: "telefoon-nat-geworden",
  cat: "smartphones",
  q: "Mijn telefoon is nat geworden: moet hij in de rijst?",
  title: "Telefoon nat of in het water gevallen: géén rijst, wel dit",
  desc: "Apple raadt rijst af: korreltjes kunnen je telefoon beschadigen. Tik het water eruit, laat hem drogen op een droge plek en laad hem minstens 30 minuten niet op.",
  lead: "Leg je natte telefoon niet in de rijst. Apple waarschuwt dat kleine stukjes rijst je iPhone kunnen beschadigen.",
  secs: [
    ["Wat je wel doet", `<ol><li>Tik de telefoon zachtjes tegen je hand, met de aansluiting naar beneden, om het water eruit te krijgen.</li><li>Leg hem op een droge plek waar wat lucht langs kan.</li><li>Wacht minstens 30 minuten voordat je hem oplaadt of er iets op aansluit.</li><li>Krijg je nog een vochtmelding? Laat hem dan tot een dag liggen op een droge, luchtige plek. Helemaal drogen kan tot 24 uur duren.</li><li>Is hij droog maar laadt hij niet? Haal de kabel uit de adapter en de adapter uit het stopcontact, en sluit alles opnieuw aan.</li></ol>`],
    ["Wat je niet doet", `<ul><li>Geen rijst: korrels kunnen de telefoon beschadigen.</li><li>Niet drogen met een föhn of andere warmtebron, en geen perslucht.</li><li>Geen wattenstaafjes of doekjes in de aansluiting steken.</li></ul><p>Dit advies komt van Apple voor de iPhone.</p>`]
  ],
  faq: [
    ["Moet een natte telefoon in de rijst?", "Nee. Apple raadt het af: kleine stukjes rijst kunnen de telefoon beschadigen."],
    ["Hoe lang moet je wachten met opladen na waterschade?", "Minstens 30 minuten. Helemaal drogen kan tot 24 uur duren."],
    ["Mag je een natte telefoon föhnen?", "Nee, droog hem niet met een warmtebron of perslucht. Leg hem op een droge, luchtige plek."]
  ],
  src: [["Welingelichte Kringen – Apple: 'Leg je iPhone niet in een bak rijst als hij in het water is gevallen'", "https://www.welingelichtekringen.nl/tech/apple-leg-je-iphone-niet-in-een-bak-rijst-als-hij-in-het-water-is-gevallen-maar-wat-moet-je-dan-wel-doen"]],
  rel: [["kennisbank-accu-telefoon-laptop-gezond.html", "Accu van telefoon of laptop gezond houden"], ["smartphones.html", "Alle smartphones en storingen"]]
},
{
  id: "laptop-heet-ventilator-lawaai",
  cat: "laptops",
  q: "Mijn laptop wordt heet en de ventilator maakt veel lawaai: wat kan ik doen?",
  title: "Laptop wordt heet of de ventilator loeit: oorzaken en tips",
  desc: "Een hete, luide laptop heeft vaak te veel zware programma's open, staat op een zachte ondergrond of zit vol stof. Zo maak je hem koeler en stiller.",
  lead: "Als een laptop warm wordt, draait de ventilator harder. Meestal kun je zelf zorgen dat hij koeler blijft.",
  secs: [
    ["Tips", `<ol><li><b>Sluit zware programma's</b>: kijk in Taakbeheer (Windows: Ctrl+Shift+Esc) of Activiteitenweergave (Mac) welke processen veel vragen. Ook veel tabbladen in Chrome belasten de processor.</li><li><b>Harde ondergrond</b>: zet de laptop niet op een bed of bank, die de luchtstroom blokkeren, en niet in de volle zon.</li><li><b>Stof</b>: stof houdt de warmte binnen. Je kunt het wegblazen met perslucht. Open de laptop alleen als je weet wat je doet; laat het anders iemand anders doen.</li><li><b>Koelstandaard</b>: een laptopstandaard met ingebouwde koeling helpt de warmte af te voeren.</li></ol>`]
  ],
  faq: [
    ["Waarom wordt mijn laptop zo heet?", "Vaak door zware programma's of veel tabbladen, een zachte ondergrond die de luchtstroom blokkeert, of stof in de laptop."],
    ["Hoe maak je een lawaaiige laptop stiller?", "Sluit zware programma's, zet hem op een harde ondergrond, blaas stof weg met perslucht of gebruik een koelstandaard."],
    ["Mag ik mijn laptop zelf openmaken om stof weg te halen?", "Alleen als je weet wat je doet. Laat het anders iemand anders doen."]
  ],
  src: [["AVROTROS Radar – Blijft je laptop maar loeien? Zo kom je van dat lawaai af", "https://radar.avrotros.nl/artikel/blijft-je-laptop-maar-loeien-zo-kom-je-van-dat-lawaai-af-53226"]],
  rel: [["kennisbank-accu-telefoon-laptop-gezond.html", "Accu van telefoon of laptop gezond houden"], ["laptops.html", "Alle laptops en storingen"]]
},
{
  id: "thuisbatterij-stekkerbatterij-veilig",
  cat: "zonnepanelen",
  q: "Hoe plaats je een thuisbatterij of stekkerbatterij veilig?",
  title: "Thuisbatterij of stekkerbatterij veilig plaatsen: adviezen van de brandweer",
  desc: "Zet een thuis- of stekkerbatterij niet in de vluchtroute, zorg dat hij zijn warmte kwijt kan, hang er een rookmelder bij en sluit nooit twee batterijen via een stekkerdoos aan.",
  lead: "Thuisbatterijen worden steeds populairder. De brandweer geeft een paar eenvoudige adviezen om ze veilig te gebruiken.",
  secs: [
    ["Plaats", `<ul><li>Zet de batterij niet in een vluchtroute.</li><li>Zorg dat hij zijn warmte kwijt kan en houd brandbare spullen uit de buurt.</li><li>Hang een rookmelder in de buurt.</li></ul>`],
    ["Aansluiten", `<ul><li>Overbelast geen groep in de meterkast.</li><li>Sluit nooit twee batterijen via een stekkerdoos aan op één stopcontact.</li><li>Stekkerbatterijen zijn beperkt tot 800 watt en schakelen uit als ze te warm worden. Wil je meer vermogen, zet de batterij dan op een eigen groep.</li><li>Laat bij voorkeur een installateur met de juiste kennis meekijken.</li></ul>`]
  ],
  faq: [
    ["Waar mag je een thuisbatterij neerzetten?", "Niet in een vluchtroute, op een plek waar hij zijn warmte kwijt kan en uit de buurt van brandbare spullen. Hang er een rookmelder bij."],
    ["Mag een stekkerbatterij aan een stekkerdoos?", "Sluit nooit twee batterijen via een stekkerdoos aan op één stopcontact, en overbelast geen groep in de meterkast."],
    ["Hoeveel vermogen mag een stekkerbatterij hebben?", "Stekkerbatterijen zijn beperkt tot 800 watt. Wil je meer, zet de batterij dan op een eigen groep."]
  ],
  src: [["NOS – Brandweer bezorgd over onveilig gebruik van steeds populairdere stekkerbatterij (april 2026)", "https://nos.nl/l/2609352"]],
  rel: [["kennisbank-rookmelder-regels.html", "Hoeveel rookmelders moet ik hebben?"], ["zonnepanelen.html", "Zonnepanelen, omvormers en thuisbatterijen"]]
},
{
  id: "sluipverbruik",
  cat: null,
  q: "Hoeveel stroom kost sluipverbruik, en hoe verminder je het?",
  title: "Sluipverbruik: zo'n 450 kWh per jaar, en zo verminder je het",
  desc: "Apparaten die uit of op stand-by staan, verbruiken nog stroom: gemiddeld zo'n 450 kWh per jaar, ongeveer €100. Met deze tips verminder je dat.",
  lead: "Sluipverbruik is stroom die apparaten gebruiken terwijl ze uit of op stand-by staan. Volgens Milieu Centraal gaat het bij een gemiddeld huishouden om zo'n 450 kWh per jaar, ongeveer €100.",
  secs: [
    ["Welke apparaten?", `<p>Onder meer televisies, computers en elektrische boilers. Vooral oudere apparaten verbruiken veel; nieuwere apparaten hebben er door Europese regels nauwelijks last van.</p>`],
    ["Zo verminder je het", `<ul><li>Zet apparaten echt uit of haal de stekker eruit, in plaats van ze op stand-by te laten.</li><li>Gebruik een stekkerdoos met schakelaar om meerdere apparaten tegelijk uit te zetten.</li><li>Een bespaarstekker tussen stopcontact en apparaat haalt het stand-byverbruik helemaal weg.</li><li>Meet met een energiemeter wat een apparaat verbruikt. Verbruikt het veel, zet het dan uit als je het niet gebruikt of vervang het door een zuiniger model.</li></ul>`]
  ],
  faq: [
    ["Hoeveel kost sluipverbruik per jaar?", "Volgens Milieu Centraal gebruikt een gemiddeld huishouden zo'n 450 kWh per jaar aan sluipverbruik, ongeveer €100."],
    ["Welke apparaten hebben het meeste sluipverbruik?", "Vooral oudere apparaten, zoals televisies, computers en elektrische boilers. Nieuwe apparaten hebben er door Europese regels nauwelijks last van."],
    ["Hoe meet je het verbruik van een apparaat?", "Met een energiemeter tussen stopcontact en apparaat."]
  ],
  src: [["Zonneplan – Zo verminder je sluipverbruik in huis", "https://www.zonneplan.nl/energie/besparen/sluipverbruik-verminderen/"]],
  rel: [["meterkast.html", "Meterkast en stroomstoringen"], ["repareren-of-vervangen.html", "Repareren of vervangen?"]]
},
{
  id: "oud-apparaat-inleveren",
  cat: null,
  q: "Waar lever je een oud of kapot elektrisch apparaat in?",
  title: "Oud of kapot apparaat inleveren: winkel, milieustraat of repaircafé",
  desc: "Koop je een nieuw apparaat, dan moet de verkoper het oude gratis innemen. Verder kun je terecht bij de milieustraat, een kringloopwinkel of een repaircafé.",
  lead: "Elektrische apparaten horen niet bij het restafval. Er zijn meerdere plekken waar je ze gratis kwijt kunt, of waar ze een tweede leven krijgen.",
  secs: [
    ["Waar kun je terecht?", `<ul><li><b>Bij de winkel</b>: koop je een nieuw apparaat, dan is de verkoper wettelijk verplicht het oude gratis in te nemen.</li><li><b>Milieustraat</b>: daar kun je oude of kapotte apparaten inleveren, en ook spaar- en ledlampen.</li><li><b>Kringloopwinkel</b>: voor apparaten die nog werken.</li><li><b>Repair Café</b>: kapot? Misschien kan het nog gerepareerd worden.</li><li><b>Grofvuil</b>: grote apparaten kunnen ook mee met het grofvuil, maar dan worden ze mogelijk niet allemaal gerecycled.</li></ul><p>Ook een apparaat op batterijen telt als elektrisch apparaat. Kijk bij je gemeente voor de inzamelpunten bij jou in de buurt.</p>`]
  ],
  faq: [
    ["Moet de winkel mijn oude apparaat meenemen?", "Ja, als je een nieuw apparaat koopt, is de verkoper wettelijk verplicht het oude apparaat gratis in te nemen."],
    ["Waar lever je een kapot elektrisch apparaat in?", "Bij de milieustraat, of bij de winkel als je een nieuw apparaat koopt. Misschien kan het nog gerepareerd worden in een Repair Café."],
    ["Mag een elektrisch apparaat bij het grofvuil?", "Grote apparaten kunnen mee met het grofvuil, maar worden dan mogelijk niet allemaal gerecycled. De milieustraat of de winkel is beter."]
  ],
  src: [["Gemeente Den Haag – Afval scheiden: elektrische apparaten", "https://www.denhaag.nl/nl/afval/afval-scheiden-en-hergebruik/afval-scheiden-elektrische-apparaten/"]],
  rel: [["repareren-of-vervangen.html", "Repareren of vervangen?"], ["recht-op-reparatie.html", "Recht op reparatie"]]
},
{
  id: "vaatwasser-stinkt",
  cat: "vaatwassers",
  q: "Waarom stinkt mijn vaatwasser?",
  title: "Vaatwasser stinkt: oorzaken en zo krijg je hem weer fris",
  desc: "Een stinkende vaatwasser komt meestal door etensresten en vet in het filter, de deurrubbers of de sproeiarmen, of door de afvoer. Zo los je het in zeven stappen op.",
  lead: "Een vieze lucht uit de vaatwasser komt meestal door etensresten en vet in het filter, de deurrubbers of de sproeiarmen. Ook staand vocht of de afvoer kan de oorzaak zijn.",
  secs: [
    ["Oorzaken", `<ul><li>Etensresten, die ook voor een verstopping kunnen zorgen.</li><li>Vocht dat blijft staan als de machine een tijd niet is gebruikt.</li><li>Vet en vuil in de filters, deurranden en rubbers. Daar kan schimmel in groeien, die stinkt en de rubber kan aantasten.</li><li>Verstopte gaatjes in de sproeiarmen.</li><li>Een verstopte afvoerslang, of een aansluiting zonder zwanenhals, waardoor rioollucht omhoog komt.</li></ul>`],
    ["Zo los je het op", `<ol><li>Heeft de machine stilgestaan? Laat de deur een tijdje open.</li><li>Haal de filters eruit, spoel ze onder de kraan en schrob vet weg met een borstel en wat afwasmiddel. Schep vuil water uit de filterbak en kijk of de pomp vrij is.</li><li>Neem de deurrubbers en de randen af met een doek en laat ze drogen.</li><li>Haal de sproeiarmen eruit, spoel ze af en prik verstopte gaatjes open met een cocktailprikker.</li><li>Controleer de afvoerslang op verstopping en kijk of er een zwanenhals is.</li><li>Draai het zelfreinigingsprogramma, of een leeg intensief programma met een vaatwasmachinereiniger.</li><li>Schraap voortaan etensresten van de borden. Afspoelen is niet nodig.</li></ol><p>Geurverdrijvers maskeren de lucht alleen, ze lossen de oorzaak niet op.</p>`]
  ],
  faq: [
    ["Waarom ruikt mijn vaatwasser naar riool?", "Mogelijk door een verstopte afvoerslang, of omdat de aansluiting geen zwanenhals heeft, waardoor rioollucht omhoog komt."],
    ["Hoe krijg je een stinkende vaatwasser weer fris?", "Maak de filters, deurrubbers en sproeiarmen schoon, controleer de afvoer en draai een leeg intensief programma met een vaatwasmachinereiniger."],
    ["Helpt een geurverdrijver in de vaatwasser?", "Nee, die maskeert de lucht alleen. Je moet de oorzaak, zoals vet in het filter, wegnemen."]
  ],
  src: [["ID.nl – Mijn vaatwasser stinkt", "https://id.nl/huis-en-entertainment/koken-en-tafelen/keukenapparatuur/mijn-vaatwasser-stinkt"]],
  rel: [["kennisbank-vaatwasser-onderhoud.html", "Vaatwasser onderhouden"], ["kennisbank-vaatwasser-pompt-niet-af.html", "Vaatwasser pompt niet af"], ["vaatwassers.html", "Alle vaatwassers en foutcodes"]]
},
{
  id: "cv-ketel-levensduur-vervangen",
  cat: "cv-ketels",
  q: "Hoe lang gaat een cv-ketel mee, en wanneer vervang je hem?",
  title: "Levensduur cv-ketel: 12 tot 20 jaar, en deze signalen wijzen op vervanging",
  desc: "Een cv-ketel gaat gemiddeld 12 tot 20 jaar mee. Deze signalen wijzen erop dat hij aan vervanging toe is, en deze reparaties zijn juist geen reden om te vervangen.",
  lead: "Een premium cv-ketel gaat gemiddeld 15 tot 20 jaar mee, een budgetmodel ongeveer 12 tot 15 jaar.",
  secs: [
    ["Signalen dat vervangen in zicht komt", `<ul><li><b>Leeftijd</b>: na ongeveer 15 jaar neemt de kans op storingen en een lager rendement elk jaar toe.</li><li><b>Lager rendement</b>: het rendement kan dalen van 90 à 95% naar 70% of minder. De ketel werkt dan nog, maar je energierekening stijgt.</li><li><b>Steeds kleine storingen</b>: lauw kraanwater, radiatoren die nauwelijks warm worden of een lekkende ketel.</li><li><b>Vaak uitval</b>: verwarming of warm water valt uit en resetten helpt maar even.</li><li><b>Vreemde geluiden</b>: meestal lucht, maar brommen of zoemen kan wijzen op een versleten pakking of trafo. Laat een vakman kijken.</li></ul>`],
    ["Geen reden om te vervangen", `<p>Een kapot expansievat (gaat meestal zo'n 7 jaar mee) of een kapotte circulatiepomp (meestal 15 tot 20 jaar) is vaak goedkoop te repareren. Twijfel je? Gebruik de <a href="repareren-of-vervangen.html">rekenhulp repareren of vervangen</a>.</p>`],
    ["Wat zijn de alternatieven?", `<p>Bij een hybride warmtepomp doet de warmtepomp het grootste deel van de verwarming en springt de cv-ketel bij als het heel koud is. Is je huis goed geïsoleerd, dan kan ook een volledig elektrische warmtepomp. Kijk ook of je gemeente plannen of steun heeft voor aardgasvrije wijken.</p>`]
  ],
  faq: [
    ["Hoe lang gaat een cv-ketel mee?", "Een premium ketel gemiddeld 15 tot 20 jaar, een budgetmodel ongeveer 12 tot 15 jaar."],
    ["Wanneer moet je je cv-ketel vervangen?", "Als hij ouder is dan ongeveer 15 jaar en steeds vaker storingen geeft, uitvalt of minder rendement haalt."],
    ["Moet de ketel vervangen worden als het expansievat kapot is?", "Nee, een kapot expansievat of een kapotte circulatiepomp is vaak goedkoop te repareren."]
  ],
  src: [["ID.nl – Wanneer moet je de cv-ketel vervangen?", "https://id.nl/energie-en-klimaat/klimaat-en-luchtkwaliteit/klimaatbeheersing/wanneer-moet-je-de-cv-ketel-vervangen"]],
  rel: [["kennisbank-cv-ketel-onderhoud.html", "Hoe vaak moet een cv-ketel onderhouden worden?"], ["kennisbank-warmtepomp-zuinig-instellen.html", "Warmtepomp zuinig instellen"], ["cv-ketels.html", "Alle cv-ketels en foutcodes"]]
},
{
  id: "motor-oververhit-wat-doen",
  cat: "auto",
  q: "Mijn automotor wordt te heet: wat moet ik doen?",
  title: "Motor oververhit: direct stoppen, niet de dop openen en zo vind je de oorzaak",
  desc: "Loopt de temperatuurmeter van je auto in het rood? Rijd niet door en open de dop niet bij een hete motor. Zo beperk je de schade en vind je de oorzaak (ANWB).",
  lead: "Wordt je motor te heet, rijd dan niet door: dat kan grote schade aan de motor veroorzaken. Open nooit de dop van een hete radiateur of expansietank.",
  safety: "Draai nooit de dop van een hete radiateur of expansietank open: gloeiend hete koelvloeistof kan er met hoge druk uitspuiten.",
  secs: [
    ["Wat je direct doet", "<ol><li>Zet de kachel op warm, de airco uit, de ventilator hoog en doe eventueel een raam open. Zo voer je extra warmte af.</li><li>Helpt dat niet: stop op een veilige plek en zet de motor uit.</li><li>Laat de motor minstens een kwartier afkoelen met de motorkap open voordat je iets controleert. Laat het bij voorkeur door de Wegenwacht doen, want het risico op brandwonden is groot.</li><li>Controleer daarna pas het koelvloeistofpeil. Draai de dop in stappen los en houd een doek over je hand.</li></ol>"],
    ["Oorzaak 1: lekkage of een defect koelsysteem", "<p>Koelvloeistof voert de warmte af. Bij een lek verlies je koelvloeistof en koelt de motor minder. Is het peil te laag, vul dan koelvloeistof bij. In noodgevallen kan leidingwater, maar dat bevriest sneller. Laat het koelsysteem daarna nakijken en de vloeistof verversen.</p>"],
    ["Oorzaak 2: zware belasting", "<p>Bergop rijden, te snel opschakelen of lang met cruise control rijden kan de motor te warm maken. Schakel terug naar een lagere versnelling; een hoger toerental is dan niet erg zolang de temperatuur minder snel stijgt. Bergaf helpt een lage versnelling, zodat de motor meeremt.</p>"],
    ["Oorzaak 3: koelventilator werkt niet", "<p>Laat de warme motor stilstaand draaien. Werkt de koelventilator, dan hoor je hem na ongeveer tien minuten aanslaan. Hoor je niets, dan is hij waarschijnlijk kapot.</p>"],
    ["En daarna?", "<p>Laat het koelsysteem zo snel mogelijk door een garage controleren en vullen met koelvloeistof met antivries. Bekende oorzaken per automodel vind je bij <a href=\"auto.html\">auto-storingen</a>, bijvoorbeeld een thermostaat die niet meer opent.</p>"]
  ],
  faq: [
    ["Mag ik doorrijden als mijn motor te heet wordt?", "Nee. Doorrijden kan grote schade aan de motor veroorzaken. Stop op een veilige plek."],
    ["Mag ik de dop van het expansievat openen als de motor heet is?", "Nee. Hete koelvloeistof kan er met hoge druk uitspuiten. Laat de motor minstens een kwartier afkoelen en draai de dop in stappen los met een doek over je hand."],
    ["Mag ik water bijvullen in plaats van koelvloeistof?", "In noodgevallen kan leidingwater, maar dat heeft een hoger vriespunt. Laat daarna de koelvloeistof verversen."]
  ],
  src: [["ANWB – Oververhitte motor", "https://www.anwb.nl/auto/onderhoud-en-reparatie/autopech/oververhitte-motor"]],
  rel: [["storing-auto-waarschuwingslampjes-rood-koelvloeistoflampje.html", "Rood koelvloeistoflampje"], ["auto-waarschuwingslampjes.html", "Alle waarschuwingslampjes in de auto"], ["auto.html", "Auto-storingen per merk en model"]]
},
{
  id: "autopech-voorkomen",
  cat: "auto",
  q: "Wat zijn de meest voorkomende oorzaken van autopech en hoe voorkom je ze?",
  title: "Autopech voorkomen: accu, lampen, banden, verkeerd tanken en waarschuwingslampjes",
  desc: "De meest voorkomende autopech volgens een ANWB-expert: lege accu, kapotte lampen, lekke banden, verkeerd tanken en waarschuwingslampjes. Met tips om het te voorkomen.",
  lead: "De Wegenwacht helpt elke dag gemiddeld zo'n 3500 mensen met autopech. Een lege of kapotte accu is een van de meest voorkomende oorzaken.",
  secs: [
    ["Lege of kapotte accu", "<p>Een accu gaat ongeveer vier jaar mee en kan plotseling uitvallen, bijvoorbeeld bij vorst.</p><ul><li>Start een auto die weinig wordt gebruikt om de paar dagen even.</li><li>Maak niet alleen korte ritjes: dan laadt de accu te weinig op. Rijd af en toe een langere afstand.</li><li>Tijdens een lange vakantie loopt de accu sneller leeg; na drie weken kan hij al te leeg zijn om te starten.</li></ul><p>Meer weten? Lees <a href=\"auto-12v-accu.html\">12V-accu leeg</a>.</p>"],
    ["Kapotte lampen", "<ul><li>Controleer je lampen voor elke rit.</li><li>Een standaard lampenset past niet altijd, bijvoorbeeld halogeenlampen in een auto met ledverlichting. Vraag bij een garage, onderdelenwinkel of dealer op kenteken welke lampen je nodig hebt.</li></ul>"],
    ["Lekke of leeggelopen band", "<ul><li>Zet de auto eerst op een veilige plek.</li><li>Verwissel de band alleen zelf als je weet hoe het moet, en draai de wielmoeren goed vast. Fouten kunnen grote problemen geven.</li></ul>"],
    ["Verkeerde brandstof getankt", "<ul><li>Kijk binnenin het tankklepje welke brandstof nodig is, vooral in een huur- of leenauto.</li><li>Verkeerd getankt? Start de motor niet en bel direct de pechhulp: de tank kan worden leeggezogen.</li></ul>"],
    ["Negen tips van de ANWB", "<ol><li>Rijd minstens één keer per week 10 tot 20 km, zodat accu, motor en banden in conditie blijven.</li><li>Controleer de bandenspanning; ventieldopjes helpen tegen lekken.</li><li>Laat de koppeling niet slippen.</li><li>Houd het onderhoudsschema aan.</li><li>Controleer olie, ruitensproeiervloeistof, koelvloeistof en remvloeistof.</li><li>Let op de waarschuwingslampjes: oranje = garage bellen, rood = direct veilig stoppen.</li><li>Tank de juiste brandstof.</li><li>Houd minstens een kwart tank over: bezinksel kan anders het filter verstoppen.</li><li>Let op ongewone geluiden.</li></ol>"],
    ["Pech in het buitenland: de top 5", "<p>Volgens de ANWB zijn dit de meest voorkomende pechgevallen in het buitenland:</p><ol><li>Controlelampjes (11%)</li><li>Stotteren of vermogensverlies (11%), vaak door lange ritten, hitte of bergen: pas je snelheid aan en laat het controleren.</li><li>Auto start niet (10%), vaak na stilstand, zoals een lege accu op de camping.</li><li>Lekke band zonder reserveband (7%)</li><li>Lekke band met reserveband (6%)</li></ol>"],
    ["Waarschuwingslampjes en vreemde geluiden", "<ul><li><b>Rood lampje</b>: stop zo snel mogelijk op een veilige plek en zet de motor af. Zoek de betekenis op in het instructieboekje.</li><li><b>Oranje lampje</b>: laat de auto zo snel mogelijk nakijken; direct stoppen is meestal niet nodig.</li><li>Moet je vaak koelvloeistof bijvullen, of hoor of voel je iets afwijkends? Ga snel naar de garage, want schade wordt anders duurder.</li></ul><p>Zie ook <a href=\"auto-waarschuwingslampjes.html\">alle waarschuwingslampjes</a>.</p>"]
  ],
  faq: [
    ["Wat is de meest voorkomende oorzaak van autopech?", "Een lege of kapotte accu is een van de meest voorkomende oorzaken, naast kapotte lampen, lekke banden en verkeerd tanken."],
    ["Hoe lang gaat een auto-accu mee?", "Ongeveer vier jaar. Hij kan plotseling uitvallen, bijvoorbeeld bij vorst."],
    ["Wat moet ik doen als ik verkeerde brandstof heb getankt?", "Start de motor niet en bel direct de pechhulp. De tank kan dan worden leeggezogen."]
  ],
  src: [["Kassa (BNNVARA) – Meest voorkomende gevallen van autopech, met ANWB-expert", "https://www.bnnvara.nl/kassa/artikelen/dit-zijn-de-meest-voorkomende-gevallen-van-autopech-en-zo-voorkom-je-ze"], ["ANWB – Top 5 autopech in het buitenland", "https://www.anwb.nl/wegenwacht/informatie/top-5-autopech-buitenland"], ["ANWB – Tips om autopech te voorkomen", "https://www.anwb.nl/wegenwacht/informatie/tips/tips-om-autopech-te-voorkomen"]],
  rel: [["kennisbank-motor-oververhit-wat-doen.html", "Motor oververhit: wat doen?"], ["auto-start-niet.html", "Auto start niet"], ["auto.html", "Auto-storingen per merk en model"]]
},
{
  id: "bandenspanning-controleren",
  cat: "auto",
  q: "Hoe vaak moet ik de bandenspanning van mijn auto controleren?",
  title: "Bandenspanning controleren: elke maand, met koude banden en de juiste waarde",
  desc: "Controleer je bandenspanning elke maand en voor een lange rit, met koude banden. Waar je de juiste spanning vindt en wat het bandenspanningslampje betekent (ANWB).",
  lead: "Controleer de bandenspanning elke maand en altijd voor een lange rit, het liefst met koude banden. Het bandenspanningslampje vervangt die controle niet.",
  secs: [
    ["Hoe en wanneer", "<ul><li>Elke maand en voor een lange rit.</li><li>Met koude banden: op een dag dat je nog niet hebt gereden, of na hooguit 5 km.</li><li>Vergeet het reservewiel niet; een thuiskomer heeft een veel hogere spanning.</li><li>Een eigen bandenspanningsmeter is nauwkeuriger dan de meter bij het tankstation, die vaak te hoog aangeeft.</li></ul>"],
    ["Waar vind je de juiste spanning?", "<p>In het instructieboekje, op een sticker in de portierstijl, achter het tankklepje of op de bandenpomp. Met volle bepakking schrijft de fabrikant soms een hogere spanning voor.</p>"],
    ["Waarom het belangrijk is", "<ul><li>Te lage spanning: slechter sturen, scheef remmen, langere remweg en meer kans op een klapband.</li><li>De band slijt sneller en ongelijk.</li><li>Meer brandstofverbruik, tot ongeveer 100 euro per jaar.</li></ul><p>Moet je meer dan 1 bar bijvullen, dan is de band of het ventiel waarschijnlijk lek: laat hem repareren.</p>"],
    ["Bandenspanningslampje (TPMS)", "<p>Auto's van na 2014 hebben een bandenspanningscontrole. Het lampje gaat branden als een band meer dan 20% onder de voorgeschreven spanning zit. Het blijft een hulpmiddel: controleer ook zelf elke maand. Meer over dit lampje: <a href=\"storing-auto-waarschuwingslampjes-bandenspanningslampje.html\">bandenspanningslampje</a>.</p>"]
  ],
  faq: [
    ["Hoe vaak moet ik mijn bandenspanning controleren?", "Elke maand en altijd voor een lange rit."],
    ["Moet ik de bandenspanning meten met koude of warme banden?", "Met koude banden: voordat je hebt gereden, of na hooguit 5 km."],
    ["Wanneer gaat het bandenspanningslampje branden?", "Als een of meer banden meer dan 20% onder de voorgeschreven spanning zitten."]
  ],
  src: [["ANWB – Bandenspanning controleren", "https://www.anwb.nl/auto/banden/bandenspanning-controleren"]],
  rel: [["kennisbank-autopech-voorkomen.html", "Autopech voorkomen"], ["auto-waarschuwingslampjes.html", "Alle waarschuwingslampjes in de auto"], ["auto.html", "Auto-storingen per merk en model"]]
},
{
  id: "auto-winterklaar-maken",
  cat: "auto",
  q: "Hoe maak ik mijn auto winterklaar en voorkom ik winterpech?",
  title: "Auto winterklaar maken: accu, ruitensproeier, sloten, handrem en banden",
  desc: "Voorkom winterpech: laat de accu testen, gebruik blauwe antivries-ruitensproeiervloeistof, laat de handrem bij vorst los en smeer deurrubbers in. Checklist van de ANWB.",
  lead: "Kou maakt de accu sneller leeg en laat sloten, rubbers en ruitensproeiers bevriezen. Met deze checklist van de ANWB voorkom je de meeste winterpech.",
  secs: [
    ["Checklist", "<ol><li><b>Accu</b>: laat de conditie controleren en maak niet alleen korte ritjes, anders laadt de dynamo de accu te weinig bij.</li><li><b>Ruitensproeiervloeistof</b>: gebruik de blauwe antivriesvariant; de roze of gele zomervloeistof bevriest.</li><li><b>Handrem</b>: niet gebruiken bij vorst, want hij kan vastvriezen. Zet de auto in P of in de eerste versnelling. Een elektronische handrem mag wel.</li><li><b>Deurrubbers</b>: schoonmaken en insmeren met een rubberstick of talkpoeder.</li><li><b>Sloten</b>: behandelen met een vochtafdrijvend middel, ook de slotvanger. Vriest het slot toch dicht, gebruik dan slotontdooier.</li><li><b>Motorolie</b>: controleer of de voorgeschreven olie erin zit; dat kan bepalen of de motor bij vrieskou start.</li><li><b>Ruitenwissers</b>: zet ze uit bij het parkeren, anders kunnen bevroren bladen of de wissermotor beschadigen.</li><li><b>Banden</b>: winterbanden blijven soepeler en geven meer grip. Plan het wisselen op tijd.</li></ol>"],
    ["Ruiten ontdooien", "<p>Gebruik een plastic ijskrabber of ruitontdooier. Gebruik geen warm water (de ruit kan barsten) en geen kranten (die vriezen vast). Een beschermdeken op de voorruit scheelt krabben.</p>"],
    ["Neem mee in de winter", "<p>IJskrabber, ruitontdooier, slotontdooier, een deken, warme kleding en eventueel een wegrijhulp. Bij pech werkt zonder motor ook de verwarming niet.</p>"],
    ["Geen dikke jas onder de gordel", "<p>Een dikke winterjas kan de werking van de gordel bij een ongeluk verminderen. Doe de jas uit of leg hem over de gordel; dat geldt ook voor passagiers en kinderen.</p>"]
  ],
  faq: [
    ["Mag ik de handrem gebruiken als het vriest?", "Liever niet: hij kan vastvriezen. Zet de auto in P of in de eerste versnelling. Een elektronische handrem mag je wel gebruiken."],
    ["Welke ruitensproeiervloeistof gebruik ik in de winter?", "De blauwe antivriesvariant. De roze of gele zomervloeistof bevriest."],
    ["Mag ik warm water over een bevroren ruit gieten?", "Nee, de ruit kan barsten. Gebruik een plastic ijskrabber of ruitontdooier."]
  ],
  src: [["ANWB – Je auto winterklaar maken", "https://www.anwb.nl/auto/onderhoud-en-reparatie/winter/winterklaar-maken"], ["ANWB – Winterproblemen met de auto", "https://www.anwb.nl/auto/onderhoud-en-reparatie/pech-voorkomen/winterproblemen"]],
  rel: [["auto-12v-accu.html", "12V-accu leeg"], ["kennisbank-autopech-voorkomen.html", "Autopech voorkomen"], ["kennisbank-bandenspanning-controleren.html", "Bandenspanning controleren"]]
},
{
  id: "beslagen-ramen-auto",
  cat: "auto",
  q: "Hoe krijg ik beslagen autoruiten snel vrij en hoe voorkom ik het?",
  title: "Beslagen ramen in de auto: airco op recirculatie en zo voorkom je condens",
  desc: "Beslagen autoruiten? Zet de airco even op recirculatie, maak de ruiten binnen schoon en houd natte spullen buiten de auto. Oorzaken en tips van de ANWB.",
  lead: "Zet de airco aan op recirculatie: dan zijn de ruiten binnen enkele momenten vrij. Schakel daarna terug naar gewone ontwaseming.",
  secs: [
    ["Snel ontwasemen", "<ul><li>Airco aan op recirculatie, daarna terug naar gewone ontwaseming. Heeft je auto een automatische ontwasemstand, gebruik die dan.</li><li>Geen airco: kachel op de hoogste stand en de blazers op de voorruit.</li><li>Maak de binnenkant van de ruiten schoon met een doek of zeem.</li></ul>"],
    ["Waar komt het vocht vandaan?", "<ul><li>Koud en nat weer.</li><li>Natte kleding, schoenen en haren.</li><li>Bladeren bij de ventilatieroosters die de luchttoevoer belemmeren.</li><li>Een lekkende kachelradiateur.</li><li>Vuile ruiten houden meer vocht vast.</li></ul>"],
    ["Voorkomen", "<ul><li>Houd de ruiten binnen schoon.</li><li>Laat natte spullen zoveel mogelijk buiten de auto.</li><li>Haal bladeren weg bij de luchtinlaat onder de motorkap.</li><li>Een herbruikbare auto-ontvochtiger kan vocht opnemen.</li><li>Blijven de ruiten steeds beslaan, laat dan de kachelradiateur op lekkage controleren.</li></ul>"]
  ],
  faq: [
    ["Hoe krijg ik beslagen ruiten het snelst vrij?", "Zet de airco aan op recirculatie; daarna terug naar gewone ontwaseming."],
    ["Waarom beslaan mijn autoruiten steeds?", "Door vocht in de auto (natte kleding, schoenen), bladeren bij de luchtinlaat, vuile ruiten of een lekkende kachelradiateur."]
  ],
  src: [["ANWB – Beslagen ramen in de auto", "https://www.anwb.nl/auto/onderhoud-en-reparatie/ruiten-en-ruitenwissers/beslagen-ramen-auto"]],
  rel: [["kennisbank-auto-winterklaar-maken.html", "Auto winterklaar maken"], ["kennisbank-autopech-voorkomen.html", "Autopech voorkomen"], ["auto.html", "Auto-storingen per merk en model"]]
},
{
  id: "elektrische-auto-winter",
  cat: "laadpalen",
  q: "Hoeveel actieradius verliest een elektrische auto in de winter en wat kan ik doen?",
  title: "Elektrische auto in de winter: tot 30% minder bereik, voorverwarmen aan de lader",
  desc: "Bij vorst kan een elektrische auto tot 30% actieradius verliezen. Verwarm voor aan de laadpaal, gebruik stoelverwarming en voorkom een vastgevroren laadkabel (ANWB).",
  lead: "Een accu werkt het best rond 21 °C. Bij vrieskou kan de actieradius tot wel 30 procent afnemen, afhankelijk van merk en model.",
  secs: [
    ["Bereik sparen", "<ul><li><b>Voorverwarmen aan de lader</b>: stel via de app of een vertrektijd in dat de auto opwarmt terwijl hij nog aan de laadpaal hangt. De energie komt dan niet uit de accu en de ruiten zijn ontdooid.</li><li><b>Stoel- en stuurverwarming</b>: zuiniger dan het hele interieur verwarmen.</li></ul>"],
    ["Vergeet de 12V-accu niet", "<p>Ook een elektrische auto heeft een kleine 12V-accu, en die is gevoelig voor kou. Is hij zwak, dan start de auto niet. Laat hem voor de winter controleren.</p>"],
    ["Laadkabel of laadklep vastgevroren", "<ul><li>Droog kabel en laadaansluiting goed af en hang de kabel met een lus naar beneden, zodat water niet naar de stekker loopt.</li><li>Vastgevroren? Ontdooi voorzichtig met een föhn op lage stand of een warme kruik. Trek of duw niet met kracht.</li><li>Veel auto's hebben een mechanische noodontgrendeling voor kabel of klep; kijk in de handleiding.</li></ul><p>Zie ook <a href=\"laadkabel-zit-vast.html\">laadkabel zit vast</a>.</p>"]
  ],
  faq: [
    ["Hoeveel bereik verliest een elektrische auto in de winter?", "Bij vrieskou tot wel 30 procent, afhankelijk van merk en model."],
    ["Hoe spaar ik bereik in de winter?", "Verwarm de auto voor terwijl hij nog aan de laadpaal hangt en gebruik stoel- en stuurverwarming in plaats van het hele interieur te verwarmen."],
    ["Wat doe ik als de laadkabel is vastgevroren?", "Ontdooi voorzichtig met een föhn op lage stand of een warme kruik en trek niet met kracht. Kijk in de handleiding naar de noodontgrendeling."]
  ],
  src: [["ANWB – Elektrische auto in de winter", "https://www.anwb.nl/auto/elektrisch-rijden/techniek-en-onderhoud/elektrische-auto-winter"]],
  rel: [["kennisbank-elektrische-auto-laadt-niet.html", "Elektrische auto laadt niet"], ["kennisbank-auto-winterklaar-maken.html", "Auto winterklaar maken"], ["laadpalen.html", "Alle laadpalen en foutcodes"]]
},
{
  id: "autoruit-ontdooien",
  cat: "auto",
  q: "Hoe ontdooi ik mijn autoruit snel zonder schade?",
  title: "Autoruit ontdooien: ruitontdooier, schuin krabben en nooit warm water",
  desc: "Bevroren autoruit? Gebruik ruitontdooier of krab schuin, zet de blazers op de voorruit en start pas als alles ijsvrij is. Geen warm water en geen kijkgaatje (ANWB).",
  lead: "Spuit ruitontdooier op de ruiten of krab schuin met een ijskrabber. Gooi nooit warm water over de ruit: die kan barsten.",
  secs: [
    ["Zo gaat het snel", "<ol><li>Spuit ruiten en verlichting in met ruitontdooier en laat het even inwerken.</li><li>Geen ontdooier? Krab met een ijskrabber schuin tegen de ruit. Krab de achterruit niet terwijl de achterruitverwarming aan staat.</li><li>Kijk of de ruitenwissers vastzitten en maak ze voorzichtig los.</li><li>Zet na het instappen de blazers op de voorruit, de verwarming op heet en even de recirculatie aan; daarna recirculatie weer uit.</li><li>Rijd pas weg als alle ruiten en spiegels ijsvrij zijn. Stationair laten draaien warmt de motor nauwelijks op.</li></ol>"],
    ["Niet doen", "<ul><li><b>Geen warm water</b>: door het temperatuurverschil kan de ruit barsten, zeker als er al een sterretje in zit.</li><li><b>Geen kijkgaatje</b>: rijden met maar een stukje vrije ruit kan een boete opleveren.</li></ul>"],
    ["Voorkomen", "<ul><li>Leg 's avonds een anti-ijsdeken op de voorruit.</li><li>Houd de ruiten schoon; vuil laat vocht sneller bevriezen.</li><li>Zet de ruitenwissers uit voordat je parkeert, zodat ze niet vastvriezen.</li><li>Tegen bevroren sloten helpt slotontdooier; tegen vastvriezende portieren talkpoeder of een rubberstick op de rubbers.</li></ul>"]
  ],
  faq: [
    ["Mag ik warm water op een bevroren autoruit gieten?", "Nee. Door het temperatuurverschil kan de ruit barsten."],
    ["Mag ik met een kijkgaatje wegrijden?", "Nee, dat is gevaarlijk en kan een boete opleveren. Maak alle ruiten en spiegels ijsvrij."],
    ["Hoe voorkom ik een bevroren voorruit?", "Leg 's avonds een anti-ijsdeken op de voorruit en houd de ruiten schoon."]
  ],
  src: [["ANWB – Snel je autoruit ontdooien: 6 tips", "https://www.anwb.nl/auto/onderhoud-en-reparatie/ruiten-en-ruitenwissers/autoruit-ontdooien"], ["ANWB – Koud? Zo rijd je 's ochtends snel weg", "https://www.anwb.nl/wegenwacht/informatie/zo-rijd-je-snel-weg"]],
  rel: [["kennisbank-auto-winterklaar-maken.html", "Auto winterklaar maken"], ["kennisbank-beslagen-ramen-auto.html", "Beslagen ramen in de auto"], ["auto.html", "Auto-storingen per merk en model"]]
},
{
  id: "slimme-meter-aflezen",
  cat: "meterkast",
  q: "Hoe lees ik mijn slimme meter af en wat betekenen 1.8.1, 1.8.2, 2.8.1 en 2.8.2?",
  title: "Slimme meter aflezen: wat betekenen 1.8.1, 1.8.2, 2.8.1, 2.8.2 en 16.7?",
  desc: "Op je slimme meter staan codes als 1.8.1 en 2.8.2. Dit zijn de meterstanden voor verbruik en teruglevering per tarief. Zo lees je ze af, volgens Liander en Stedin.",
  lead: "Een slimme meter toont om de beurt vier meterstanden: twee voor stroom die je hebt verbruikt en twee voor stroom die je hebt teruggeleverd, elk voor tarief 1 en tarief 2.",
  secs: [
    ["Wat betekenen de codes?", "<p>Bij veel meters (zoals de Landis+Gyr ZCF110 en ZMF110) wisselt het display elke 5 seconden:</p><ul><li><b>1.8.1</b>: geleverd aan jou in tarief 1 (kWh).</li><li><b>1.8.2</b>: geleverd aan jou in tarief 2 (kWh).</li><li><b>2.8.1</b>: door jou teruggeleverd in tarief 1 (kWh).</li><li><b>2.8.2</b>: door jou teruggeleverd in tarief 2 (kWh).</li><li><b>16.7</b>: het vermogen dat je nu gebruikt (kW).</li></ul><p>Teruggeleverd is <b>netto</b>: wat je zonnepanelen opwekken min wat je direct zelf verbruikt.</p>"],
    ["Symbolen en het knipperende lampje", "<ul><li><b>T2</b> in beeld: de meter telt nu in tarief 2.</li><li><b>+P</b>: je verbruikt nu stroom.</li><li>Het <b>lampje knippert</b> sneller naarmate je meer stroom verbruikt of teruglevert. Dat is normaal.</li></ul>"],
    ["Meters met tekst op het display", "<p>Nieuwere meters, zoals de Landis+Gyr E360, tonen tekst in plaats van codes: <i>Geleverd laag</i>, <i>Geleverd hoog</i>, <i>Teruggelev. laag</i>, <i>Teruggelev. hoog</i> en <i>Actueel vermogen</i>. Met de groene knop zet je de verlichting aan en blader je door de gegevens. Is er een slimme gasmeter aangesloten, dan zie je die stand ook op dit display.</p><p>Net na plaatsing kan het een paar dagen duren voordat hoog- en laagtarief goed werken; tot die tijd telt de meter alles als laag tarief.</p>"],
    ["Storing of vragen?", "<ul><li>Verbreek nooit de zegels van de meter.</li><li>Stroomstoring of storing aan de meter: bel het landelijke storingsnummer <b>0800-9009</b>.</li><li>Weet je niet wie je netbeheerder is? Zoek het op via eancodeboek.nl.</li></ul>"]
  ],
  faq: [
    ["Wat is het verschil tussen 1.8.1 en 1.8.2?", "Beide zijn stroom die aan jou is geleverd: 1.8.1 in tarief 1 en 1.8.2 in tarief 2."],
    ["Wat betekent 2.8.1 op de slimme meter?", "Dat is de stroom die je in tarief 1 hebt teruggeleverd, netto: opwek min wat je direct zelf gebruikte."],
    ["Waarom knippert het lampje op mijn slimme meter?", "Dat is normaal. Het lampje knippert sneller naarmate je meer stroom verbruikt of teruglevert."],
    ["Wie bel ik bij een storing aan de slimme meter?", "Het landelijke storingsnummer 0800-9009."]
  ],
  src: [["Liander – Handleiding Landis+Gyr ZCF110 / ZMF110 (PDF)", "https://www.liander.nl/-/media/alliander/liander/meter-manuals/handleidingen/landis-gyr/handleiding-landis-gyr-zcf110--zmf110.pdf"], ["Stedin – Handleiding slimme meter Landis+Gyr E360 (PDF)", "https://www.stedin.net/-/media/feature/handleidingzoeken/handleidingen/handleiding-slimme-meter-e-landis-gyr-e360cd2d.pdf"]],
  rel: [["homewizard-p1-meter.html", "HomeWizard P1-meter"], ["aardlekschakelaar-groepenkast.html", "Aardlekschakelaar slaat af"], ["meterkast.html", "Meterkast en stroomstoringen"]]
}
];
module.exports = { KB: A };
