const FAKE_FIRST_NAMES = [
    'Dobromił',
    'Krzyś',
    'Idzi',
    'Bronisława',
    'Ludmita',
    'Makary',
    'Izolda',
    'Tadzio',
    'Feliks',
    'Józef',
    'Sobiesław',
    'Augustyn',
    'Celestyn',
    'Jaropełk',
    'Martyn',
    'Michał',
    'Tytus',
    'Genowefa',
    'Iwan',
    'Zosia',
    'Grzegorz',
    'Berta',
    'Cibor',
    'Arkadiusz',
    'Ziemowit',
    'Klemens',
    'Izabella',
    'Ludwik',
    'Hieronim',
    'Albin',
    'Blanka',
    'Izabella',
    'Narcyz',
    'Sergiusz',
    'Gabrysia',
    'Radomiła',
    'Zuzanna',
    'Czcibor',
    'Wincenty',
    'Albina',
    'Bratumił',
    'Ania',
    'Marek',
    'Honorata',
    'Mścisław',
    'Wisia',
    'Jakub',
    'Natasza',
    'Paweł',
    'Gertruda',
    'Luiza',
    'Przemysł',
    'Sobiesław',
    'Roksana',
    'Jozafat',
    'Stefania',
    'Gabrysia',
    'Radosława',
    'Augustyn',
    'Malwina',
    'Apolonia',
    'Jowita',
    'Apolonia',
    'Włodzisław',
    'Kazimiera',
    'Gabrysia',
    'Przemysł',
    'Edyta',
    'Szymon',
    'Cecylia',
    'Jacenty',
    'Witołd',
    'Agnieszka',
    'Gracja',
    'Marian',
    'Albin',
    'Klementyna',
    'Eustachy',
    'Natasza',
    'Franciszek',
    'Lew',
    'Cyryl',
    'Jarogniew',
    'Iwona',
    'Bogumiła',
    'Martyna',
    'Tadeusz',
    'Przemysław',
    'Bogusław',
    'Oskar',
    'Patrycja',
    'Celestyna',
    'Lesława',
    'Gustaw',
    'Rościsław',
    'Dyta',
    'Sobiesław',
    'Amadei',
    'Zuzanna',
];
const FAKE_LAST_NAMES = [
    'Pawlak',
    'Sobczak',
    'Dudek',
    'Nowak ',
    'Woźniak',
    'Kowalczyk',
    'Walczak',
    'Zając',
    'Adamczyk',
    'Wieczorek',
    'Duda',
    'Dominiak',
];

const FAKE_STREETNAMES = [
    'Abramowskiego',
    'Pabianicka',
    'Generała',
    'Akcent',
    'Chojnicka',
    'Stradomska',
    'Mosiężna',
    'Oddalona',
    'Uranowa',
    'Księdza',
    'Derkaczy',
    'Generała',
    'Zientary',
    'Kolejowa',
    'Korkowa',
    'Mysłakowskiego',
    'Zielona',
    'Kościuszki',
    'Czajek',
    'Lontowa',
    'Żołnierska',
    'Łącząca',
    'Zielona',
    'Śmiała',
    'Botaniczna',
    'Kochanowskiego',
    'Cienista',
    'Armii',
    'Niska',
    'Reja',
    'Mostowa',
    'Isep',
    'Mirtowa',
    'Partyzantów',
    'Zuchów',
    'Notecka',
    'Kmicica',
    'Bydgosty',
    'Hiacyntowa',
    'Inflancka',
    'Wierzyńskiego',
    'Druhny',
    'Kołobrzeska',
    'Rzeźnicza',
    'Kartuska',
    'Małopolska',
    'Słodowa',
    'Czarnieckiego',
    'Chabrów',
    'Czerwcowa',
    'Filtrowa',
    'Jaworowa',
    'Krzywińska',
    'Lazurowa',
    'Chemiczna',
    'Klecka',
    'Portowa',
    'Borzym',
    'Szumiących',
    'Botaniczna',
    'Wolności',
    'Sielanki',
    'Langiewicza',
    'Słonki',
    'Zjednoczenia',
    'Harcerska',
    'Bytomska',
    'Łodygowa',
    'Brzozowskiego',
    'Wolności',
    'Tuwima',
    'Duńska',
    'Herbowa',
    'Warszawska',
    'Nowowiejskiego',
    'Nowowiejska',
    'Jelinka',
    'Rostworowskiego',
    'Źródłowa',
    'Bukietowa',
    'Grabonia',
    'Bryniczna',
    'Słoneczna',
    'Knyszyńska',
    'Chmielna',
    'Budowlana',
    'Zwiadowcza',
    'Kapuściska',
    'Moskule',
    'Brossa',
    'Chemików',
    'Szewska',
    'Kuczkowskiego',
    'Pola',
    'Żeligowskiego',
    'Poznańska',
    'Wrzesińska',
    'Bystra',

];


const FAKE_CITIES = [
    'Łódź',
    'Warszawa',
    'Gdańsk',
    'Wrocław',
    'Kraków',
    'Szczecin',
    'Białystok',
    'Sosnowiec'
];

const FAKE_MAILS = [
    '@gmail.com',
    '@mail.com',
    '@o2.pl',
    '@wp.pl'
];

function getFakeAddress() {
    str = FAKE_STREETNAMES[Math.floor(Math.random() * FAKE_STREETNAMES.length)] + ' ' + (Math.floor(Math.random() * 200)) + ', ' + FAKE_CITIES[Math.floor(Math.random() * FAKE_CITIES.length)]
    return str;
}


function getRandomName() {
    str = FAKE_FIRST_NAMES[Math.floor(Math.random() * FAKE_FIRST_NAMES.length)] + ' ' + FAKE_LAST_NAMES[Math.floor(Math.random() * FAKE_LAST_NAMES.length)]
    return str;
}

function getRandomPhone() {
    return Math.random().toString().slice(2, 11);
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCHARACTERS = CHARACTERS.toLocaleLowerCase();

function getRandomID() {
    return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)] + CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)] + Math.random().toString().slice(2, 8);
}

function getRandomMail(length) {
    str = '';
    for (i = 0; i < length; i++) {
        str += LOWERCHARACTERS[Math.floor(Math.random() * LOWERCHARACTERS.length)];
    }
    return str + FAKE_MAILS[Math.floor(Math.random() * FAKE_MAILS.length)];;
}

function populateRandom() {
    document.getElementById("customer-pid").value = getRandomID();
    document.getElementById("customer-name").value = getRandomName();
    document.getElementById("customer-email").value = getRandomMail(6);
    document.getElementById("customer-tel").value = getRandomPhone();
    document.getElementById("customer-address").value = getFakeAddress();
}

window.addEventListener('DOMContentLoaded', (event) => {
    var generateButton = document.getElementById('customer-generate');
    generateButton.addEventListener('click', function(e) {
        populateRandom();
    });
});