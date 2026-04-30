
<div align=center>
<h1> D&D Hub </h1>
</div>

---
<image src="banner.jpg"></image>

### Indice
- [Partecipanti](#partecipanti)
- [Descrizione](#descrizione)
- [Attori](#attori)
  - [Amministratore degli utenti](#amministratore-degli-utenti)
  - [Utente generico](#utente-generico)
  - [Utente visitatore](#utente-visitatore)
  - [Utente giocatore](#utente-giocatore)
  - [Utente dungeon master](#utente-dungeon-master)
- [Pagina principale](#pagina-principale)
- [Funzionalità](#funzionalità)
  - [Registrazione & Gestione Account](#registrazione--gestione-account)
    - [Registrazione](#registrazione)
    - [Log-in](#log-in)
    - [Accesso alle aree riservate](#accesso-alle-aree-riservate)
    - [Modifica delle Proprie Credenziali](#modifica-delle-proprie-credenziali)
    - [Log-out](#log-out)
    - [Eliminazione dell'account](#eliminazione-dellaccount)
  - [Creazione del Personaggio](#creazione-del-personaggio)
    - [Note](#note)
  - [Visualizzazione dei Personaggi Creati](#visualizzazione-dei-personaggi-creati)
  - [Visualizzazione e modifica scheda Personaggio](#visualizzazione-e-modifica-scheda-personaggio) 
  - [Iscrizione ad una campagna](#iscrizione-ad-una-campagna)
  - [Visualizzazione delle campagne a cui si partecipa e disiscrizione](#visualizzazione-delle-campagne-a-cui-si-partecipa-e-disiscrizione)
  - [Creazione di una Campagna](#creazione-di-una-campagna)
  - [Visualizzare le campagne a cui si partecipa](#visualizzare-le-campagne-a-cui-si-partecipa)
  - [Gestire i giocatori all'interno di una campagna](#gestire-i-giocatori-allinterno-di-una-campagna)
  - [Fare annunci su bacheca](#fare-annunci-su-bacheca)
  - [Eliminare o terminare una campagna](#eliminare-o-terminare-una-campagna)
- [Struttura del sito web](#struttura-del-sito-web)
- [Schema E-R](#schema-e-r)

---
## Partecipanti
| Nome      | Cognome    | Matricola | Corso di Laurea  | Indirizzo E-Mail                       |
| --------- | ---------- | --------- | ---------------- | -------------------------------------- |
| Giovanni  | Butera     | 0771226   | Informatica      | giovanni.butera01@community.unipa.it   |
| Francesco | Pollarà    | 0772215   | Informatica      | francesco.pollara02@community.unipa.it |
| Riccardo  | Campanella | 0770105   | Ing. Informatica | riccardo.campanella@community.unipa.it |

---
## Descrizione
<div align=center style="font-style : italic">
La nostra proposta rappresenta una web app volta al supporto digitale di campagne del gioco di ruolo da tavolo Dungeons & Dragons. In particolare, il nostro progetto si propone di fornire al giocatore medio di una campagna D&D un modo semplice, veloce e intuitivo per la creazione e la gestione dei propri personaggi.
</div>

---
### Attori
L'architettura del sito web la seguente gerarchia di attori, ognuno con obiettivi e permessi differenti:
##### Amministratore degli Utenti
La figura dell'amministratore ha il compito di gestire la comunicazione lato server tra gli utenti, il loro Account da un punto di vista del database, e ha anche il ruolo di moderazione generica di tutti gli utenti generici, come censura di terminologia e immagini inappropriate.
##### Utente Generico
L'utente generico disporrà di un Account personale al quale dovrà essere già registrato (effettuando il log-in) oppure a cui dovrà registrarsi al primo accesso. 

L'utente generico potrà operare nel sito web solo grazie al suo account.

L'utente generico non ha nessun ruolo specifico, ci riferiremo ad esso ogni qualvolta verranno menzionati permessi e funzionalità legate sia ad un **utente dungeon master** che ad un **utente giocatore**. All'utente generico sarà possibile accedere a due aree personali separate, ognuna delle quali sarà relativa ad uno dei due tipi di utenti possibili.
Inoltre, l'utente generico avrà anche la possibilità di richiedere ad un **utente amministratore** la rimozione del proprio Account dalla piattaforma.
##### Utente Visitatore
Ci riferiamo all'utente **visitatore** come l'utente che non è provvisto di alcun account e visita la homepage del sito senza registrarsi. Le funzionalità a cui ha accesso questo tipo di utente sono minime e riguardano solo la visualizzazione della presentazione del sito web e la descrizione delle funzionalità offerte da esso.
Inoltre, un utente visitatore avrà la possibilità di **registrarsi** o di effettuare il **log-in**, in questo modo potrà essere considerato un utente **generico**.
##### Utente Giocatore
Ci riferiamo all'utente **giocatore** come l'utente generico che ha effettuato l'accesso all'area personale **dedicata ai giocatori**.

L'utente giocatore avrà la possibilità di:
- Creare un nuovo personaggio
- Visualizzare i personaggi creati
- Visualizzare la scheda di ogni personaggio creato
- Modificare e gestire le schede dei personaggi (compreso di equipaggiamento)
- Iscriversi ad una campagna con un personaggio
- Rimuovere l'iscrizione da una campagna con un personaggio
- Visualizzare le campagne a cui si partecipa.
- Eliminare un personaggio
##### Utente Dungeon Master
Ci riferiamo all'utente **dungeon master** come l'utente generico che ha effettuato l'accesso all'area personale **dedicata ai dungeon master**.

L'utente dungeon master avrà la possibilità di:
- Creare una campagna
- Accettare richieste di iscrizione dei giocatori ad una campagna
- Gestire i giocatori all'interno della propria campagna
- Visualizzare le campagne a cui si partecipa
- Gestire limitatamente le schede personaggi dei giocatori delle proprie campagne
- Operazioni di moderazione nei confronti dei giocatori partecipanti alle proprie campagne
- Rimuovere un giocatore da una propria campagna
- Eliminare o terminare una campagna.

---

### Pagina principale
La home page del nostro sito web, consiste in una galleria di presentazione delle caratteristiche e funzionalità del sito. Al suo interno sarà presente un menù, attraverso il quale un utente visitatore sarà in grado di registrarsi o di effettuare il log-in e, successivamente, accedere alle aree riservate agli utenti giocatore e dungeon master.
Infine, con una sezione a piè di pagina saranno presenti informazioni sugli sviluppatori, crediti e riferimenti esterni.

---
### Funzionalità
Le Funzionalità minime previste dall'M.V.P. saranno le seguenti:

##### Registrazione & Gestione Account
###### Registrazione
Ogni utente visitatore, mediante la **pagina di iscrizione** alla piattaforma, avrà la possibilità di registrarsi come **utente generico**.
###### Log-in
Ogni utente visitatore, mediante la **pagina di log-in** alla piattaforma, avrà la possibilità di accedere come **utente generico** (registrato in precedenza) al sito web.
###### Accesso alle aree riservate
Ogni utente generico avrà la possibilità, tramite la pagina principale, di accedere alle aree riservate relative all'utente **giocatore** e all'utente **dungeon master**
###### Modifica delle Proprie Credenziali
Ogni utente generico avrà la possibilità, tramite la pagina di gestione account, di modificare le proprie credenziali e informazioni personali.
##### Log-out
Ogni utente generico avrà la possibilità, tramite la pagina principale, di effettuare il log-out dalla piattaforma, diventando un **utente visitatore**.
##### Eliminazione dell'account
Ogni utente generico avrà la possibilità, tramite la pagina di gestione account, di effettuare la richiesta di eliminazione del proprio account dalla piattaforma che **dovrà essere accettata** da un utente **amministratore**. 

##### Creazione del Personaggio
Ogni utente giocatore avrà la possibilità, tramite la sequenza di pagine di creazione del personaggio, di creare un nuovo personaggio.
La sequenza di pagine di creazione del personaggio è strutturata come segue:
1. **Pagina di selezione della classe** $\implies$ offre la possibilità, con l'utilizzo di un menù a collasso, di selezionare la classe del personaggio da creare. 
2. **Pagina di selezione di specifiche riguardanti la classe** $\implies$ offre la possibilità di selezionare tutte le abilità o caratteristiche opzionali derivanti dalla classe selezionata precedentemente.
3. **Pagina di selezione della specie** $\implies$ offre la possibilità, con l'utilizzo di un menù a collasso, di selezionare la specie del personaggio da creare. 
 4. **Pagina di selezione di specifiche riguardanti la specie** $\implies$ offre la possibilità di selezionare tutte le abilità o caratteristiche opzionali derivanti dalla specie selezionata precedentemente.
5. **Pagina di selezione del background** $\implies$ offre la possibilità, con l'utilizzo di un menù a collasso, di selezionare il background del personaggio da creare. 
 6. **Pagina di selezione di specifiche riguardanti dal background** $\implies$ offre la possibilità di selezionare tutte le abilità o caratteristiche opzionali derivanti dal background selezionato precedentemente.
7. **Pagina di selezione dell'equipaggiamento** $\implies$ offre la possibilità di selezionare l'equipaggiamento del Personaggio da creare. Terrà conto di equipaggiamento e monete provenienti da classe e background.
8. **Pagina di selezione delle lingue conosciute** $\implies$ offre la possibilità, con l'utilizzo di un menù a bottoni, di selezionare le lingue parlate dal personaggio da creare. 
9. **Pagina di scelta delle statistiche** $\implies$ offre la possibilità di selezionare le statistiche del personaggio da creare. Le statistiche potranno essere scelte tramite insiemi predefiniti (_Array Standard_), simulando un tiro di dadi oppure selezionate in maniera personale.
10. **Pagina di preview & scelta del nome** $\implies$ offre la possibilità di avere una visualizzazione preventiva del personaggio da creare e chiede l'inserimento di un nome e (opzionalmente) una immagine prima di ultimare il personaggio.
###### Note:
- Ogni pagina della sequenza di pagine per la creazione del personaggio offre inoltre la possibilità di tornare alle pagine precedenti per ulteriori modifiche o l'annullamento della creazione del personaggio.
- Alcune pagine della sequenza di pagine per la creazione del personaggio offrono la possibilità di personalizzare completamente le caratteristiche del personaggio, compilando gli opportuni campi, come opzione alternativa.

##### Visualizzazione dei Personaggi Creati
Ogni utente giocatore avrà la possibilità di visualizzare ogni Personaggio in una griglia di personaggi (la preview del singolo personaggio è una cella della griglia).
Cliccando sulla singola cella, si avrà accesso alla scheda del personaggio in 2 modalità:
- modalità visualizzazione
- modalità modifica
Inoltre, lo stesso menù di scelta avrà l'opzione "elimina personaggio".

###### Visualizzazione e modifica scheda Personaggio 
Con scheda personaggio ci riferiamo ad una pagina di visualizzazione dettagliata e comprensiva delle caratteristiche, abilità ed equipaggiamenti del personaggio. 
Spostando il cursore sopra alcuni campi, potranno essere visualizzati i dettagli del suddetto campo tramite pop-up.
Sarà possibile modificare alcuni campi della scheda come incantesimi ed equipaggiamento.
Infine sarà possibile eliminare un personaggio creato tramite un apposito campo all'interno della scheda.

##### Iscrizione ad una campagna
Un utente giocatore, dalla pagina dell'area personale, attraverso un menù, sarà in grado di Iscriversi ad una campagna tramite un codice univoco di 12 caratteri alfanumerici oppure tramite link di invito.
##### Visualizzazione delle campagne a cui si partecipa e disiscrizione
Un utente giocatore, dalla pagina dell'area personale, attraverso un menù, sarà in grado di accedere alla pagina che mostra le campagne a cui si partecipa per poterle visualizzare. 
Le campagne saranno disposte in una griglia ed ogni cella corrisponde ad una singola campagna. Cliccando su una cella si accederà alla scheda relativa alla singola campagna. 
All'interno della scheda della campagna sarà possibile visualizzare alcuni dati relativi agli altri utenti giocatori partecipanti alla stessa. Sarà inoltre possibile, tramite apposita bacheca, visualizzare annunci da parte dell'utente dungeon master.
Infine sarà possibile annullare l'iscrizione alla campagna tramite apposito menù.

#### Creazione di una Campagna
Un utente dungeon master, dalla propria area personale, avrà la possibilità di creare una nuova campagna riempendo i vari campi (anche opzionali) come:
- Nome campagna
- Banner della campagna
- Aggiungere gli utenti tramite tag, o condividendo il codice di invito/link.
- Aggiungere una descrizione della campagna [opzionale]
- Caricare documenti aggiuntivi utili alla campagna per i giocatori [opzionale]

#### Visualizzare le campagne a cui si partecipa
Un utente dungeon master, dalla propria area personale, avrà la possibilità di visualizzare le campagne a cui partecipa. Le campagne saranno disposte in una griglia. Ogni campagna rappresenterà una cella di questa griglia. Cliccando su una cella sarà possibile accedere alla relativa campagna.

#### Gestire i giocatori all'interno di una campagna
Un utente dungeon master, dalla pagina relativa alla campagna interessata, potrà gestire i giocatori partecipanti alla propria campagna nella seguente maniera:
- Accettare richieste di iscrizione da parte di giocatori nuovi.
- Rimuovere dalla campagna giocatori e/o relativi personaggi.
- Visualizzare le schede personaggi dei giocatori partecipanti alla campagna.
- Modificare (limitatamente, e con il benestare del giocatore) la scheda dei personaggi in modo da aggiungere/rimuovere abilità e/o equipaggiamenti e/o incantesimi o altro.
- Moderare alcuni comportamenti dei giocatori (i.e. censura di testo o immagini inappropriate)

#### Fare annunci su bacheca
Un utente dungeon master, dalla pagina relativa alla campagna interessata, potrà scrivere e postare annunci visibili a tutti gli utenti giocatori partecipanti alla campagna.

#### Eliminare o terminare una campagna
Un utente dungeon master, dalla pagina relativa alla campagna interessata, potrà eliminare la campagna, eliminando di conseguenza tutti i dati relativi e rimuovendo dalla campagna tutti gli utenti giocatori partecipanti.

---
### Diagramma dei casi d'uso


### Architettura MVC


### Struttura del sito web
Qui sotto è riportata la struttura delle pagine del sito web sottoforma di grafo/automa a stati finiti.

<image src="website-structure.jpeg"></image>

---
### Schema E-R
