import Image from "next/image";

const shots = [
  { src: "/hiking.jpg", alt: "Hiking" },
  { src: "/piano.jpg", alt: "Piano" },
  { src: "/running.jpg", alt: "Running" },
  { src: "/dj.jpg", alt: "DJing" },
];

export function Interests() {
  return (
    <section className="sec shell" id="interests">
      <div className="sec__head">
        <span className="t">Interests</span>
      </div>
      <p className="prose">
        Outside of CS, I stay active with lifting, basketball, pickleball, and
        hiking, and keep creative through Carnatic music, piano, and DJing.
      </p>
      <div className="shots">
        {shots.map((shot) => (
          <div className="shot" key={shot.src}>
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
