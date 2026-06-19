import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '../components/SiteFooter';

export const metadata: Metadata = {
  title: 'Ochrana osobných údajov | FK STUDIO',
  description: 'Zásady spracovania osobných údajov a používania cookies pre FK STUDIO.',
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="font-headline text-on-background bg-background min-h-screen selection:bg-accent selection:text-white overflow-x-hidden">
      <main id="main-content" className="pt-40 pb-32 px-6 md:px-12 max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors duration-300 mb-12 text-xs font-black uppercase tracking-widest group"
        >
          <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Späť na domov
        </Link>

        {/* Title */}
        <h1 className="font-extrabold text-[3rem] md:text-[4.5rem] leading-[1.0] tracking-[-0.04em] text-white mb-6 animate-page-in">
          Zásady ochrany<br />
          <span className="text-accent">osobných údajov.</span>
        </h1>
        <p className="text-neutral-500 text-xs font-bold uppercase tracking-[0.2em] mb-16">
          Účinné od: 19. júna 2026
        </p>

        {/* Legal Text Content */}
        <div className="space-y-12 text-neutral-400 font-medium leading-relaxed text-base md:text-lg border-t border-white/5 pt-16 animate-fade-in">
          
          {/* Intro */}
          <p>
            Tieto zásady popisujú, ako spravujem osobné údaje, ktoré od vás získam pri používaní webovej stránky{' '}
            <strong className="text-white">fkstudio.sk</strong> a najmä pri odoslaní kontaktného formulára. Vaše súkromie beriem vážne a spracúvam len to, čo je nevyhnutné pre vybavenie vášho dopytu.
          </p>

          {/* Section 1: Controller */}
          <section className="space-y-4">
            <h2 className="text-white font-extrabold text-xl md:text-2xl tracking-tight uppercase">
              Kto je správcom vašich údajov
            </h2>
            <div className="border-l-2 border-accent/20 pl-4 py-2 bg-neutral-900/30 rounded-r-xl space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 block">Správca</span>
                <strong className="text-white text-lg">František Kocoň</strong>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 block">Sídlo</span>
                <strong className="text-white">Tvrdošín, Slovenská republika</strong>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 block">Email</span>
                <a href="mailto:hello@fkstudio.sk" className="text-accent hover:underline">hello@fkstudio.sk</a>
              </div>
            </div>
            <p className="text-sm text-neutral-500">
              Pôsobím ako fyzická osoba bez oprávnenia na podnikanie. Pre úvodné dopyty a nezáväzné konzultácie spracúvam vaše údaje na základe oprávneného záujmu a vašej žiadosti o kontakt.
            </p>
          </section>

          {/* Section 2: Data Collection */}
          <section className="space-y-4">
            <h2 className="text-white font-extrabold text-xl md:text-2xl tracking-tight uppercase">
              Aké údaje zhromažďujem
            </h2>
            <p>Pri odoslaní kontaktného formulára na <strong>fkstudio.sk</strong> získavam tieto údaje:</p>
            <ul className="list-none space-y-2 pl-2">
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span><strong className="text-neutral-200">Meno</strong> - pre osobné oslovenie pri odpovedi</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span><strong className="text-neutral-200">Email</strong> - na zaslanie odpovede a komunikáciu</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span><strong className="text-neutral-200">Správa</strong> - obsah dopytu, ktorý mi pošlete</span>
              </li>
            </ul>
            <p className="pt-4 border-t border-white/5">
              Webová stránka <strong className="text-white">používa súbory cookies</strong> na analýzu návštevnosti (Google Analytics) a správu vašich súhlasov (CookieYes). Žiarne identifikačné ani analytické cookies sa neukladajú do vášho zariadenia predtým, ako na to udelíte svoj dobrovoľný súhlas v cookie lište. Nastavenia cookies môžete kedykoľvek zmeniť prostredníctvom cookie lišty.
            </p>
          </section>

          {/* Section 3: Purpose & Legal Basis */}
          <section className="space-y-4">
            <h2 className="text-white font-extrabold text-xl md:text-2xl tracking-tight uppercase">
              Účel a právny základ spracovania
            </h2>
            <p>Vaše údaje spracúvam výhradne na účel:</p>
            <ul className="list-none space-y-2 pl-2">
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span>vybavenia vášho dopytu a komunikácie s vami,</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span>prípravy cenovej ponuky alebo bezplatnej diagnostiky vášho webu,</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span>uchovania kontaktnej histórie pre prípadnú ďalšiu spoluprácu.</span>
              </li>
            </ul>
            <p className="pt-4">Právny základ podľa <strong>Nariadenia GDPR (EÚ) 2016/679</strong>:</p>
            <ul className="list-none space-y-2 pl-2">
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span><strong className="text-neutral-300">článok 6 ods. 1 písm. b)</strong> - predzmluvné kroky na žiadosť dotknutej osoby,</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span><strong className="text-neutral-300">článok 6 ods. 1 písm. f)</strong> - oprávnený záujem (odpoveď na váš dopyt).</span>
              </li>
            </ul>
          </section>

          {/* Section 4: Retention Period */}
          <section className="space-y-4">
            <h2 className="text-white font-extrabold text-xl md:text-2xl tracking-tight uppercase">
              Ako dlho údaje uchovávam
            </h2>
            <p>
              Údaje z formulára si uchovávam najviac <strong className="text-white">3 roky</strong> od posledného kontaktu, pokiaľ neuzavrieme spoluprácu. Ak spoluprácu uzavrieme, údaje uchovávam po dobu nevyhnutnú podľa zákona (najmä z dôvodu prípadnej daňovej povinnosti, ak vznikne).
            </p>
            <p>
              Svoj súhlas so spracovaním môžete kedykoľvek odvolať alebo požiadať o výmaz údajov - postup nájdete v sekcii „Vaše práva“ nižšie.
            </p>
          </section>

          {/* Section 5: Recipients */}
          <section className="space-y-6">
            <h2 className="text-white font-extrabold text-xl md:text-2xl tracking-tight uppercase">
              Komu sa vaše údaje odovzdávajú
            </h2>
            <p>
              Vaše údaje neodovzdávam tretím stranám pre marketingové, predajné ani iné komerčné účely. Pre technické fungovanie webu však využívam tieto služby:
            </p>
            
            <div className="space-y-4 pl-2">
              <div>
                <strong className="text-neutral-200 block text-base">Resend Inc. (USA)</strong>
                <p className="text-sm">
                  Kontaktný formulár využíva službu Resend (prevádzkovaná v USA), ktorá prijíma údaje z formulára a sprostredkuje ich doručenie na môj e-mail. Služba Resend slúži výhradne ako prenosový kanál pre e-mailové notifikácie. Viac informácií:{' '}
                  <a href="https://resend.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">resend.com/privacy</a>
                </p>
              </div>

              <div>
                <strong className="text-neutral-200 block text-base">WebSupport s.r.o. (Slovensko)</strong>
                <p className="text-sm">
                  Webová stránka aj e-mailová schránka fkstudio.sk sú hostované na serveroch slovenského poskytovateľa WebSupport s.r.o. (Karadžičova 12, Bratislava). Vaše údaje z formulára a následná e-mailová komunikácia sú uchovávané na serveroch v rámci EÚ. Server prevádzkovateľa môže technicky logovať IP adresy návštevníkov pre bezpečnosť a štatistiku. Viac informácií:{' '}
                  <a href="https://www.websupport.sk/ochrana-osobnych-udajov" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">websupport.sk/ochrana-osobnych-udajov</a>
                </p>
              </div>

              <div>
                <strong className="text-neutral-200 block text-base">Google Fonts (Google LLC, USA)</strong>
                <p className="text-sm">
                  Webová stránka načítava typografiu zo služby Google Fonts (servery Google). Pri načítaní stránky sa do Google odovzdáva vaša IP adresa. Google ju využíva výhradne na bezpečnostné účely a štatistiku používania písma. Viac informácií:{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">policies.google.com/privacy</a>
                </p>
              </div>

              <div>
                <strong className="text-neutral-200 block text-base">Google Analytics (Google Ireland Limited / Google LLC)</strong>
                <p className="text-sm">
                  Služba Google Analytics slúži na meranie a analýzu návštevnosti nášho webu. Všetky zozbierané údaje o návštevnosti sú anonymizované a spracúvajú sa len s vaším výslovným súhlasom. Viac informácií:{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">policies.google.com/privacy</a>
                </p>
              </div>

              <div>
                <strong className="text-neutral-200 block text-base">CookieYes Limited (UK)</strong>
                <p className="text-sm">
                  Služba CookieYes slúži na správu, zaznamenávanie a ukladanie vašich preferencií ohľadom súborov cookies na našom webe (udelenie súhlasov v cookie lište). Viac informácií:{' '}
                  <a href="https://www.cookieyes.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">cookieyes.com/privacy-policy</a>
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Rights */}
          <section className="space-y-4">
            <h2 className="text-white font-extrabold text-xl md:text-2xl tracking-tight uppercase">
              Vaše práva
            </h2>
            <p>
              V zmysle GDPR a slovenského zákona č. 18/2018 Z. z. o ochrane osobných údajov máte tieto práva:
            </p>
            <ul className="list-none space-y-2 pl-2">
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span><strong className="text-neutral-200">Právo na prístup</strong> - môžete sa kedykoľvek opýtať, aké údaje o vás spracúvam</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span><strong className="text-neutral-200">Právo na opravu</strong> - ak sú vaše údaje nepresné</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span><strong className="text-neutral-200">Právo na výmaz</strong> („právo na zabudnutie“)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span><strong className="text-neutral-200">Právo na obmedzenie spracovania</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span><strong className="text-neutral-200">Právo namietať</strong> proti spracovaniu na základe oprávneného záujmu</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span><strong className="text-neutral-200">Právo na prenosnosť údajov</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span><strong className="text-neutral-200">Právo odvolať súhlas</strong> kedykoľvek bez vplyvu na predchádzajúce spracovanie</span>
              </li>
            </ul>
            <p className="pt-2">
              Pre uplatnenie ktoréhokoľvek z týchto práv mi stačí napísať na e-mail:{' '}
              <a href="mailto:hello@fkstudio.sk" className="text-accent hover:underline">hello@fkstudio.sk</a>. Odpoviem vám do 30 dní.
            </p>
          </section>

          {/* Section 7: Supervisory Authority */}
          <section className="space-y-4">
            <h2 className="text-white font-extrabold text-xl md:text-2xl tracking-tight uppercase">
              Sťažnosť na dozorný orgán
            </h2>
            <p>
              Ak máte za to, že vaše údaje sú spracúvané v rozpore s GDPR, máte právo podať sťažnosť na slovenský dozorný orgán:
            </p>
            <div className="border-l-2 border-accent/20 pl-4 py-2 bg-neutral-900/30 rounded-r-xl space-y-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 block">Dozorný orgán</span>
                <strong className="text-white">Úrad na ochranu osobných údajov SR</strong>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 block">Adresa</span>
                <strong className="text-white">Hraničná 12, 820 07 Bratislava</strong>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 block">Web</span>
                <a href="https://dataprotection.gov.sk" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">dataprotection.gov.sk</a>
              </div>
            </div>
          </section>

          {/* Section 8: Security */}
          <section className="space-y-4">
            <h2 className="text-white font-extrabold text-xl md:text-2xl tracking-tight uppercase">
              Bezpečnosť údajov
            </h2>
            <p>
              Webová stránka beží na zabezpečenom HTTPS protokole s certifikátom Let&apos;s Encrypt. Údaje sa medzi vaším prehliadačom a serverom prenášajú šifrovane.
            </p>
            <p>
              Údaje uchovávam vo svojej osobnej e-mailovej schránke (Gmail) chránenej dvojfaktorovou autentifikáciou. K údajom mám prístup výhradne ja.
            </p>
          </section>

          {/* Section 9: Changes */}
          <section className="space-y-4">
            <h2 className="text-white font-extrabold text-xl md:text-2xl tracking-tight uppercase">
              Zmeny týchto zásad
            </h2>
            <p>
              Tieto zásady môžem v budúcnosti aktualizovať (napríklad pri rozšírení služieb). Aktuálne znenie je vždy dostupné na tejto stránke spolu s dátumom účinnosti.
            </p>
          </section>

          {/* Section 10: Contact */}
          <section className="space-y-4">
            <h2 className="text-white font-extrabold text-xl md:text-2xl tracking-tight uppercase">
              Kontakt
            </h2>
            <p>
              Akékoľvek otázky ohľadom ochrany osobných údajov mi neváhajte napísať na e-mail:{' '}
              <a href="mailto:hello@fkstudio.sk" className="text-accent hover:underline">hello@fkstudio.sk</a>.
            </p>
          </section>

        </div>
      </main>

      <SiteFooter showCta={false} />
    </div>
  );
}
