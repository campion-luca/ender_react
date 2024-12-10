import immagine from "../assets/cosè.jpg";
import MapsTest from "./MapsTest";

const Home = () => {
  return (
    <div className="bg-default-2">{/* APERTURA BODY */}
      
      <h1 className="body-title">Ender</h1>

      <p className="body-text-left">Cos'è Ender?</p>

      <div>{/* DIV INTRODUZIONE */}

        <p className="body-text">
          <i>
            Ender è un progetto ambizioso che punta ad aiutare gli utenti a
            scoprire e vivere esperienze indimenticabili in giro per il{" "}
            <b>mondo</b>. Grazie alla nostra piattaforma, potrai trovare eventi
            adatti ai tuoi interessi, che si tratti di concerti, festival,
            mostre d’arte, conferenze, flash moab o perchè no, feste "private".
            Il nostro obiettivo è rendere la ricerca semplice e intuitiva,
            fornendo informazioni dettagliate su ogni evento: luogo, orari,
            prezzi e recensioni sull'organizzatore. Ender non si limita a
            segnalarti gli eventi, vogliamo <b>ispirarti</b>, guidarti verso
            esperienze uniche che rendano ogni viaggio o weekend speciale. Con
            un design moderno e funzionalità avanzate, Ender è il compagno
            ideale per chi ama esplorare e connettersi con nuove culture,
            persone e passioni. Ovunque ti trovi, Ender è qui per aiutarti a
            trasformare ogni giorno in un'avventura straordinaria e a farti
            immergere in culture ed eventi altrimenti <b>sconosciuti</b>.
          </i>
        </p>

        {/* <img src={immagine} alt="cos'è Ender?" className="body-img" /> */}
        <div className="body-img"></div>

      </div>

      <div class="separatore">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 80 30"
          class="decorative-line"
        >
          <path
            d="M0,10 Q25,0 50,10 T100,10"
            fill="none"
            stroke="#ffffff"
            stroke-width="2"
          />
        </svg>
      </div>

      <div className="mt-5">
        {/* DIV COME FUNZIONA */}

        <p className="body-text-right">Come funziona Ender?</p>
        <p className="body-text">
          <i>
            Ender raccoglie informazioni provenienti da una rete diversificata
            di fonti, tra cui <b>enti comunali</b>, organizzazioni specializzate
            in eventi, locali come <b>discoteche</b>, e persino{" "}
            <b>utenti privati</b> che vogliono promuovere le loro feste/eventi.
            Se sei un ente, un'organizzazione, o semplicemente qualcuno che
            vuole promuovere eventi privati, Ender ti offre l'opportunità di
            partecipare attivamente. Basta cliccare sul pulsante{" "}
            <b>"Upgrade"</b> per ottenere la certificazione come creatore di
            eventi, che ti consente di aggiungere i tuoi eventi al nostro
            sistema. Questo processo garantisce la{" "}
            <b>qualità e l'affidabilità</b> delle informazioni condivise con gli
            utenti, aiutandoti a raggiungere un pubblico più vasto e congruo ai
            tuoi eventi.
          </i>
        </p>
      </div>

      <div class="separatore">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 60 15"
          class="decorative-line"
        >
          <path
            d="M0,10 C15,5 45,5 60,10"
            fill="none"
            stroke="#ffffff"
            stroke-width="2"
          />
        </svg>
      </div>

      <div>
        {/* DIV PERCHE' NOI */}

        <p className="body-text-left">Perchè Ender?</p>
        <p className="body-text">
          <i>
            Ender punta ad offrire un’esperienza che combina{" "}
            <b>affidabilità e facilità</b>
            d’uso. Ogni organizzatore presente sul sito è{" "}
            <b>verificato e certificato</b>, garantendo la qualità e la
            sicurezza degli eventi proposti. Ciò assicura agli utenti una
            selezione di eventi autentici e ben organizzati, senza il rischio di
            truffe o imprevisti. La nostra missione è mettere al primo posto la{" "}
            <b>semplicità e l'intuitività</b>, rendendo la ricerca e la gestione
            degli eventi un processo piacevole e senza stress. Con l’aiuto della
            comunità, Ender cresce e si evolve costantemente, per adattarsi alle
            esigenze di chi lo utilizza. Siamo convinti che il contributo di
            tutti sia
            <b>fondamentale</b> per costruire una rete dinamica e interconnessa,
            dove ogni evento può trovare il suo spazio e ogni utente sentirsi
            parte di un progetto comune. Scegliendo Ender, scegli di far parte
            di una grande <b>famiglia</b> che condividono interessi comuni ai
            tuoi.
          </i>
        </p>
      </div>

    </div>
  );
};

export default Home;
