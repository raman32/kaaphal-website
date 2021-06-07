import { NextPage } from 'next';
import React from 'react';
import DefaultLayout from '../layouts/default';


const AboutUs: NextPage<Record<string, never>> = () => {
    return (
        <div className="mx-4 sm:mx-8 my-4 text-justify tracking-wide">
            <h1 className="my-4 text-xl text-center font-medium">About Kaaphal</h1>
            <p className="mt-4">Kaaphal works for ‘Right to Information’, a fundamental right promised to us by the Constitution of Nepal. It also serves to provide education through information. Idea sharing and learning through Kaaphal Articles is our secondary goals. So we have divided the Kaaphal into three different sections;
                <strong> Information, Education, </strong> and <strong>Kaaphal Articles</strong>. Through the information section, we promise to give various information for Nepalese people and students about the general process to make licenses, citizenship, passports; etc, and details of scholarships, standardized tests, and entrance exams. It also has information on all 753 local levels (स्थानिय तह), provinces, and districts of Nepal so that you can find details of the required local level according to your purpose.</p>
            <p className="mt-4">Loksewa preparation multiple choice questions and answers with practice sets and other exciting features is the other section developed to help loksewa aspirants of Nepal. And Kaaphal Articles indulges the platform for people to read and share their articles.</p>
            <p className="mt-4"><span className="font-light italics text-lg">"We believe that people shouldn’t suffer due to a lack of information. Kaaphal promises to work hard to provide truly useful information."</span></p>
            <p className="mt-4">P.S: Kaaphal or Kafal or Kaphal, (काफल in Nepali) is a very delicious wild fruit found in the Himalayas.&nbsp;</p>

            <div>Who are we?</div>
            <div className=""> Three fellows from an engineering college</div>

            <div>Our Teams</div>
            <div className="">Many many people To list here</div>v

        </div>)
}

AboutUs.getLayout = (page: JSX.Element): React.ReactNode => <DefaultLayout>{page}</DefaultLayout>
export default AboutUs;