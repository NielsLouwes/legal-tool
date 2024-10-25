// documentGenerator.ts
import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
} from "docx";
import { saveAs } from "file-saver";
import { Packer } from "docx";

interface AthleteFormData {
  name: string;
  age: number;
  sport: string;
  nationality: string;
  duration: number;
  "start-date": Date;
  "end-date": Date;
  "base-salary": number;
  "signing-bonus": number | undefined;
  country: string;
  postalCode: string;
  city: string;
  streetAddress: string;
  gender: string;
  "todays-date": Date;
  place: string;
  "passport-number": string;
}

const prepareContractGender = (gender: string) => {
  if (gender === "male") return "Men's";
  return "Women's";
};

export async function generateContract(data: AthleteFormData) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: "PROFESSIONAL ATHLETE CONTRACT",
            heading: HeadingLevel.HEADING_1,
            alignment: "center",
            spacing: {
              after: 200,
            },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `Date : ${new Date().toLocaleDateString()}`,
              }),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `Passport number : ${data["passport-number"]}`,
              }),
            ],
          }),

          new Paragraph({
            text: "1. ATHLETE INFORMATION",
            heading: HeadingLevel.HEADING_2,
            spacing: {
              before: 200,
              after: 100,
            },
          }),

          // athlete name, nationality, document number

          new Paragraph({
            text: `Name : ${data.name}`,
            spacing: {
              before: 100,
              after: 100,
            },
          }),

          new Paragraph({
            text: `Nationality : ${data.nationality}`,
            spacing: {
              before: 100,
              after: 100,
            },
          }),

          new Paragraph({
            text: `Document number : ${data["passport-number"]}`,
            spacing: {
              before: 100,
              after: 100,
            },
          }),

          // fix this part

          new Paragraph({
            children: [
              new TextRun({
                text: `THIS SPONSORSHIP AGREEMENT is made on ${new Date().toLocaleDateString()} between `,
              }),
              new TextRun({
                text: data.name,
                bold: true,
              }),
              new TextRun({
                text: ` (hereinafter referred to as the "Athlete"), who's legal residence is at ${data.city}, ${data.country}, ${data.postalCode}, ${data.streetAddress} and Nike Inc. (hereinafter referred to as the "Organisation").`,
              }),
            ],
            spacing: {
              after: 200,
            },
          }),

          new Paragraph({
            text: "1. TERM",
            heading: HeadingLevel.HEADING_2,
            spacing: {
              before: 200,
              after: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun("The Athlete agrees wear and use Nike products"),
              new TextRun({
                text: data.sport,
                bold: true,
              }),
              new TextRun(" for a period of "),
              new TextRun({
                text: `${data.duration} months`,
                bold: true,
              }),
              new TextRun(
                `, commencing on ${new Date(
                  data["start-date"]
                ).toLocaleDateString()} and ending on ${new Date(
                  data["end-date"]
                ).toLocaleDateString()}.`
              ),
            ],
            spacing: {
              after: 200,
            },
          }),

          new Paragraph({
            text: "2. DUTIES AND OBLIGATIONS OF THE ORGANIZATION",
            heading: HeadingLevel.HEADING_2,
            style: "bold",
            spacing: {
              before: 200,
              after: 100,
            },
          }),

          new Paragraph({
            text: "2.1. The Organization is obligated to ",
            heading: HeadingLevel.HEADING_3,
            style: "bold",
            spacing: {
              before: 100,
              after: 100,
            },
          }),

          new Paragraph({
            text: "Pay the Athlete wages and other fees pursuant to clause 5 of the Contract",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "Supply the Athlete with products and equipment essential to their performance and promotional duties, like apparel, footwear, and accessories, ensuring a steady supply throughout the contract period.",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "Adhere to provisions of protecting human rights (incl. taking into account the Athlete’s rights to express themselves freely) and avoid discrimination of the Athlete;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "In the case of a Contract concluded with a youth Athlete, ensure their right to continue education unrelated to football;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "Provide replacements for lost or damaged products when deemed appropriate.",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "3. DUTIES AND OBLIGATIONS OF THE ATHLETE",
            heading: HeadingLevel.HEADING_2,
            style: "bold",
            spacing: {
              before: 200,
              after: 100,
            },
          }),

          new Paragraph({
            text: "3.1. The Athlete agrees to ",
            heading: HeadingLevel.HEADING_3,
            style: "bold",
            spacing: {
              before: 100,
              after: 100,
            },
          }),

          new Paragraph({
            text: "Participate in the agreed upon  matches, trainings, training camps and meetings scheduled and/or ordered by the coach or Club, incl. perform all instructions of the coach and do his best when participating in a match;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "Wear the subscribed Nike apparel, footwear, and accessories during the contract period, and use these products in a respectful manner.",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "Provide consulting services to the Organization, including but not limited to promoting Nike products and services to the public and providing feedback on Nike products and services.",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "Maintain a healthy lifestyle and high standard of fitness;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "behave in a sporting manner towards people involved in matches and trainings, learn, observe and follow the Laws of the Game, adhere to and accept decisions of officials involved in the match;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "Protect the Organization's reputation in contact with media and football prospects and avoid any declarations which damage the interests of the Organization;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "adhere to Statutes of association, regulations, directives of EFA, FIFA and UEFA and decisions adopted on their basis and in conformity with them. The Player is aware that documents which regulate football may amended from time to time.",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "4. DOPING",
            heading: HeadingLevel.HEADING_2,
            style: "bold",
            spacing: {
              before: 200,
              after: 100,
            },
          }),

          new Paragraph({
            text: "The Player and the Club obey to current rules concerning doping. Doping is the use of substances and methods which are in the prohibited list regulated by the EFA Disciplinary Regulation. The parties are aware that the use of doping is forbidden. The Club has the right to terminate the Contract with a Player who has been convicted of the use of doping, based on the principle of viewing each case separately.",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "Doping is the use of substances and methods which are in the prohibited list regulated by the EFA Disciplinary Regulation. The parties are aware that the use of doping is forbidden. The Club has the right to terminate the Contract with a Player who has been convicted of the use of doping, based on the principle of viewing each case separately.",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "The Club has the right to terminate the Contract with a Player who has been convicted of the use of doping, based on the principle of viewing each case separately.",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "5. GAMBLING AND MATCH FIXING",
            heading: HeadingLevel.HEADING_2,
            style: "bold",
            spacing: {
              before: 200,
              after: 100,
            },
          }),

          new Paragraph({
            text: "The Player and the Club shall comply all documents of EFA and other international football organisations concerning gambling and match-fixing.",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "The parties agree not to take part directly or indirectly for personal gain or the gain of third persons in betting or in similar activities in betting for the result or process of the match at competitions of EFA or organised by EFA, in which their team or the team of a person close to them is taking place. Gain in the meaning of this clause is financial as well as any other gain.",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "The parties agree not to influence or attempt to influence directly or indirectly with any direct or indirect activities the course of the match and/or previously fix the result of the match or competition (fixed match result) regardless of whether the goal of the person is to receive personal gain (proprietary or non-proprietary); create the opportunity of gain for a third person or for any reason causing such behaviour. Gain in the meaning of this clause is financial as well as any other gain, incl. non-proprietary gain;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "The Player confirms that he will notify the Club, EFA and/or the police voluntarily and immediately of any proposal made to them to influence the course and/or result of a match or competition (who, where, when and with what proposal approached the Player, etc.), incl. is aware that upon failure to notify, the Player is deemed an accomplice/participant in the offence.",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "6. ADVERTISING AND REPRESENTATION RIGHTS",
            heading: HeadingLevel.HEADING_2,
            style: "bold",
            spacing: {
              before: 200,
              after: 100,
            },
          }),

          new Paragraph({
            text: "The Player must participate in marketing events established by the Club which have the purpose of promoting and advertising the football Club;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "The Player must wear the outfit established by the Club at advertising events;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "At an event provided in clause 11.1, the Player shall demonstrate his commitment to the Club and to act his best to increase the Club’s reputation.",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "The fee for the Players´ participation in an event provided in clause 11.1 is contained in the fee established in clause 5.1 of the Contract, unless the parties agree otherwise.",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "The Player grants the Club the right to use and authorise third persons to use photographs of the Player and audiovisual and visual materials prepared for the Player (including the Player’s name, relevant statistics, data and images) together with the Club’s name, badge and Player shirt (incl. advertisements of shirt sponsors and equipment manufacturers) for non-commercial purposes for promoting football and other reasonable purposes established by the Club free of charge.",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "The Player must not conclude an individual advertising Contract or participate as a Player in an advertising event without the mediation or written consent of the Club.",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "7. EXPIRY, SUSPENSION AND TERMINATION OF THE CONTRACT",
            heading: HeadingLevel.HEADING_2,
            style: "bold",
            spacing: {
              before: 200,
              after: 100,
            },
          }),

          new Paragraph({
            text: "8. COMPENSATION",
            heading: HeadingLevel.HEADING_2,
            style: "bold",
            spacing: {
              before: 200,
              after: 100,
            },
          }),

          // Compensation Table
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Type")],
                    width: {
                      size: 3000,
                      type: "dxa",
                    },
                  }),
                  new TableCell({
                    children: [new Paragraph("Amount")],
                    width: {
                      size: 3000,
                      type: "dxa",
                    },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Base Salary (Annual)")],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph(`$${data["base-salary"].toLocaleString()}`),
                    ],
                  }),
                ],
              }),
              ...(data["signing-bonus"]
                ? [
                    new TableRow({
                      children: [
                        new TableCell({
                          children: [new Paragraph("Signing Bonus")],
                        }),
                        new TableCell({
                          children: [
                            new Paragraph(
                              `$${data["signing-bonus"].toLocaleString()}`
                            ),
                          ],
                        }),
                      ],
                    }),
                  ]
                : []),
            ],
            width: {
              size: 6000,
              type: "dxa",
            },
          }),

          // Add more sections as needed...

          new Paragraph({
            text: "IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the date first above written.",
            spacing: {
              before: 400,
              after: 200,
            },
          }),

          // Signature lines
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph("ATHLETE:"),
                      new Paragraph({
                        text: "__________________",
                        spacing: { before: 100, after: 50 },
                      }),
                      new Paragraph(data.name),
                    ],
                    width: {
                      size: 3000,
                      type: "dxa",
                    },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph("TEAM REPRESENTATIVE:"),
                      new Paragraph({
                        text: "__________________",
                        spacing: { before: 100, after: 50 },
                      }),
                      new Paragraph("[Team Representative Name]"),
                    ],
                    width: {
                      size: 3000,
                      type: "dxa",
                    },
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });

  // Generate and save document
  const blob = await Packer.toBlob(doc);
  saveAs(
    blob,
    `${data.name} - ${prepareContractGender(data.gender)} ${data.nationality} ${
      data.sport
    } Contract - .docx`
  );
}
