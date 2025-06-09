
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HelpCircle } from "lucide-react";

const InstructionsDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="fixed bottom-4 right-4 bg-sportbet-blue hover:bg-sportbet-blue/90 text-white rounded-full shadow-lg z-50"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl">Οδηγίες & Λειτουργίες Πλατφόρμας</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6 py-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Βασικές Πληροφορίες</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Όνομα πλατφόρμας: SportBet AI</li>
                <li>Γλώσσες: Αγγλικά (με δυνατότητα παγκόσμιας πρόσβασης)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Αυθεντικοποίηση</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Εγγραφή και σύνδεση με email/password</li>
                <li>Εγγραφή και σύνδεση μέσω Google</li>
                <li>Σύνδεση πορτοφολιού Solana (Phantom/Backpack)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Πίνακας Ελέγχου</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Εμφάνιση: όνομα χρήστη, εικόνα προφίλ, υπόλοιπο token, ιστορικό προβλέψεων</li>
                <li>Μήνυμα καλωσορίσματος</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Πλοήγηση</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Μενού με συνδέσμους: Αρχική, Προβλέψεις, Πίνακας Κατάταξης, Πορτοφόλι, Προφίλ, FAQ, Υποστήριξη</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Προβλέψεις</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Λίστα διαθέσιμων προβλέψεων AI για αθλήματα</li>
                <li>Κάθε πρόβλεψη εμφανίζει: άθλημα, ομάδες, ημερομηνία/ώρα, ποσοστό αξιοπιστίας</li>
                <li>Φιλτράρισμα προβλέψεων ανά άθλημα, ημερομηνία, επίπεδο αξιοπιστίας</li>
                <li>Εμφάνιση μόνο προβλέψεων με αξιοπιστία 85% ή υψηλότερη</li>
                <li>Πατώντας σε πρόβλεψη εμφανίζονται περισσότερες λεπτομέρειες και επεξήγηση από το AI</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Αγορά Προβλέψεων</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Αγορά πρόβλεψης με tokens SBET</li>
                <li>Εμφάνιση μηνύματος επιβεβαίωσης πριν την ολοκλήρωση της αγοράς</li>
                <li>Κάθε προβολή πρόβλεψης κοστίζει 5 SBET</li>
                <li>Αυτόματη ανταμοιβή με μπόνους SBET σε περίπτωση επιτυχημένης πρόβλεψης</li>
                <li>Κλείδωμα των ανταμοιβών για 1 έτος από την ημερομηνία απόκτησής τους</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Δωρεάν Περιεχόμενο</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Ενότητα "Tip of the Day" με δωρεάν πρόβλεψη για όλους τους χρήστες</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Σύστημα Παραπομπών</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Οι χρήστες λαμβάνουν tokens SBET για την πρόσκληση φίλων που εγγράφονται και κάνουν αγορά</li>
                <li>Πρόγραμμα Affiliate: 5% ανταμοιβή SBET ανά παραπομπή</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Πίνακας Κατάταξης</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Κατάταξη χρηστών με βάση τον αριθμό σωστών προβλέψεων και το σύνολο tokens SBET που κέρδισαν</li>
                <li>Εμφάνιση avatars και ονομάτων χρηστών</li>
                <li>Μόνο οι προβλέψεις υψηλής αξιοπιστίας (85%+) μετρούν στη βαθμολογία</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Πορτοφόλι & Συναλλαγές</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Προβολή ιστορικού συναλλαγών, συμπεριλαμβανομένων αγορών και ανταμοιβών</li>
                <li>Σελίδα πορτοφολιού με υπόλοιπο tokens SBET και πρόσφατες συναλλαγές</li>
                <li>Αγορά tokens SBET με πιστωτική κάρτα (μέσω Stripe)</li>
                <li>Αγορά σε πακέτα των $10, $50, $100, $500, $1000 (όχι προσαρμοσμένα ποσά)</li>
                <li>Ανάληψη tokens SBET στο πορτοφόλι Solana</li>
                <li>Όριο ανάληψης: 10.000 SBET ημερησίως ανά χρήστη</li>
                <li>Το αγορασμένο SBET πηγαίνει σε μη αναλήψιμο πορτοφόλι πλατφόρμας</li>
                <li>Μέγιστο $1.000/ημέρα ανά χρήστη για όλες τις συναλλαγές</li>
                <li>Απαιτείται επαλήθευση KYC για αγορές άνω των $500</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Staking & NFTs</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Λειτουργία staking: οι χρήστες μπορούν να κλειδώσουν tokens SBET για να κερδίσουν ανταμοιβές</li>
                <li>NFT badges για χρήστες που φτάνουν συγκεκριμένα ορόσημα (π.χ. 10 σωστές προβλέψεις)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Προφίλ Χρήστη</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Ενημέρωση πληροφοριών προφίλ και μεταφόρτωση εικόνας προφίλ</li>
                <li>Προσαρμογή προτιμήσεων ειδοποιήσεων</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Διεπαφή Χρήστη</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Εναλλαγή dark mode για ολόκληρη την πλατφόρμα</li>
                <li>Όλες οι σελίδες προσαρμόζονται σε κινητά και είναι responsive</li>
                <li>Προσθήκη φόρτωσης skeletons και spinners για αργά δεδομένα</li>
                <li>Εμφάνιση ειδοποιήσεων toast για σημαντικές ενέργειες</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Περιεχόμενο & Υποστήριξη</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Σελίδα FAQ με συχνές ερωτήσεις και απαντήσεις</li>
                <li>Σελίδα υποστήριξης με φόρμα επικοινωνίας για ερωτήσεις χρηστών</li>
                <li>Οι χρήστες μπορούν να βαθμολογούν και να δίνουν σχόλια για κάθε πρόβλεψη</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Στατιστικά & Διαφάνεια</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Εμφάνιση συνολικών στατιστικών ακρίβειας AI στην αρχική σελίδα</li>
                <li>Σελίδα "How We Calculate" που εξηγεί το μοντέλο AI</li>
                <li>Εμφάνιση ημερομηνίας τελευταίας ενημέρωσης μοντέλου σε κάθε πρόβλεψη</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Διαχείριση</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Πίνακας διαχείρισης για τη διαχείριση χρηστών, προβλέψεων και σχολίων</li>
                <li>Οι διαχειριστές μπορούν να προσθέτουν, να επεξεργάζονται ή να αφαιρούν προβλέψεις</li>
                <li>Οι διαχειριστές μπορούν να αποκλείουν ή να αναστέλλουν χρήστες εάν είναι απαραίτητο</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Ασφάλεια & Συμμόρφωση</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Ασφαλής αποθήκευση όλων των δεδομένων χρηστών με Supabase</li>
                <li>Διαγραφή δεδομένων συμβατή με GDPR για χρήστες που το ζητούν</li>
                <li>Σελίδες Όρων Χρήσης και Πολιτικής Απορρήτου</li>
                <li>Αποποίηση ευθυνών: "Οι προβλέψεις είναι μόνο για ψυχαγωγικούς σκοπούς. Δεν αποτελούν οικονομική συμβουλή."</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Ειδοποιήσεις & Επικοινωνία</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Ειδοποιήσεις email για σημαντικά γεγονότα</li>
                <li>Επαναφορά κωδικού πρόσβασης μέσω email</li>
                <li>Προαιρετική επαλήθευση 2 παραγόντων για επιπλέον ασφάλεια</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Πρόσθετα Χαρακτηριστικά</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Ενσωμάτωση reCAPTCHA σε φόρμες εγγραφής και επικοινωνίας</li>
                <li>Παρακολούθηση και καταγραφή όλων των κρίσιμων ενεργειών για ασφάλεια</li>
                <li>Σελίδα κατάστασης συστήματος</li>
                <li>Εμφάνιση της τρέχουσας κατάστασης του δικτύου Solana και της τιμής του token SBET</li>
                <li>Εναλλαγή μεταξύ Solana devnet και mainnet για δοκιμές</li>
                <li>Λειτουργία demo για νέους χρήστες</li>
                <li>Αναφορά σφαλμάτων ή προβλημάτων</li>
                <li>Ιστορικό αλλαγών ή ενότητα "What's New"</li>
                <li>Blog ή ενότητα ειδήσεων</li>
                <li>Εγγραφή σε newsletter</li>
                <li>Αναζήτηση προβλέψεων ή χρηστών</li>
                <li>Χρονόμετρο αντίστροφης μέτρησης για επερχόμενους αγώνες</li>
                <li>Λειτουργία "Αγαπημένα"</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Δεδομένα Αγώνων</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Ενσωμάτωση παγκόσμιου API δεδομένων αθλημάτων (Sportmonks, PredictHQ ή Sportradar)</li>
                <li>Τακτική ενημέρωση της βάσης δεδομένων με τις τελευταίες πληροφορίες</li>
                <li>Συλλογή λεπτομερών στατιστικών για κάθε αγώνα</li>
                <li>Αυτόματη ενημέρωση προβλέψεων σε πραγματικό χρόνο</li>
                <li>Τμήμα "Live Now" για αγώνες που βρίσκονται σε εξέλιξη</li>
              </ul>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default InstructionsDialog;
