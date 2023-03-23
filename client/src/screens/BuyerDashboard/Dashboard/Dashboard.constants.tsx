import { CONTACT_INFO } from "../../../constants";

export const FAQS = [
  {
    question: "Why can't I see supplier details?",
    answer:
      "Supplier details will only be shared with potential buyers once the deal has been negotiated and we have reached an agreement on the commercial terms and conditions.",
  },

  {
    question: "How do I buy a product if I'm interested in it? ",
    answer:
      "If you're interested in a product, you can raise an inquiry that includes required quantity, mode of delivery and payment term requirements.",
  },
  {
    question: "Who do I reach out to for further details on this?",
    answer: `You can get in touch with us at our number <a href="tel: ${CONTACT_INFO.number}">(${CONTACT_INFO.number})</a> or you can email us at <a href="mailTo: ${CONTACT_INFO.email}">${CONTACT_INFO.email}</a> and one of our representatives will get back to you.`,
  },
  {
    question:
      "What documents do I need to provide to become a verified buyer on Tazah Global?",
    answer:
      "You will need to provide company registration documentation, import licenses and other related documents to become a verified buyer at the platform.",
  },
  {
    question:
      "How does working with Tazah Global benefit me as a buyer/importer?",
    answer:
      "The Tazah Global platform enables buyers to source products that are cost effective, better in quality and timely delivered via our vast network of Supply partners and quality assurance & shipping partners.",
  },
  {
    question: "Which products can you provide to me?",
    answer:
      "We are providing products that are exported from Pakistan. Primary products are Rice, Orange, Mango, Potato and Onion. However, if there is any other requirement, we can work on delivering that as well.",
  },
  {
    question: "What are the charges to register on your platform?",
    answer:
      "The registration on the platform is absolutely free. All you need to do to register is provide your name, company name, email address and contact number.",
  },
  {
    question: "What are other charges involved?",
    answer:
      "Tazah Global will only charge a small percentage of the total transaction as a fee for providing services. The charges will be transparent and shared with you at the time of sharing rates.",
  },
];
