// Banka otázek. Každý ze 30 testů se z ní skládá deterministicky (viz buildTest).
// Druhá hodnota u každé položky = správné řešení, podle kterého Claude kontroluje.

// [dílo, forma, druh, žánr, autor, století, směr, téma, další dílo]
const WORKS = [
  ["Romeo a Julie","poezie (veršované drama)","drama","tragédie","William Shakespeare","16.","renesance","láska dvou mladých z nepřátelských rodů (Monteků a Kapuletů)","Hamlet"],
  ["Lakomec","próza","drama","komedie","Molière","17.","klasicismus","lakota a moc peněz (Harpagon)","Tartuffe"],
  ["Máj","poezie","lyricko-epický","lyricko-epická báseň (skladba)","Karel Hynek Mácha","19.","romantismus","láska, vina, trest, smrt, příroda (Vilém, Jarmila)","Cikáni"],
  ["Kytice","poezie","lyricko-epický","sbírka balad","Karel Jaromír Erben","19.","romantismus","vina a trest, vztah matky a dítěte","Prostonárodní české písně a říkadla"],
  ["Babička","próza","epika","povídka (obraz venkovského života)","Božena Němcová","19.","romantismus / realismus","život na venkově, moudrá a laskavá babička","Divá Bára"],
  ["Povídky malostranské","próza","epika","soubor povídek","Jan Neruda","19.","realismus","život obyčejných lidí na Malé Straně","Písně kosmické"],
  ["Hamlet","poezie (veršované drama)","drama","tragédie","William Shakespeare","16./17.","renesance","pomsta za vraždu otce, zrada, váhání","Macbeth"],
  ["Osudy dobrého vojáka Švejka za světové války","próza","epika","humoristický román","Jaroslav Hašek","20.","meziválečná literatura","absurdita války a rakouské byrokracie","Dobrý voják Švejk a jiné podivné historky"],
  ["R.U.R.","próza","drama","vědeckofantastické drama (utopie)","Karel Čapek","20.","meziválečná literatura","zneužití techniky, vzpoura robotů proti lidem","Bílá nemoc"],
  ["Bílá nemoc","próza","drama","protiválečné drama","Karel Čapek","20.","meziválečná literatura","hrozba fašismu a války, odpovědnost jedince","Matka"],
  ["Proměna","próza","epika","novela","Franz Kafka","20.","pražská německá literatura (existencialismus)","odcizení člověka, osamělost, absurdita","Proces"],
  ["Malý princ","próza","epika","filozofická pohádka","Antoine de Saint-Exupéry","20.","literatura 20. století","přátelství, láska, odpovědnost, pohled dětí vs. dospělých","Země lidí"],
  ["Na západní frontě klid","próza","epika","válečný román","Erich Maria Remarque","20.","meziválečná literatura (ztracená generace)","hrůzy 1. světové války očima mladého vojáka","Tři kamarádi"],
  ["Bídníci","próza","epika","román","Victor Hugo","19.","romantismus","sociální nespravedlnost, příběh Jeana Valjeana","Chrám Matky Boží v Paříži"],
  ["Evžen Oněgin","poezie","epika","román ve verších","Alexandr Sergejevič Puškin","19.","romantismus","zbytečný člověk, nenaplněná láska (Taťána)","Piková dáma"],
  ["Revizor","próza","drama","satirická komedie","Nikolaj Vasiljevič Gogol","19.","realismus","korupce a úplatkářství úředníků","Mrtvé duše"],
  ["Maryša","próza","drama","realistické drama","Alois a Vilém Mrštíkové","19.","realismus","vynucený sňatek kvůli penězům, tragický konec","Rok na vsi"],
  ["Krysař","próza","epika","novela","Viktor Dyk","20.","neoromantismus / Česká moderna","láska, pomsta, svoboda (Agnes, Hameln)","Zmoudření Dona Quijota"],
  ["Slezské písně","poezie","lyrika","sbírka básní","Petr Bezruč","19./20.","Česká moderna (sociální poezie)","sociální a národnostní útlak lidí ve Slezsku","Maryčka Magdónova (báseň ze sbírky)"],
  ["Romeo, Julie a tma","próza","epika","novela","Jan Otčenášek","20.","literatura o 2. světové válce","láska studenta a židovské dívky za heydrichiády","Občan Brych"],
  ["Modlitba pro Kateřinu Horovitzovou","próza","epika","novela","Arnošt Lustig","20.","literatura o 2. světové válce","holocaust, oklamání Židů nacisty","Dita Saxová"],
  ["Obsluhoval jsem anglického krále","próza","epika","román","Bohumil Hrabal","20.","česká literatura 2. pol. 20. století","životní cesta malého číšníka Jana Dítěte","Ostře sledované vlaky"],
  ["Král Oidipus","poezie (veršované drama)","drama","tragédie","Sofoklés","5. st. př. n. l.","antika","nemožnost uniknout osudu","Antigona"],
  ["Farma zvířat","próza","epika","alegorická novela (bajka)","George Orwell","20.","antiutopie","kritika totalitní moci","1984"],
  ["Stařec a moře","próza","epika","novela","Ernest Hemingway","20.","americká literatura (ztracená generace)","zápas člověka s přírodou, vytrvalost","Komu zvoní hrana"],
  ["Kdo chytá v žitě","próza","epika","román","J. D. Salinger","20.","americká literatura po 2. světové válce","dospívání, odcizení, vzpoura proti pokrytectví","Devět povídek"],
  ["Saturnin","próza","epika","humoristický román","Zdeněk Jirotka","20.","česká literatura 1. pol. 20. století","humor, gentlemanský sluha, anglický styl","Muž se psem"],
  ["Spalovač mrtvol","próza","epika","psychologická novela","Ladislav Fuks","20.","literatura o 2. světové válce","proměna obyčejného člověka v nacistického vraha","Pan Theodor Mundstock"],
  ["Robinson Crusoe","próza","epika","dobrodružný román","Daniel Defoe","18.","osvícenství","přežití na pustém ostrově, vytrvalost člověka","Moll Flandersová"],
  ["Don Quijote","próza","epika","román (parodie rytířských románů)","Miguel de Cervantes","16./17.","renesance","střet ideálů a skutečnosti","Příkladné novely"]
];

// [citát, správně]
const QUOTES = [
  ["„Být nebo nebýt – to je oč tu běží.“","Hamlet – Hamlet – William Shakespeare – renesance"],
  ["„Byl pozdní večer – první máj – večerní máj – byl lásky čas.“","úvod Máje – Karel Hynek Mácha – romantismus"],
  ["„Tak nám zabili Ferdinanda.“","paní Müllerová – Osudy dobrého vojáka Švejka – Jaroslav Hašek – meziválečná literatura"],
  ["„Správně vidíme jen srdcem. Co je důležité, je očím neviditelné.“","liška – Malý princ – Antoine de Saint-Exupéry – literatura 20. st."],
  ["„Když se Řehoř Samsa jednoho rána probudil z nepokojných snů, shledal, že se v posteli proměnil v nějakou obludnou havěť.“","začátek Proměny – Franz Kafka – pražská německá literatura / existencialismus"],
  ["„Kam s ním?“ (vypravěč neví, co se starým slamníkem)","fejeton Kam s ním? – Jan Neruda – realismus"],
  ["„Odešla matka z světa tohoto, na lože smrti ulehla…“","úvodní báseň Kytice – Karel Jaromír Erben – romantismus"],
  ["„Již jedenáctá odbila, a lampa ještě svítila…“","dívka – Svatební košile (Kytice) – K. J. Erben – romantismus"],
  ["„Ach, peníze, penízky, vy moji zlatí drahouškové! Vzali mi vás!“","Harpagon – Lakomec – Molière – klasicismus"],
  ["„Ó Romeo, Romeo, proč jsi Romeo?“","Julie – Romeo a Julie – William Shakespeare – renesance"],
  ["„Šťastná to žena!“ (poslední věta knihy)","závěr Babičky – Božena Němcová – romantismus/realismus"],
  ["„Je cosi shnilého ve státě dánském.“","Marcellus – Hamlet – William Shakespeare – renesance"],
  ["„Okolo lesa pole lán, hej, jede, jede z lesa pán.“","Zlatý kolovrat (Kytice) – K. J. Erben – romantismus"],
  ["„U lavice dítě stálo, z plna hrdla křičelo.“","Polednice (Kytice) – K. J. Erben – romantismus"],
  ["„Na topole nad jezerem seděl vodník pod večerem.“","Vodník (Kytice) – K. J. Erben – romantismus"],
  ["„Každej nemůže bejt chytrej, pane obrlajtnant…“","Švejk – Osudy dobrého vojáka Švejka – Jaroslav Hašek – meziválečná literatura"],
  ["„Všechna zvířata jsou si rovna, ale některá jsou si rovnější.“","prasata (přikázání) – Farma zvířat – George Orwell – antiutopie"],
  ["„Stáváš se navždy zodpovědným za to, cos k sobě připoutal.“","liška – Malý princ – Antoine de Saint-Exupéry"],
  ["„Člověk může být zničen, ale ne poražen.“","stařec Santiago – Stařec a moře – Ernest Hemingway – ztracená generace"],
  ["„Slova, slova, slova.“","Hamlet – Hamlet – William Shakespeare – renesance"],
  ["„Někdo musel Josefa K. pomluvit, neboť ho jednoho rána zatkli, ačkoli nic zlého neprovedl.“","začátek Procesu – Franz Kafka – pražská německá literatura"]
];

// [pojem, definice]
const TERMS = [
  ["Metafora","přenesení pojmenování na základě vnější podobnosti (zub pily, oko sítě)"],
  ["Metonymie","přenesení pojmenování na základě vnitřní souvislosti (čtu Jiráska = jeho knihu, vypil sklenici)"],
  ["Synekdocha","záměna části a celku nebo čísla (střecha nad hlavou = dům, nepřítel = nepřátelé)"],
  ["Personifikace","zosobnění – věcem, zvířatům, jevům se přisuzují lidské vlastnosti (vítr zpívá)"],
  ["Epiteton","básnický přívlastek (zlaté slunce, smutná noc)"],
  ["Hyperbola","nadsázka, zveličení (moře slz, říkal jsem ti to stokrát)"],
  ["Oxymóron","spojení slov s protikladným významem (živá mrtvola, studený oheň)"],
  ["Apostrofa","oslovení nepřítomné osoby, věci nebo jevu (Měsíčku na nebi hlubokém)"],
  ["Anafora","opakování stejného slova na začátku veršů nebo vět"],
  ["Epifora","opakování stejného slova na konci veršů nebo vět"],
  ["Onomatopoie","zvukomalba – slova napodobující zvuky (bum, šplouch, kukú)"],
  ["Aliterace","opakování stejných hlásek na začátku slov (Vítr vane, vlny vrou)"],
  ["Eufemismus","zjemnění nepříjemné skutečnosti (zesnul místo umřel)"],
  ["Ironie","vyjádření opaku toho, co se myslí (To se ti povedlo! – když se to nepovedlo)"],
  ["Alegorie","jinotaj – příběh s jiným, skrytým významem (bajky, Farma zvířat)"],
  ["Rým","zvuková shoda konců veršů"],
  ["Verš","jeden řádek básně"],
  ["Strofa (sloka)","skupina veršů tvořící celek"],
  ["Balada","epická báseň s ponurým dějem a tragickým koncem (Erben – Kytice)"],
  ["Óda","oslavná lyrická báseň"],
  ["Elegie","žalozpěv – smutná lyrická báseň (o smrti, ztrátě)"],
  ["Epos","rozsáhlá veršovaná epická skladba o hrdinských činech (Ilias, Odysseia)"],
  ["Bajka","krátký příběh, zvířata s lidskými vlastnostmi, ponaučení (Ezop, La Fontaine)"],
  ["Fejeton","krátký vtipný publicistický útvar o aktuální drobnosti (Neruda)"],
  ["Sonet","báseň o 14 verších, 2 čtyřverší + 2 trojverší"],
  ["Kaligram","obrazová báseň – text tvoří obrázek (Apollinaire)"],
  ["Haiku","japonská báseň o třech verších (5–7–5 slabik), často o přírodě"],
  ["Tragédie","drama s vážným dějem, hrdina se dostane do konfliktu a zahyne"],
  ["Komedie","drama s veselým dějem a šťastným koncem, zesměšňuje lidské vady"],
  ["Novela","kratší próza než román, jedna hlavní dějová linie, často s pointou"],
  ["Povídka","kratší prozaický útvar s jednoduchým dějem a málo postavami"],
  ["Román","rozsáhlé prozaické dílo, více dějových linií a postav"],
  ["Homonyma","slova stejně znějící, ale s různým významem (kolej, zámek)"],
  ["Synonyma","slova stejného nebo podobného významu (hezký – pěkný)"],
  ["Antonyma","slova opačného významu (velký – malý)"],
  ["Archaismus","zastaralé slovo pro věc, která stále existuje (lučba = chemie)"],
  ["Historismus","slovo pro věc, která už neexistuje (halapartna, robota)"],
  ["Neologismus","nově vzniklé slovo (lajkovat, dron)"],
  ["Slang","nespisovná slova zájmové či profesní skupiny (studenti, sportovci)"],
  ["Argot","tajná mluva podsvětí (zloději, vězni)"],
  ["Sousloví","víceslovné pojmenování s jedním věcným významem (kyselina sírová)"],
  ["Frazém","ustálené víceslovné spojení s přeneseným významem (mít máslo na hlavě)"],
  ["Katarze","očištění diváka prožitím tragédie (pojem z antiky, Aristotelés)"],
  ["Lyrika","literární druh vyjadřující pocity a nálady, bez děje"],
  ["Epika","literární druh s dějem a vypravěčem"],
  ["Monolog","řeč jedné postavy (samomluva)"],
  ["Prolog / epilog","úvodní / závěrečná část díla"]
];

// [ukázka, prostředek]
const FIGURES = [
  ["„zlaté slunce“","epiteton"],["„čtu Jiráska“","metonymie"],["„vítr zpívá“","personifikace"],
  ["„moře slz“","hyperbola (i metafora)"],["„živá mrtvola“","oxymóron"],["„nemá střechu nad hlavou“","synekdocha"],
  ["„noha stolu“","metafora"],["„Měsíčku na nebi hlubokém“","apostrofa"],["„bum, prásk, šplouch“","onomatopoie"],
  ["„Vítr vane, vlny vrou“","aliterace"],["„usnul navěky“","eufemismus"],["„To se ti teda povedlo!“ (když se to nepovedlo)","ironie"],
  ["„Kde domov můj? Kde domov můj?“","řečnická otázka (opakování – anafora)"],["„zub času“","metafora"],["„studený oheň“","oxymóron"],
  ["„říkal jsem ti to milionkrát“","hyperbola"],["„les se zachvěl strachem“","personifikace"],["„Praha se raduje“ (= Pražané)","metonymie"],
  ["„nebe pláče“","personifikace"],["„světlo tmy“","oxymóron"],["„vypil celou láhev“","metonymie"],
  ["„zemřel“ → „odešel od nás“","eufemismus"],["„modré nebe“","epiteton (stálý)"],["„hlava rodiny“","metafora"],
  ["„Bez vás nemohu žít! Bez vás nejsem nic!“","anafora"],["„nepřítel je za humny“ (= nepřátelé)","synekdocha"],
  ["„Ó noci, ty krásná!“","apostrofa"],["„zlatá ruka“ (šikovný člověk)","metafora"]
];

// [rčení, význam]
const IDIOMS = [
  ["Mít máslo na hlavě","mít něco špatného na svědomí"],["Prokázat medvědí službu","chtít pomoct, ale uškodit"],
  ["Nosit dříví do lesa","dělat něco zbytečného, dávat tam, kde je toho dost"],["Házet perly sviním","dávat cenné věci někomu, kdo to neocení"],
  ["Mít za ušima","být mazaný, chytrý, vychytralý"],["Jepičí život","velmi krátké trvání"],
  ["Chodit kolem horké kaše","vyhýbat se podstatě věci"],["Mít z někoho vítr","bát se někoho"],
  ["Házet flintu do žita","vzdát to"],["Být pod obraz","být hodně opilý"],["Chytat lelky","lenošit, nedávat pozor"],
  ["Achillova pata","slabé, zranitelné místo"],["Dělat z komára velblouda","zveličovat"],["Danajský dar","dar, který přinese neštěstí"],
  ["Sisyfovská práce","marná, nekonečná práce"],["Mít něco v malíčku","dokonale něco umět"],["Gordický uzel","složitý problém (rozetnout = vyřešit rázně)"],
  ["Pustit si něco z hlavy","přestat na něco myslet"],["Být jako ryba ve vodě","cítit se dobře, být ve svém živlu"],
  ["Mít hlavu v oblacích","být zasněný, nevnímat realitu"],["Tahat za kratší konec","být v nevýhodě"],
  ["Vzít nohy na ramena","utéct"],["Mít u někoho vroubek","nebýt u někoho v oblibě kvůli dřívějšímu prohřešku"],
  ["Přilévat olej do ohně","zhoršovat spor"],["Trojský kůň","lest, skrytý nepřítel uvnitř"],
  ["Damoklův meč","neustále hrozící nebezpečí"],["Hrát druhé housle","být až na druhém místě"],
  ["Mluvit do větru","mluvit zbytečně, nikdo neposlouchá"],["Mít knedlík v krku","nemoci promluvit dojetím nebo strachem"],
  ["Být na koni","mít úspěch, být nahoře"],["Spálit za sebou mosty","znemožnit si návrat"],
  ["Lézt někomu do zelí","zasahovat do cizích věcí"],["Kápnout božskou","přiznat se"],
  ["Dát někomu košem","odmítnout někoho (hlavně nápadníka)"],["Pověsit něco na hřebík","přestat se něčemu věnovat"],
  ["Být mimo mísu","nevědět, o co jde"],["Udělat díru do světa","dosáhnout něčeho výjimečného"],
  ["Mít oči na stopkách","dávat pozor, být ostražitý"],["Zametat si před vlastním prahem","řešit nejdřív svoje chyby"],
  ["Řezat si větev pod sebou","škodit sám sobě"],["Ariadnina nit","vodítko, které pomůže z obtížné situace"],
  ["Tantalova muka","utrpení, kdy je cíl na dosah, ale nedosažitelný"],["Pandořina skříňka","zdroj mnoha neštěstí"],
  ["Mít něco na triku","mít něco na svědomí"]
];

// [popis, odpověď]
const DESCRIPTIONS = [
  ["Hrad, kam nesměly ženy – a jedna se tam dostane v převleku za pážete.","Noc na Karlštejně – Jaroslav Vrchlický"],
  ["Ponorka Nautilus a kapitán Nemo.","Dvacet tisíc mil pod mořem – Jules Verne"],
  ["Upír z Transylvánie.","Drákula – Bram Stoker"],
  ["Továrna, kde se vyrábějí umělí lidé, kteří se vzbouří.","R.U.R. – Karel Čapek"],
  ["Sousoší stařenky s dětmi a psy v Ratibořicích.","Babička – Božena Němcová"],
  ["Hrbatý zvoník katedrály v Paříži.","Chrám Matky Boží v Paříži – Victor Hugo"],
  ["Muž s obrovským nosem píše dopisy za jiného, aby získal srdce Roxany.","Cyrano z Bergeracu – Edmond Rostand"],
  ["Kluk pluje na voru po Mississippi s uprchlým otrokem Jimem.","Dobrodružství Huckleberryho Finna – Mark Twain"],
  ["Mloci se naučí mluvit a ovládnou svět.","Válka s mloky – Karel Čapek"],
  ["Rytíř bojuje proti větrným mlýnům, doprovází ho Sancho Panza.","Don Quijote – Miguel de Cervantes"],
  ["Trosečník žije 28 let na ostrově se sluhou Pátkem.","Robinson Crusoe – Daniel Defoe"],
  ["Obraz stárne místo krásného mladíka.","Obraz Doriana Graye – Oscar Wilde"],
  ["Kapitán Achab pronásleduje bílou velrybu.","Bílá velryba (Moby Dick) – Herman Melville"],
  ["Ulice na Malé Straně, dům U Dvou slunců.","Jan Neruda – Povídky malostranské"],
  ["Kazatel Betlémské kaple upálený v Kostnici roku 1415.","Mistr Jan Hus"],
  ["Pištec, který vyvede krysy z Hamelnu a pak i lidi.","Krysař – Viktor Dyk"],
  ["Detektiv z Baker Street 221B s doktorem Watsonem.","Sherlock Holmes – Arthur Conan Doyle"],
  ["Belgický detektiv s „malými šedými buňkami“.","Hercule Poirot – Agatha Christie"],
  ["Cesta kolem světa za 80 dní, Phileas Fogg.","Cesta kolem světa za 80 dní – Jules Verne"],
  ["Trojská válka a hněv Achillův.","Ilias – Homér"],
  ["Desetiletá cesta hrdiny domů na Ithaku.","Odysseia – Homér"],
  ["Zvířata vyženou farmáře a vládu převezmou prasata.","Farma zvířat – George Orwell"],
  ["Velký bratr tě sleduje, Ministerstvo pravdy.","1984 – George Orwell"],
  ["Starý kubánský rybář loví obrovského marlína.","Stařec a moře – Ernest Hemingway"],
  ["Vilém, otcovrah, čeká ve vězení na popravu; Jarmila skočí do jezera.","Máj – Karel Hynek Mácha"],
  ["Sluha jménem Saturnin a teta Kateřina.","Saturnin – Zdeněk Jirotka"],
  ["Koncentrační tábor Osvětim / Terezín, osudy Židů.","např. Arnošt Lustig (Modlitba pro Kateřinu Horovitzovou)"],
  ["Pan Kopfrkingl pracuje v krematoriu a stane se vrahem.","Spalovač mrtvol – Ladislav Fuks"],
  ["Malý číšník Jan Dítě, hotel Paříž.","Obsluhoval jsem anglického krále – Bohumil Hrabal"],
  ["Chlapec z planetky B 612, který má růži.","Malý princ – Antoine de Saint-Exupéry"],
  ["Nemoc, na kterou zná lék jen doktor Galén.","Bílá nemoc – Karel Čapek"],
  ["Hrdina se probudí jako obrovský brouk.","Proměna – Franz Kafka"],
  ["Dívka si vezme bohatého vdovce Vávru kvůli penězům a otráví ho.","Maryša – bratři Mrštíkové"],
  ["Hrdina zabije otce a vezme si vlastní matku, aniž to ví.","Král Oidipus – Sofoklés"],
  ["Oněgin odmítne Taťánu a zabije v souboji Lenského.","Evžen Oněgin – A. S. Puškin"],
  ["Úředníci v městečku si spletou mladíka Chlestakova s revizorem.","Revizor – N. V. Gogol"]
];

// Otevřené otázky z literatury: [otázka, správně]
const OPEN_LIT = [
  ["Kdo je zakladatelem hororu? Vysvětli, co je horor, a uveď 2 díla jeho zakladatele.","Edgar Allan Poe; horor = žánr vyvolávající strach a hrůzu; Havran, Jáma a kyvadlo, Zánik domu Usherů, Černý kocour."],
  ["Kdo je zakladatelem detektivky? Co je detektivka? Uveď dva další autory detektivek i s jejich detektivem.","E. A. Poe (Vraždy v ulici Morgue, detektiv Dupin); příběh o vyšetřování zločinu s napětím a rozuzlením; A. C. Doyle – Sherlock Holmes, Agatha Christie – Hercule Poirot / slečna Marplová."],
  ["Co je sci-fi a kdo je jejím zakladatelem? Uveď dvě jeho díla.","Vědeckofantastická literatura (věda, technika, budoucnost); Jules Verne – Dvacet tisíc mil pod mořem, Cesta kolem světa za 80 dní (také H. G. Wells – Válka světů)."],
  ["Vysvětli pojem slang, uveď, kdo slang používá, a napiš tři díla, kde je slang využit, i s autory.","Nespisovná slova zájmové/profesní skupiny (studenti, sportovci, hráči); Šabach – Hovno hoří, Viewegh – Báječná léta pod psa, Salinger – Kdo chytá v žitě, Burgess – Mechanický pomeranč."],
  ["Kdo jsou prokletí básníci? Uveď tři z nich a ke každému jedno dílo.","Francouzští básníci 2. pol. 19. st., bohémský život, odpor ke společnosti; Baudelaire – Květy zla, Verlaine – Romance beze slov, Rimbaud – Opilý koráb."],
  ["Charakterizuj renesanci (doba, znaky) a uveď tři autory i s díly.","14.–16. st., návrat k antice, člověk ve středu zájmu (humanismus), radost ze života; Shakespeare – Hamlet, Boccaccio – Dekameron, Petrarca – Zpěvník, Cervantes – Don Quijote, Dante – Božská komedie."],
  ["Charakterizuj klasicismus a uveď dva autory s díly.","17.–18. st., rozum, pravidla, řád, tři jednoty v dramatu (místa, času, děje), dělení na vysoké a nízké žánry; Molière – Lakomec, Tartuffe; Corneille – Cid; La Fontaine – Bajky."],
  ["Charakterizuj romantismus a uveď tři autory s díly (aspoň jeden český).","1. pol. 19. st., cit, fantazie, kontrast, vzpoura jedince, romantický hrdina; Mácha – Máj, Erben – Kytice, Byron – Childe Haroldova pouť, Puškin – Evžen Oněgin, Hugo – Chrám Matky Boží."],
  ["Charakterizuj realismus a uveď tři autory s díly.","2. pol. 19. st., věrné zobrazení skutečnosti, typické postavy, kritika společnosti; Balzac – Otec Goriot, Gogol – Revizor, Neruda – Povídky malostranské, Mrštíkové – Maryša, Dickens – Oliver Twist."],
  ["Co je národní obrození? Uveď tři osobnosti a jejich díla.","Snaha o obnovu českého jazyka a kultury (konec 18. – pol. 19. st.); Dobrovský – Zevrubná mluvnice, Jungmann – Slovník česko-německý, Kollár – Slávy dcera, Tyl – Fidlovačka, Čelakovský – Ohlas písní ruských."],
  ["Charakterizuj antickou literaturu a uveď tři autory s díly.","Starověké Řecko a Řím, vznik dramatu (tragédie, komedie), epos; Homér – Ilias, Odysseia; Sofoklés – Král Oidipus, Antigona; Ezop – bajky; Ovidius – Proměny."],
  ["Uveď tři památky středověké literatury (i české) a napiš, o co jde.","Kosmas – Kronika Čechů (latinsky); Dalimilova kronika (1. veršovaná česky); Legenda o sv. Václavovi; Píseň o Rolandovi; Hospodine, pomiluj ny; Tristan a Isolda."],
  ["Co je Bible? Z jakých částí se skládá a uveď dva příběhy z ní.","Soubor posvátných knih židů a křesťanů; Starý a Nový zákon; např. stvoření světa, Adam a Eva, Noemova archa, Mojžíš, Ježíšovo narození, ukřižování."],
  ["Kdo byl Jan Hus? Uveď jeho díla a význam pro češtinu.","Kazatel, reformátor (15. st.), upálen v Kostnici 1415; O církvi, Výklady, Postila; připisuje se mu zavedení diakritiky (spis O pravopisu českém)."],
  ["Kdo byl Jan Amos Komenský? Uveď tři díla a čím je významný.","Učitel národů (17. st.), biskup Jednoty bratrské, pedagog; Labyrint světa a ráj srdce, Orbis pictus, Didaktika velká, Informatorium školy mateřské; zásady názornosti, škola hrou."],
  ["Co je Česká moderna? Uveď tři autory s díly.","Hnutí 90. let 19. st. (manifest 1895), individualita, nové směry; Petr Bezruč – Slezské písně, J. S. Machar – Tristium Vindobona, Otokar Březina – Tajemné dálky, Antonín Sova."],
  ["Charakterizuj literaturu 1. světové války a uveď tři díla s autory.","Zobrazení hrůz války, protiválečnost; Remarque – Na západní frontě klid, Hašek – Švejk, Barbusse – Oheň, Hemingway – Sbohem, armádo!"],
  ["Charakterizuj literaturu o 2. světové válce a holocaustu a uveď tři díla s autory.","Válka, koncentrační tábory, odboj; Lustig – Modlitba pro Kateřinu Horovitzovou, Otčenášek – Romeo, Julie a tma, Fuks – Spalovač mrtvol, Anne Franková – Deník, Drda – Němá barikáda."],
  ["Kdo byl Karel Čapek? Uveď čtyři jeho díla a čím je známý.","Spisovatel, dramatik, novinář meziválečného období (20. st.); R.U.R. (slovo robot vymyslel bratr Josef), Bílá nemoc, Matka, Válka s mloky, Krakatit, Hovory s TGM, Dášeňka."],
  ["Co je poetismus? Uveď dva autory a díla.","Český avantgardní směr 20. let 20. st. (Teige), hravost, radost ze života, obrazová poezie; Vítězslav Nezval – Edison, Abeceda; Jaroslav Seifert – Na vlnách TSF."],
  ["Co je existencialismus? Uveď dva autory a díla.","Filozofický a literární směr 20. st., osamělost, odcizení, absurdita, odpovědnost za vlastní volbu; Franz Kafka – Proměna, Proces; Albert Camus – Cizinec; Jean-Paul Sartre – Zeď."],
  ["Kdo patří ke ztracené generaci? Uveď dva autory s díly.","Američtí autoři poznamenaní 1. sv. válkou; Ernest Hemingway – Stařec a moře, Sbohem, armádo!; F. S. Fitzgerald – Velký Gatsby; (Remarque – Na západní frontě klid)."],
  ["Co je antiutopie? Uveď dvě díla s autory.","Zobrazení budoucí společnosti jako totalitní, nehumánní; George Orwell – 1984, Farma zvířat; Aldous Huxley – Konec civilizace; Ray Bradbury – 451 stupňů Fahrenheita."],
  ["Kdo byl Jan Neruda? Uveď jeho typický žánr, kde jeho texty vycházely a tři díla.","Realista 19. st., fejeton (krátký novinový útvar o aktuální drobnosti), Národní listy; Povídky malostranské, Písně kosmické, Balady a romance, Hřbitovní kvítí."],
  ["Kdo byl Karel Havlíček Borovský? Uveď tři díla a jeho význam.","Novinář, satirik 19. st., považován za zakladatele české žurnalistiky (Pražské noviny, Národní noviny), epigramy; Křest svatého Vladimíra, Tyrolské elegie, Král Lávra; vyhnanství v Brixenu."],
  ["Kdo byl William Shakespeare? Uveď tři tragédie a dvě komedie.","Anglický renesanční dramatik a básník (16./17. st.), divadlo Globe; tragédie: Romeo a Julie, Hamlet, Macbeth, Othello, Král Lear; komedie: Sen noci svatojánské, Zkrocení zlé ženy, Večer tříkrálový."],
  ["Co je literární druh a literární forma? Uveď všechny druhy i formy.","Druhy: lyrika, epika, drama; formy: poezie (vázaná řeč, verše) a próza (nevázaná řeč)."],
  ["Co je osvícenství? Uveď dva autory s díly.","18. st., důraz na rozum, vědu, kritiku církve a absolutismu; Diderot – Encyklopedie, Voltaire – Candide, Defoe – Robinson Crusoe, Swift – Gulliverovy cesty."],
  ["Kdo byla Božena Němcová? Uveď tři díla a čím je významná.","Spisovatelka 19. st. na přechodu romantismu a realismu, sběratelka pohádek; Babička, Divá Bára, V zámku a podzámčí, Národní báchorky a pověsti."],
  ["Co je sonet a kdo ho proslavil? Uveď jeho stavbu.","Báseň o 14 verších: 2 čtyřverší a 2 trojverší; Francesco Petrarca (Zpěvník – Laura), William Shakespeare; v češtině Kollár, Vrchlický."]
];

// Mluvnice a sloh: [otázka, správně]
const OPEN_LANG = [
  ["Vypiš všechny funkční styly a ke každému uveď dva slohové útvary.","Prostěsdělovací (dopis, SMS), odborný (výklad, referát), administrativní (žádost, životopis), publicistický (zpráva, fejeton), umělecký (povídka, báseň), řečnický (projev, přednáška), esejistický (esej)."],
  ["Vypiš všech 10 slovních druhů a u každého uveď příklad.","Podstatná jména, přídavná jména, zájmena, číslovky, slovesa (ohebné); příslovce, předložky, spojky, částice, citoslovce (neohebné)."],
  ["Vypiš aspoň 5 druhů vedlejších vět a ke každé napiš otázku.","Podmětná (kdo, co?), předmětná (koho, co…?), přívlastková (jaký, který?), místní (kde?), časová (kdy?), způsobová (jak?), příčinná (proč?), účelová (za jakým účelem?), přípustková (navzdory čemu?), podmínková (za jaké podmínky?)."],
  ["Vypiš útvary národního jazyka – spisovné i nespisovné.","Spisovné: spisovná a hovorová čeština. Nespisovné: obecná čeština, nářečí (dialekty), interdialekty; dále slang, argot, profesní mluva."],
  ["Vyjmenuj větné členy a ke každému napiš otázku.","Podmět (kdo, co?), přísudek (co dělá?), předmět (pádové otázky kromě 1.), přívlastek (jaký, který, čí?), příslovečné určení (kde, kdy, jak, proč…), doplněk."],
  ["Jaké jsou způsoby tvoření slov? Ke každému uveď příklad.","Odvozování (les → lesník), skládání (vodopád), zkracování (zkratky a zkratková slova: ČR, Čedok); přejímání z cizích jazyků."],
  ["Vysvětli rozdíl mezi souvětím souřadným a podřadným a uveď příklad každého.","Souřadné: věty jsou rovnocenné (Prší a fouká vítr). Podřadné: vedlejší věta závisí na řídící (Vím, že prší)."],
  ["Jaké jsou poměry mezi větami v souvětí souřadném? Uveď spojky.","Slučovací (a, i, ani), stupňovací (ba, ba i, nejen–ale i), odporovací (ale, však, avšak), vylučovací (nebo, buď–anebo), příčinný (neboť, vždyť), důsledkový (proto, a tak)."],
  ["Co je výklad? Uveď jeho znaky a funkční styl.","Odborný styl; vysvětluje příčiny a souvislosti jevu, odborné termíny, logické členění, věcnost, objektivita."],
  ["Co je úvaha? Uveď její znaky a funkční styl.","Publicistický (popř. esejistický) styl; autor vyjadřuje vlastní názor na problém, subjektivní, řečnické otázky, argumenty."],
  ["Co je životopis? Jaké jsou jeho druhy a co obsahuje?","Administrativní styl; strukturovaný (CV) a souvislý (narativní); osobní údaje, vzdělání, praxe, dovednosti, zájmy."],
  ["Co je popis? Jaké druhy popisu znáš?","Statický popis (osoby, věci, místa), popis pracovního postupu, subjektivní (líčení) a objektivní (odborný) popis, charakteristika."],
  ["Co je charakteristika? Jaké jsou její druhy?","Popis vlastností osoby; přímá (vlastnosti jmenujeme) a nepřímá (vyplývají z jednání), vnější a vnitřní."],
  ["Co je vypravování? Jaké má části a jazykové prostředky?","Úvod, zápletka, vyvrcholení, rozuzlení, závěr; přímá řeč, slovesa, dynamičnost, časová posloupnost."],
  ["Jaké jsou mluvnické kategorie podstatných jmen a sloves?","Podstatná jména: rod, číslo, pád, vzor. Slovesa: osoba, číslo, čas, způsob, rod (činný/trpný), vid."],
  ["Co je přímá a nepřímá řeč? Jak se píše přímá řeč?","Přímá = doslovná slova postavy v uvozovkách („Pojď sem,“ řekla.); nepřímá = převyprávěná (Řekla, ať k ní jde)."],
  ["Co je zpráva a čím se liší od reportáže?","Publicistický styl; zpráva – stručná, objektivní informace (kdo, co, kdy, kde, jak, proč); reportáž – autor byl na místě, subjektivní, živá, dojmy."],
  ["Jaké jsou slohové postupy? Ke každému uveď útvar.","Informační (zpráva, oznámení), vyprávěcí (vypravování), popisný (popis, charakteristika), výkladový (výklad), úvahový (úvaha)."],
  ["Co je fejeton? Uveď jeho znaky a autora.","Publicistický útvar, krátký, vtipný, zabývá se aktuální drobností, pointa; Jan Neruda, Karel Čapek, Karel Poláček."],
  ["Z jakých jazyků čeština přejímá slova? Uveď příklady.","Z latiny (škola), řečtiny (gymnázium), němčiny (kšeft), angličtiny (víkend, počítačové výrazy), francouzštiny (parfém); zdomácnělá a cizí slova."],
  ["Co je žádost? Jaké má náležitosti?","Administrativní styl; odesílatel, adresát, místo a datum, věc, oslovení, text s odůvodněním, pozdrav, podpis, přílohy."],
  ["Co je projev a jaké druhy znáš?","Řečnický styl; projevy příležitostné (proslov), agitační, informační (přednáška); oslovení posluchačů, řečnické otázky."]
];

// --- Sestavení 30 testů -------------------------------------------------
function rng(seed){ return () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }; }
function order(len, seed){ const r = rng(seed), a = Array.from({length:len}, (_,i)=>i); for(let i=len-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function take(pool, seed, day, n){ const o = order(pool.length, seed); return Array.from({length:n}, (_,j) => pool[o[(day*n + j) % pool.length]]); }

function buildTest(d){
  const w = take(WORKS, 11, d, 1)[0];
  let f = take(WORKS, 29, d, 1)[0];
  if (f === w) f = WORKS[(WORKS.indexOf(w) + 7) % WORKS.length];
  const ol = take(OPEN_LIT, 7, d, 2);
  const l = take(OPEN_LANG, 23, d, 1)[0];
  return [
    {type:"open", title: ol[0][0], ref: ol[0][1]},
    {type:"fill", title:"Doplň:", parts:[
      `Autorem díla „${f[0]}“ je `, {ref:f[4]}, `, který žil v `, {ref:f[5], short:true}, ` století, tudíž patří do směru `, {ref:f[6]},
      `. Lit. druh díla je `, {ref:f[2]}, ` a žánr `, {ref:f[3]}, `. Dalším jeho dílem je `, {ref:f[8]}, `.`]},
    {type:"list", title: w[0], items:[
      ["Lit. forma", w[1]],["Lit. druh", w[2]],["Lit. žánr", w[3]],["Autor", w[4]],["Doba vzniku (století)", w[5]],["Uměl. směr", w[6]],["Hlavní téma", w[7]]]},
    {type:"open", title: ol[1][0], ref: ol[1][1]},
    {type:"list", title:"Urči, o jaký básnický prostředek jde:", items: take(FIGURES, 3, d, 4)},
    {type:"list", wide:true, title:"Která literární postava to říká (nebo odkud ukázka je)? Z jakého díla, kdo je autor a k jakému směru patří?", items: take(QUOTES, 5, d, 2)},
    {type:"list", title:"Vysvětli následující pojmy:", items: take(TERMS, 13, d, 4)},
    {type:"list", title:"Vysvětli význam následujících rčení (úsloví):", items: take(IDIOMS, 17, d, 5)},
    {type:"list", title:"Poznej podle popisu, o jaké dílo jde, a napiš autora:", items: take(DESCRIPTIONS, 19, d, 4)},
    {type:"open", title: l[0], ref: l[1]}
  ];
}
window.TESTS = Array.from({length:30}, (_, d) => buildTest(d));
