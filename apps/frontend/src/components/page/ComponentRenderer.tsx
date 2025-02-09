import { TStrapiComponent } from '@/types';
import FormCard from '../simple/FormCard';
import ContactForm from '../forms/ContactForm';
import GoogleMaps from '../simple/GoogleMaps';
import BasicContent from '../simple/BasicArticle';
import PromoCard from '../simple/PromoCard';
import GridGallery from '../simple/GridGallery';
import { ImageWithDescription, ImageWithDescriptionWithRedirect } from '../simple/ImageWithDescription';
import PersonCard from '../simple/PersonCard';

const ComponentRenderer = ({ components }: { components: Array<TStrapiComponent> }) => {
  if (!components) return <p>Brak danych...</p>;
  console.log(components);
  return (
    <article className="flex items-center justify-center flex-col gap-10">
      {components.map(({ __component, id, ...data }) => {
        switch (__component) {
          case 'strona.header':
            return data.Redirect_Url ? (
              <ImageWithDescriptionWithRedirect
                key={`${id}-${__component}`}
                redirectUrl={data.Redirect_Url}
                description={data.Description}
                isBanner={data.Is_Banner}
                picture={data.Picture.data.attributes}
              />
            ) : (
              <ImageWithDescription
                key={`${id}-${__component}`}
                description={data.Description}
                picture={data.Picture.data.attributes}
                isBanner={data.Is_Banner}
              />
            );
          case 'strona.user-info-section':
            return (
              <div key={`${id}-${__component}`} className=" flex flex-wrap justify-center items-center gap-10">
                {data.User_Card.map((u) => (
                  <PersonCard
                    key={u.id}
                    name={u.Name}
                    imageSrc={u.Picture.data ? u.Picture.data.attributes.url : null}
                    description={u.Description}
                  />
                ))}
              </div>
            );
          case 'strona.promo-card':
            return (
              <PromoCard
                key={`${id}-${__component}`}
                title={data.Title}
                isVideoPromo={!!data.Video_Url}
                description={data.Description}
                sourceUrl={data.Video_Url ? data.Video_Url : data.Picture.data.attributes.url}
                redirectText="Zobacz więcej"
                redirectUrl={data.Redirect_Url}
              />
            );
          case 'strona.simple-content':
            return (
              <div key={`${id}-${__component}`} className="">
                <BasicContent content={data.Content} errorMsg="" />
              </div>
            );
          case 'strona.location':
            return (
              <div key={`${id}-${__component}`} className="">
                <GoogleMaps src={data.Iframe_Src} textInfo={data.Title} />
              </div>
            );
          case 'strona.contact-form':
            return (
              <div className="w-full xl:max-w-2xl md:max-w-xl sm:max-w-md max-w-xs">
                <FormCard key={`${id}-${__component}`} title={data.Title}>
                  <ContactForm />
                </FormCard>
              </div>
            );
          case 'zdjecia.category':
            return (
              <div key={`${id}-${__component}`}>
                <GridGallery images={data.Images.data.map((image) => image.attributes)} />
              </div>
            );
          default:
            return '';
        }
      })}
    </article>
  );
};

export default ComponentRenderer;
