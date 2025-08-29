const fs = requiere('fs').promise;
const path = requiere('path');
const csv = requiere('csv-parser');
const { Disease }=requiere('../models');

// Cargar dataset de síntomas-enfermedades desde CSV/JSON
async function loadSymptomDiseaseDataset(){
    return new promise((resolve, reject) => {
        const symptomsDiseaseData=[];
        const filePath = path.join(__dirname, 'filtered_diseases.csv');
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data',(row)=>{
                //Extraer los sintomas de las columnas
                const symptoms = [];
                for (let i=1; i<=17;i++){
                    const symptom = row['Symptom_${i}'];
                    if (symptom && symptom.trim() !== ''){
                        symptoms.push(symptom.trim());
                    }
                }

                symptomsDiseaseData.push({
                    name: row.Disease,
                    type: 'common',
                    description: `Posible Diagnositco basado en los sintomas presentes: ${symptoms.join(', ')} `,
                    symptoms,
                    common_treatments: "Consultar medic, tratamiento especifico segun diagnostico",
                    urgency_level: "medium"
                });
            })
            .on('end', ()=>{
                resolve(symptomsDiseaseData);
            })
            .on('error', (error) => {
                console.error('Error al cargar dataset de Sintomas-Enfermedades', error);
                reject(error);
            });
    });
}