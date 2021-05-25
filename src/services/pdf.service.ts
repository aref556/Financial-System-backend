// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { InInvoiceDocument } from 'src/interfaces/app.interface';

@Injectable()
export class PdfService {
    pdfMake: any;

    // สร้างฟอร์มตามประเภท
    async loadPdfMaker() {
        if (!this.pdfMake) {
            const pdfMakeModule = await import('pdfmake/build/pdfmake');
            const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
            this.pdfMake = pdfMakeModule.default;
            this.pdfMake.vfs = pdfFontsModule.pdfMake.vfs;
            this.pdfMake.fonts = {
                Roboto: {
                    normal: 'Roboto-Regular.ttf',
                    bold: 'Roboto-Medium.ttf',
                    italics: 'Roboto-Italic.ttf',
                    bolditalics: 'Roboto-MediumItalic.ttf',
                },
                Sarabun: {
                    normal: "THSarabunNew.ttf",
                    bold: "THSarabunNew-Bold.ttf",
                    italics: "THSarabunNew-Italic.ttf",
                    bolditalics: "THSarabunNew-BoldItalic.ttf",
                }
            }
        }
    }

    async generatePdf() {
        await this.loadPdfMaker();
        //   const def = { content: 'A sample PDF document generated using Angular and PDFMake' };

        const def = {
            content: [
                'หกดหกดหกด',
                '\n',
                'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
            ],
            defaultStyle: {
                font: "Sarabun",
                fontSize: 16,
            }
        }
        this.pdfMake.createPdf(def).open();
    }

    async generateInvoiceDocs(model: InInvoiceDocument) {
        await this.loadPdfMaker();

        const document = {
            content: [
                `ที่ ${model.address}`,
                `สำนักนวัตกรรมดิจิทัลและระบบอัจฉริยะ \n มหาวิยาลัยส่งขลานครินทร์ \n ต. หาดใหญ่ อ.หาดใหญ่ \n จ. สงขลา 90110`,
                `${model.date}`,
                `เรื่อง ${model.title}`,
                `เรียน ${model.title_to}`,
                `${model.message_start}`,
                `${model.message_end}`,
                `ขอแสดงความนับถือ`,
                ` \n \n \n (นางเนาวรัตน์ สอิด)`,
                `หัวหน้าฝ่ายบริการจัดการสำนักนวัตกรรมดิจิทัลและระบบอัจฉริยะ`,
                `สำนักงานนวิตกรรมดิจิทัลและระบบอัจฉริยะ`,
                `โทรศัพท์ 0-7428-2102`,
                `โทรสาร 0-7428-2111`,
                `อิเมล์ผู้ประสานงาน : preeda.n@psu.ac.th, panida.o@psu.ac.th`,
            ],
            defaultStyle: {
                font: "Sarabun",
                fontSize: 16,
            }
        }
        this.pdfMake.createPdf(document).open();
    }

    getBase64ImageFromURL(url) {
        return new Promise((resolve, reject) => {
            var img = new Image();
            img.setAttribute("crossOrigin", "anonymous");

            img.onload = () => {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;

                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                var dataURL = canvas.toDataURL("image/png");

                resolve(dataURL);
            };

            img.onerror = error => {
                reject(error);
            };

            img.src = url;
        });
    }

    async generateImg() {
        await this.loadPdfMaker();

        // var img = document.createElement("img");
        // let img_src = '/src/assets/images/cavalry-v1.jpg';
        // img.src = img_src;
        // console.log('555566666');
        // console.log(img);

        // console.log('555566666');
        // let read_file: FileReader = new FileReader();
        // let img;
        // fs.readFile(`/src/images/cavalry-v1.jpg`, (err, data) => {
        //     if (err) throw err;
        //     //get image file extension name
        //     let extensionName = path.extname(`/src/images/cavalry-v1.jpg`);
        //     let base64Image = data.toString('base64');
        //     let imgSrcString = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;
        //     img = imgSrcString;
        //     console.log(img);
        // })
        // console.log(img);

        let docDefinition = {
            content: [
                {
                    text: 'PDF Generated with Image from external URL',
                    fontSize: 20,
                },
                {
                    image: await this.getBase64ImageFromURL(
                        "/src/assets/images/cavalry-v1.jpg",
                    )
                }
            ]
        };
        this.pdfMake.createPdf(docDefinition).open();
    }

}