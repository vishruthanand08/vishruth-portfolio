import Image from "next/image";

export function About() {
  return (
    <section className="sec shell" id="about">
      <div className="sec__head">
        <span className="t">About Me</span>
      </div>
      <div className="about">
        <p className="prose">
          Hi, I’m Vishruth, a Computer Science major at Georgia Tech with a
          FinTech minor, originally from Arizona. For me, CS is where structure
          meets freedom, it pushes me to think with precision while also giving
          me the space to turn ideas into reality. I’m especially drawn to
          fields that consistently challenge me with tough problems in
          fast-moving environments. Looking ahead, I see myself working in SWE
          or quant and eventually launching something of my own.
        </p>
        <Image
          src="/me.jpg"
          alt="Vishruth Anand"
          width={1080}
          height={810}
          sizes="(max-width: 900px) 420px, 340px"
        />
      </div>
    </section>
  );
}
