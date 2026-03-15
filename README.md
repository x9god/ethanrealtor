This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

The prupose of this project is to synchronize the data from Google Sheet saved in Google Drive with the data stored in Mongodb host in the Docker container.

## Getting Started
First, create a Google Sheet in Google Drive. And create two tables, one is house and the other is picture.
Add the following app script into google drive:

```bash
function myonEdit(e) {
  const url = "https://luz-unpanoplied-overdesirously.ngrok-free.dev/api/dbUpdate";

  const sheet = e.source.getActiveSheet();
  const range = e.range;

  const startRow = range.getRow();
  const numRows = range.getNumRows();
  const lastColumn = sheet.getLastColumn();
   const sheetName = sheet.getName();  
  
  const headers = sheet
    .getRange(1, 1, 1, lastColumn)
    .getValues()[0];
  const rows = sheet
    .getRange(startRow, 1, numRows, lastColumn)
    .getValues();

  const payloadRows = [];

  for (let i = 0; i < rows.length; i++) {
    const rowValues = rows[i];
    const obj = {
      rowIndex: startRow + i
    };

    headers.forEach((header, j) => {
      obj[header] = rowValues[j];
    });

    payloadRows.push(obj);
  }

  const payload = {
    sheet: sheetName, 
    rows: payloadRows
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; Google-Apps-Script)"
    }
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const status = response.getResponseCode();
    const content = response.getContentText();

    Logger.log(`Status: ${status}`);
    Logger.log(`Response: ${content.substring(0, 500)}...`);

    if (status < 200 || status >= 300) {
      Logger.log("Failed – check server logs for why");
    }
  } catch (error) {
    Logger.log("Fetch error: " + error);
  }
}
```
Update the const url to your host.

hint: if you have server, ignore this step, othervise follow the instruction.
Second， if you don't have server to host the project, install ngrok to create a virtual public address.
run the following commend in CMD:
``` bash
ngrok http 3000
```

Third, install the docker in your system and create a container with MongoDB image.


Last step, in the project root folder, run:
``` bash
npm run dev
```
Two End point fetchSaleHouse and fetchRentHouse is receiving POST request from front end and return the list of the corresponding house information.


This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
