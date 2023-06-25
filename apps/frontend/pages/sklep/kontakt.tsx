import { clubHqGoogleMapsIFrameSrc } from 'common/utils/constants';

import GoogleMaps from '@/components/simple/GoogleMaps';
import ShopLayout from '@/components/layout/Shop/index';

import ContactForm from '@/components/forms/ContactForm';
import ContactInfo from '@/components/page/Kontakt/ContactInfo';
import MainPageService from '@/modules/services/main.service';

const Contact = ({ contactData }) => {
  return (
    <>
      <section className="mb-20">
        <div className="grid grid-flow-row md:grid-cols-2 gap-6 justify-items-center">
          <div className="flex justify-center">
            <ContactInfo
              address={contactData.Address}
              phoneNumber={contactData.Phone_Number}
              openingHours={contactData.Opening_Hours}
              regon={contactData.REGON}
              nip={contactData.NIP}
              krs={contactData.KRS}
              bankAccountNumber={contactData.Bank_Account_Number}
            />
          </div>
          <div className="flex justify-center w-full xl:w-4/6 lg:3/5">
            <ContactForm />
          </div>
        </div>
      </section>
      <GoogleMaps src={clubHqGoogleMapsIFrameSrc} textInfo={'Siedziba naszego sklepu:'} />
    </>
  );
};
export async function getStaticProps() {
  const { result } = await MainPageService.getContactAndLocationData();
  return {
    props: {
      contactData: result
        ? result.data.attributes
        : {
            Phone_Number: 'Brak danych',
            Address: 'Brak danych',
            Opening_Hours: 'Brak danych'
          }
    },
    revalidate: 60
  };
}

export default Contact;

Contact.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};
