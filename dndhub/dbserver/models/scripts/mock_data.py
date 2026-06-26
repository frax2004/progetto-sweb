import json
import random

RUNTIME_OUT_DIR = '../mock-data/'

NAMES = 'francesco giammarco marco giovanni pino gianluca cristian lucrezio antonio carmeloriccardo anastasio luca simone giorgia francesca ilenia simona virginia vanessa martina giovanna maria veronica matilde irene'
NAMES = NAMES.split(' ')

SURNAMES = 'evangelisti marzano tocco pollara parisi butera jackson gerardi esposito russo ricci moretti marino greco marino barbieri cassano caruso ferri pellegrini conte gatti'
SURNAMES = SURNAMES.split(' ')

ADDRESSES = 'gmail hotmail microsoft unipa edu'
ADDRESSES = ADDRESSES.split(' ')

DOMAINS = 'com net it ru eu'
DOMAINS = DOMAINS.split(' ')

NUMBERS = [n for n in range(1, 100)]

US1 = 'attore cammello cavolfiore ballerina cacciatore drago elefante camomilla lassativo cestino calcolatrice giardiniere orsacchiotto peluche calciatore armadio pirata sgasicchiatore quadro'.split(' ')
US2 = 'gentile annoiato sbuffone vanitoso allegro sporco bagnato pulito pieno futile indispensabile motorizzato automatizzato pelapatate'.split(' ')

USERNAMES = 'bambolina56 cammello1 affari_aquilari23 Hackerman PetrarcaAvevaRagione Shaggy99 Khsora MutandePazze TheRealMarzaa Tumblurr CiccioGamer89 AuraJacket IlMaestro MicheleFiglioDiGiacomo Ringhio IlCollega Topolino'
USERNAMES = USERNAMES.split(' ') + [f'{u}.{v}{random.randint(1, 99)}' for u in US1 for v in US2]

CLASSES = 'barbarian bard cleric druid fighter monk paladin ranger rogue sorcerer warlock wizard'
CLASSES = CLASSES.split(' ')

CHARACTERS_NAMES = 'shelly colt bull brock ricochet spike barley jessie nita dynamike elprimo mortis crow poco bo piper pam tara darryl penny frank gene tick leon rosa carl bibi 8bit sandy bea emz mr.p max jacky gale nani sprout surge colette amber lou byron edgar ruffs stu belle squeak grom buzz griff ash meg lola fang'
CHARACTERS_NAMES = CHARACTERS_NAMES.split(' ')

CAMPAIGNS_NAMES = 'Chronicles-of-the-Void Whispers-of-Aethelgard The-Ashen-Crown Shadows-over-Oakhaven Legacy-of-the-Dragon-Gods Echoes-of-the-Underdark The-Frozen-Frontier Tide-of-the-Serpent-King Wrath-of-the-Lich-Queen Secrets-of-the-Shattered-Isles The-Gilded-Labyrinth Blades-of-the-Feywild Curse-of-the-Weeping-Moon Rise-of-the-Iron-Cabal Dawn-of-the-Beastlords The-Crimson-Crusade Relics-of-Eldoria Fate-of-the-Forgotten-Realm Tempest-of-the-Astral-Sea Tomb-of-the-First-Mage Beneath-the-Sands-of-Ur Order-of-the-Silver-Flame Plague-of-the-Graveborn Heart-of-the-Wildwood Scourge-of-the-Abyss The-Obsidian-Citadel Voyages-of-the-Stormrunner Keepers-of-the-Rune-Stone Tears-of-the-Sun-God Whispering-Shadows'
CAMPAIGNS_NAMES = CAMPAIGNS_NAMES.split(' ')

BACKGROUNDS = ['acolyte']

SPECIES = 'dwarf elf halfling human dragonborn gnome half-elf half-orc tiefling'
SPECIES = SPECIES.split(' ')

with open('chat.json', 'r') as f:
  CHAT: list[str] = json.load(f)

years = list(range(2020, 2027))
months = list(range(13))
days = list(range(1, 29))
hours = list(range(0, 24))
mins = list(range(0, 60))
secs = list(range(0, 60))


alphabet = 'a b c d e f g h i j k l m n o p q r s t u v w x y z'.split()
capital_alphabet = 'a b c d e f g h i j k l m n o p q r s t u v w x y z'.upper().split()
numbers = '0 1 2 3 4 5 6 7 8 9'.split()

def gen_password():
  chars = random.choices(alphabet, k = 4) + random.choices(capital_alphabet, k = 4) + random.choices(numbers, k = 4)
  random.shuffle(chars)
  return ''.join(chars)

PASSWORDS = list(gen_password() for _ in range(10000))



CAMPAIGNS_DESCRIPTIONS = [
  'Una bella campagna',
  'Una meravigliosa campagna',
  'Evvia il nostro meraviglioso master',
  "E' tropical samba do brasil, sensacional samba do brasil, e' mundial samba do brasil, fenomenal samba do brasil",
  "Giocala, non te ne pentirai",
  "L'unica campagna che dovresti giocare",
  "La campagna che non meritavi ma che sapevi di avere bisogno",
  "Solo per i detentori di 10k trofei su clash royale (OBBLIGATORIE TATTICHE ROYALE DURANTE LE SESSIONI)",
  "SOLO PER CHI NON GIOCA AI GIOCHI DELLA SUPERCELL DURANTE LE SESSIONI"
]

def compile(table, printToFile = True, max_count = 10000):
  path = RUNTIME_OUT_DIR + table['name'] + '.json'
  rules = table['rules']
  primary_keys = table.get('primary', [])

  if not isinstance(primary_keys, list):
    raise TypeError("primary_keys must be a list or primary keys (strings)")

  def pick(arrays):
    return (random.choice(x) for x in arrays)

  def transform(value):
    fmt = value['fmt']
    values = pick(value['args'])
    return fmt.format(*values)

  objects = []
  uniques = set()

  max_attempts = max_count * 20
  attempts = 0

  while len(objects) < max_count and attempts < max_attempts:
    attempts += 1
    candidate = {
      key: transform(value) for (key, value) in rules.items()
    }

    if primary_keys:
      values = tuple(candidate[key] for key in primary_keys)
      if values in uniques: 
        continue

      uniques.add(values)

    objects.append(candidate)

  if len(objects) < max_count:
    print("Warning: target amount was {} but {} where generated".format(
      max_count, 
      len(objects)
    ))

  if printToFile:
    with open(path,  'w') as file:
      json.dump(objects, file)

  return objects




def compile_generic_users(accounts):
  objects = [
    {
      'account': account['email'],
      'utente_giocatore': f'(giocatore): {account['email']}',
      'utente_dungeon_master': f'(dungeon_master): {account['email']}'
    } for account in accounts
  ]

  with open(RUNTIME_OUT_DIR + 'UtenteGenerico.json', 'w+') as file:
    json.dump(objects, file)

  return objects

def compile_admins(accounts, density = 1):
  density = 0 if density < 0 else 1 if density > 1 else density
  objects = [
    {
      'account': account['email'],
    } for account in random.choices(accounts, k = round(density*len(accounts)))
  ]

  with open(RUNTIME_OUT_DIR + 'Amministratore.json', 'w+') as file:
    json.dump(objects, file)

  return objects

def compile_characters(accounts):
  CHARACTERS_TABLE = {
    'name': 'Personaggio',
    'primary': ['nome', 'classe', 'livello'],
    'rules': {
      'nome': {
        'fmt': '{}',
        'args': [CHARACTERS_NAMES]
      },
      'classe': {
        'fmt': '{}',
        'args': [CLASSES]
      },
      'livello': {
        'fmt': '{}',
        'args': [NUMBERS[0:19]]
      },
      'specie': {
        'fmt': '{}',
        'args': [SPECIES]
      },
      'background': {
        'fmt': '{}',
        'args': [BACKGROUNDS]
      }
    }
  }

  characters = compile(CHARACTERS_TABLE, False, max_count = 8)

  characters = [
    {
      'utente_generico': account['email'],
      'idx_personaggio': f'{character['nome']} @ (giocatore): {account['email']}',
      'nome': character['nome'],
      'classe': character['classe'],
      'livello': character['livello'],
      'specie': character['specie'],
      'background': character['background']
    } for account in accounts for character in characters
  ]

  with open(RUNTIME_OUT_DIR + 'Personaggio.json', 'w+') as file:
    json.dump(characters, file)

  return characters

def compile_campaigns(accounts):
  CAMPAIGNS_TABLE = {
    'name': 'Campagna',
    'primary': ['nome'],
    'rules': {
      'nome': {
        'fmt': '{}',
        'args': [CAMPAIGNS_NAMES]
      },
      'descrizione': {
        'fmt': '{}',
        'args': [CAMPAIGNS_DESCRIPTIONS]
      }
    }
  }

  campaigns = compile(CAMPAIGNS_TABLE, False, max_count = 8)

  campaigns = [
    {
      'utente_generico': account['email'],
      'idx_campagna': f'{campaign['nome']} @ (dungeon_master): {account['email']}',
      'nome': campaign['nome'],
      'descrizione': campaign['descrizione'],
    } for account in accounts for campaign in campaigns
  ]

  with open(RUNTIME_OUT_DIR + 'Campagna.json', 'w+') as file:
    json.dump(campaigns, file)

  return campaigns


def compile_char_camp_relationship(characters, campaigns):

  objects = []
  for campaign in campaigns:
    party = random.choices(characters, k = random.randint(3, 7))
    for character in party:
      objects.append({
        'idx_campagna': campaign['idx_campagna'],
        'idx_personaggio': character['idx_personaggio'],
        'stato_personaggio': random.choice(['pending', 'accepted'])
      })

  with open(RUNTIME_OUT_DIR + 'ArrayCampagnaPersonaggiItem.json', 'w+') as file:
    json.dump(objects, file)

  return objects
  

def compile_accounts():
  ACCOUNT_TABLE = {
    'name': 'Account',
    'primary': ['email'],
    'rules': {
      'email': {
        'fmt': '{}.{}{}@{}.{}',
        'args': [
          NAMES,
          SURNAMES,
          NUMBERS,
          ADDRESSES,
          DOMAINS
        ],
      },
      'password' : {
        'fmt': '{}',
        'args': [PASSWORDS]
      },
      'username': {
        'fmt': '{}',
        'args': [
          USERNAMES
        ]
      }
    }
  }

  return compile(ACCOUNT_TABLE, max_count=512)

def compile_reports(accounts):
  REPORT_TYPES = ['inappropriate', 'explicit', 'offensive', 'cheat', 'other']
  EMAILS = list(account['email'] for account in accounts)
  CONTENT_TYPES = ['username', 'post', 'image', 'content']
  REPORT_CONTENTS = [
    'Mancanza di rispetto',
    'cretino',
    'Offesa razziale',
    'Offesa',
    'Offesa ancora più offesa',
    'Questo giocatore ha offeso la mia intera dinastia',
    'Contenuti espliciti mostrati in chat'
  ]


  REPORT_TABLE = {
    'name': 'Segnalazione',
    'primary': ['account', 'quando'],
    'rules': {
      'tipo': {
        'fmt': '{}',
        'args': [REPORT_TYPES]
      },
      'quando': {
        'fmt': '{:04}-{:02}-{:02} {:02}:{:02}:{:02}',
        'args': [
          years,
          months,
          days,
          hours,
          mins,
          secs
        ]
      },
      'account': {
        'fmt': '{}',
        'args': [EMAILS]
      },
      'tipo_contenuto': {
        'fmt': '{}',
        'args': [CONTENT_TYPES]
      },
      'contenuto': {
        'fmt': '{}',
        'args': [REPORT_CONTENTS]
      }
    }
  }

  return compile(REPORT_TABLE, max_count=512)

def compile_posts(campaigns):

  POST_TABLE = {
    'name': 'ArrayPostItem',
    'primary': ['idx_campagna', 'time_stamp'],
    'rules': {
      'idx_campagna': {
        'fmt': '{}',
        'args': [
          list(campaign['idx_campagna'] for campaign in campaigns)
        ]
      },
      'time_stamp': {
        'fmt': '{:04}-{:02}-{:02} {:02}:{:02}:{:02}',
        'args': [
          years,
          months,
          days,
          hours,
          mins,
          secs
        ]
      },
      'contenuto': {
        'fmt': '{}',
        'args': [
          CHAT
        ]
      }
    }
  }

  return compile(POST_TABLE, max_count=2048)

accounts = compile_accounts()
generic_users = compile_generic_users(accounts)
admins = compile_admins(accounts, .1)
characters = compile_characters(accounts)
campaigns = compile_campaigns(accounts)
char_camp_relationship = compile_char_camp_relationship(characters, campaigns)
reports = compile_reports(accounts)
posts = compile_posts(campaigns)
