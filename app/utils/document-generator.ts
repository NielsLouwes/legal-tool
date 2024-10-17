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
                text: `Place : ${data.place}`,
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
                text: `THIS AGREEMENT is made on ${new Date().toLocaleDateString()} between `,
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
              new TextRun("The Athlete agrees to play "),
              new TextRun({
                text: data.sport,
                bold: true,
              }),
              new TextRun(" for the Team for a period of "),
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
            text: "2. DUTIES AND OBLIGATIONS OF THE CLUB",
            heading: HeadingLevel.HEADING_2,
            style: "bold",
            spacing: {
              before: 200,
              after: 100,
            },
          }),

          new Paragraph({
            text: "2.1. The Club is obligated to ",
            heading: HeadingLevel.HEADING_3,
            style: "bold",
            spacing: {
              before: 100,
              after: 100,
            },
          }),

          new Paragraph({
            text: "pay the Player wages and other fees pursuant to clause 5 of the Contract, incl. during a period of representing the national team;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "insure the Player against accidents pursuant to clause 5 of the Contract;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "keep a record of the Player’s injuries (incl. injuries received in the national team) and process data as confidential. The Club appoints a responsible person for keeping records of the Player’s injuries;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "adhere to provisions of protecting human rights (incl. taking into account the Player’s rights to express themselves freely) and avoid discrimination of the Player;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "in the case of a Contract concluded with a youth Player, ensure his right to continue education unrelated to football;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "upon mutual agreement, enable the Player to prepare for career following football-related activities in the form of acquiring a profession;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "if possible, commence negotiations and make its best efforts to facilitate transfer of the Player to another football Club if this promotes the Player’s career as a football Player and conforms to the Club’s interests;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "establish written internal rules of the Club (which includes work procedures, occupational health and safety rules, disciplinary rules with sanctions, etc.) and introduce these to the Player in an understandable manner before signing the Contract. The rules must regulate the terms and conditions for the mandatory health and accident insurance of the Player and conducting regular health inspections by qualified staff. Occupational health and safety rules must also describe risk assessment, preventive measures, as well as providing information and consulting, the Player’s participation in trainings, prevention of using doping, etc.;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "adhere to Statutes of association, regulations, directives of EFA, FIFA and UEFA and decisions adopted on their basis and in conformity with them. The Club is aware that documents which regulate football may amended from time to time.",
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
            text: "participate in all matches, trainings, training camps and meetings scheduled and/or ordered by the coach or Club, incl. perform all instructions of the coach and do his best when participating in a match;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "wear training or match kit issued to the Player at the time established by the Club;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "maintain a healthy lifestyle and high standard of fitness;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "obey work procedure documents approved by the Club and introduced to the Player against signature, incl. but not limited to, disciplinary rules and the declaration of tolerance;",
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
            text: "abstain from participating in other activities related to football and/or other possible dangerous activities which the Club has not previously approved and which the Club has not covered with insurance;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "undergo regularly medical examination and medical treatment required by the Club, incl. adhere to the provided treatment;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "immediately inform the Club of an accident or illness and not to undergo any medical treatment before the Player has informed the Club´s doctor (except in case of emergencies) and provide a medical certificate in the case of incapacity for work;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "upon disagreeing with the opinion of the Club´s doctor, Player has a right to a second opinion of another independent medical expert. If the opinions of the Club’s doctor and the medical expert differ, the Club and the Player will agree with the opinion of a third independent medical expert, whose opinion will remain binding for the parties;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "take care of the property of the Club and to return it after termination of the Contract;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "protect the Club’s reputation in contact with media and football prospects and avoid any declarations which damage the interests of the Club;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "at his initiative and immediately inform the coach or official of the Club of all circumstances which have become known to him and which violate or may significantly violate the interests or reputation of the Club, and immediately notify the coach or official of the Club of all possible circumstances which may influence the preservation and condition of assets handed into the Player’s possession;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "not start transfer negotiations with another football Club without notifying the Club, except if the Contract concluded between the Club and the Player expires within six months;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "not participate in another football Club in any manner (as a Player, consultant, coach, owner etc.) without the written consent of the Club;",
            bullet: {
              level: 0,
            },
          }),

          new Paragraph({
            text: "not participate in football organisations forbidden by FIFA and/or UEFA;",
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
            text: "4. COMPENSATION",
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
