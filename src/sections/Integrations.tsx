import Tag from "~/components/Tag";
import figmaIcon from "~/assets/images/figma-logo.svg";
import pytorchIcon from "~/assets/images/pytorchIcon.svg";
import nextjsIcon from "~/assets/images/nextjsIcon.svg";
import awsIcon from "~/assets/images/awsIcon.svg";
import framerIcon from "~/assets/images/framer-logo.svg";
import githubIcon from "~/assets/images/github-logo.svg";
import IntegrationColumn from "~/components/IntegrationColumn";

const integrations = [
  {
    name: "Figma",
    icon: figmaIcon,
    description: "Figma is a collaborative interface design tool.",
  },
  {
    name: "Pytorch",
    icon: pytorchIcon,
    description:
      "PyTorch is an open-source machine learning framework for building and training deep neural networks.",
  },
  {
    name: "Next.js",
    icon: nextjsIcon,
    description:
      "Next.js is a React framework for building fast, production-ready web applications with server-side rendering.",
  },
  {
    name: "AWS",
    icon: awsIcon,
    description:
      "AWS provides on-demand cloud computing services including storage, databases, and analytics.",
  },
  {
    name: "Framer",
    icon: framerIcon,
    description: "Framer is a professional website prototyping tool.",
  },
  {
    name: "GitHub",
    icon: githubIcon,
    description: "GitHub is the leading platform for code collaboration.",
  },
];

export type IntegrationsType = typeof integrations;

export default function Integrations() {
  return (
    <section id="Integrations" className="overflow-hidden">
      <div className="container">
        <div className="grid items-center lg:grid-cols-2 lg:gap-16">
          <div>
            <Tag>Integration</Tag>
            <h2 className="mt-6 text-6xl font-medium">
              Plays well with <span className="text-lime-400">others</span>
            </h2>

            <p className="mt-4 text-lg text-white/50">
              Layers seamlessly integrates with AWS for faster cloud based
              computing to train model ,and fine the model with Pytorch, and
              deploy it with Next.js. It also supports Figma for design, Framer
              for prototyping, and GitHub for version control.
            </p>
          </div>
          <div>
            <div className="mt-8 grid h-[400px] gap-4 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] md:grid-cols-2 lg:mt-0 lg:h-[800px]">
              <IntegrationColumn integrations={integrations} />
              <IntegrationColumn
                integrations={integrations.slice().reverse()}
                className="hidden md:flex"
                reverse
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
