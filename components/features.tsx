import Image from "next/image";
import CardImage from "@/public/images/zigzag-4.png";
import CardImage2 from "@/public/images/zigzag-1.png";
import CardImage3 from "@/public/images/zigzag-5.png";

export default function Features() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-8">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4">
              At this moment, <br /> music is coming out of the world <br />{" "}
              through veeq.io
            </h1>
          </div>
          {/* Items */}
          <div
            className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none"
            data-aos-id-blocks
          >
            {/* 1st item */}
            {[
              {
                title: "Instant Features",
                desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.",
                img: CardImage,
              },
              {
                title: "Instant Features",
                desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.",
                img: CardImage2,
              },
              {
                title: "Instant Features",
                desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.",
                img: CardImage3,
              },
            ].map((item, index) => (
              <div
                className="relative flex flex-col items-center"
                data-aos="fade-up"
                data-aos-anchor="[data-aos-id-blocks]"
                key={index}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <Image
                    src={item.img}
                    alt={"Card Image"}
                    objectFit={"cover"}
                    width={475}
                    style={{ height: "auto", marginBottom: "10px" }}
                  />
                </div>
                <h4 className="h4 my-2">{item.title}</h4>
                <p className="text-lg text-gray-400 text-center">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
