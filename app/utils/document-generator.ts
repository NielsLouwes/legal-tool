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
                text: `${data.duration} years`,
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
            text: "2. COMPENSATION",
            heading: HeadingLevel.HEADING_2,
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
