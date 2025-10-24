# Autoshop.ba

**Autoshop.ba** je web aplikacija za prodaju i kupovinu automobila koja omogućava korisnicima da kreiraju oglase, šalju ponude, prate oglase i komuniciraju s prodavačima. Aplikacija ima tri tipa korisnika: administrator, prodavač i kupac, svaki sa specifičnim funkcionalnostima i pravima pristupa.


## Funkcionalnosti

### Administrator
Administrator može:
- Kreirati, brisati i upravljati korisnicima (prodavači i kupci)
- Blokirati i deblokirati korisnike
- Brisati oglase
- Pregledavati i rješavati prijave korisnika

### Prodavač
Prodavači mogu:
- Registrirati svoj profil
- Kreirati i upravljati više oglasa sa svim informacijama o automobilima
- Pregledavati sve ponude za svoje oglase i prihvatiti ili odbiti ponude
- Prijavljivati korisnike i odgovarati na upite kupaca
- Brisati svoje oglase

### Kupac
Kupci mogu:
- Registrirati svoj profil ili pregledavati oglase kao neregistrovani korisnici
- Pratiti i spremati oglase koji ih interesuju
- Slati ponude i upite prodavačima
- Prijavljivati korisnike (prodavače)


## Tehnologije

- **Backend:** Node.js, Express  
- **Frontend:** EJS templating  
- **Baza podataka:** PostgreSQL  
- **Upload slika:** Supabase  
- **Sigurnost:** bcrypt za hashiranje lozinki

## Instalacija

1. Kloniraj repozitorij: git clone <repo-url>
2. Instaliraj zavisnosti: npm install
3. Kreiraj .env fajl i dodaj:
PORT=3001
DATABASE_URL=postgres://<username>:<password>@localhost:5432/autoshop
TOKEN_CODE=<jwt-secret>
SUPABASE_URL=<your-supabase-url>
SUPABASE_KEY=<your-supabase-key>
4. Pokreni server: npm start
5. Posjeti aplikaciju na: http://localhost:3001/autoshop.ba

## Korištenje aplikacije

- Registruj se kao kupac ili prodavač da pristupiš svim funkcionalnostima.
- Administratori se dodaju direktno u bazu podataka.
- Prodavači mogu kreirati oglase, upravljati ponudama i prijavama.
- Kupci mogu pregledavati, spremati oglase i slati ponude.
- Administratori mogu blokirati korisnike, brisati i dodavati oglase i rješavati prijave.

## Autor

Emir Babačić

## Licence

Ovaj projekat je razvijen u svrhu završnog rada i može se koristiti i modificirati prema potrebama korisnika.