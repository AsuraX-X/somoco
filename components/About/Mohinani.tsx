import Image from "next/image";
import React from "react";

const Mohinani = () => {
  return (
    <div>
      <div className="space-y-2">
        <p>
          The Mohinani Group is a 3rd generation family business. We are proud
          to be associated with the best and most trusted brands locally and
          internationally. Our operations span packaging, consumer durable
          distribution, electronics retail, real estate, quick service
          restaurants and hospitality.
        </p>

        <p>
          In West Africa we command leadership and an enviable reputation in the
          packaging industry, especially for manufacturing solutions that meet
          the packaging needs of industries across the African continent. We
          operate a one-stop-shop for packaging solutions across the region.
        </p>

        <p>
          Our packaging business provides innovative solutions to many FMCG
          companies — from thin-wall containers and gallons to BOPP laminated
          sacks — and we are market leaders in West Africa.
        </p>

        <p>
          Our investment in the African economy spans more than five decades and
          has helped build a robust industry for the continent. Our diverse
          portfolio of companies has created over 3,000 jobs across multiple
          sectors and countries.
        </p>

        <p>
          Our long-term growth agenda is focused on improving quality of life
          for everyone who comes into contact with our solutions — directly or
          indirectly — and on building sustainable businesses that last.
        </p>

        <p>
          We respect employees, clients and stakeholders of all diverse
          backgrounds. Our values center on People, Accountability, Commitment,
          Persistence, Entrepreneurship and Social Responsibility.
        </p>

        <p>
          Believing, living and sharing our values ensures we grow from strength
          to strength.
        </p>
      </div>

      <div className="w-full max-h-[340px] h-full mt-6">
        <Image
          src={"/about/how-to-2.png"}
          alt="about us banner"
          width={0}
          height={0}
          unoptimized
          className="h-full w-full"
        />
      </div>
      <div className="mt-6 space-y-2">
        <h3 className="text-2xl font-bold">
          Our Approach — Our Strategic Direction & Essence
        </h3>
        <p>
          The Mohinani Group believes each employee is accountable for achieving
          outstanding results by growing sustainable brands through innovation,
          consistency and efficiency. We focus on building and nurturing
          inclusive, successful relationships and staying grounded for the
          benefit of employees, communities and the environment.
        </p>

        <h3 className="text-2xl font-bold">Our Promise</h3>
        <p>
          Our promise explains why the Mohinani Group exists. With a focus on
          Africa, we ensure global quality is delivered in a local context
          across the industries we operate in. Locals have a right to global
          quality and standard — we make sure that happens.
        </p>

        <h3 className="text-2xl font-bold">Our Vision</h3>
        <p>
          Our vision is to be the leading company in selected English-speaking
          sub-Saharan African markets.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center">
        <div>
          <h2 className="text-xl font-bold">Our Mission</h2>
          <p>
            Our mission is what we do to achieve our vision and promise. We
            deliver global-quality products and solutions to local consumers in
            sub-Saharan Africa through strategic partnerships and by developing
            partnerships in three key sectors.
          </p>
          <ul className="list-disc list-inside">
            <li>Plastics and Packaging Manufacturing</li>
            <li>Trade & Distribution – Industrial and Consumers</li>
            <li>Real Estate & Hospitality</li>
          </ul>
        </div>
        <div className="w-full p-4 min-w-[410px] h-full">
          <Image
            src={"/about/goals.png"}
            alt="about us banner"
            width={0}
            height={0}
            unoptimized
            className="h-full rounded-lg w-full"
          />
        </div>
      </div>
      <div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Our Values</h3>
          <p>
            At Mohinani, our operations revolve around core values that
            emphasise our commitment to the growth of all stakeholders. Our
            values come to life through the dedication of employees, clients and
            partners.
          </p>

          <h4 className="text-xl font-semibold">Our Essence is People</h4>
          <p>
            People are the essence of the Mohinani Group. While we strive to
            deliver great products and services, it is people who make this
            possible. At Mohinani, people come first and business second. We
            care about the impact of our decisions on team members, clients and
            stakeholders.
          </p>

          <h4 className="text-xl font-semibold">The Buck Stops with Me</h4>
          <p>
            We believe each employee is accountable for achieving outstanding
            results by growing sustainable brands through innovation,
            consistency and efficiency. Team members are expected to own
            responsibilities, act on what they see and deliver on commitments.
          </p>

          <h4 className="text-xl font-semibold">Partners for the Long Haul</h4>
          <p>
            As a multi-generational family business, we value our history,
            culture and long-term relationships. We focus on patient, long-term
            growth and nurturing brands that stand the test of time.
          </p>
        </div>
      </div>
      <div>
        <div className="grid gap-6 pt-4 grid-cols-3">
          <Image
            src={"/about/about-2.png"}
            alt="about us banner"
            width={0}
            height={0}
            unoptimized
            className="h-full  aspect-square object-cover object-center rounded-lg w-full"
          />
          <Image
            src={"/about/about-3.png"}
            alt="about us banner"
            width={0}
            height={0}
            unoptimized
            className="h-full  aspect-square object-cover object-center rounded-lg w-full"
          />
          <Image
            src={"/about/about-4.png"}
            alt="about us banner"
            width={0}
            height={0}
            unoptimized
            className="h-full  aspect-square object-cover object-center rounded-lg w-full"
          />
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-bold">Feet on the Ground</h3>
          <p>
            To stay grounded you must be conscious and aware of what is going on
            around you — in and outside the business: your team, customers,
            suppliers and competitors. It is about making sure you see and hear
            what is happening.
          </p>

          <p>
            In large organisations we can sometimes forget the details that keep
            a business running: the information that keeps us ahead and the
            warning signs that help us avoid crises. In the daily drive to
            achieve, we can lose touch with the bigger picture. We make sure we
            stay grounded for the benefit of our employees, communities and the
            environment.
          </p>

          <blockquote className="mt-4">
            “Through common alignment on these values as an organization, we
            strengthen our foundation and grow with purpose”.
          </blockquote>
          <p className="mt-2 text-right">– Mr. Ramchand Mohinani, Chairman</p>
        </div>
      </div>
    </div>
  );
};

export default Mohinani;
