// Content translations for data-driven text (crop names, seed info, seasons, etc.)
// Keyed by the English source string. tc("Bajra") returns the current-language
// equivalent, falling back to the English source string when no translation exists.
// The full legacy dictionaries (~1,000 lines) are imported in batches; the entries
// below cover the highest-frequency data-driven strings (crops, seasons, quality
// steps, research areas, values, regions, seed types). Any unmapped string falls
// back to English via tc(), so the site always renders.

export const content = {
  hi: {
    // Crops
    "Bajra": "बाजरा", "Pearl Millet": "बाजरा",
    "Wheat": "गेहूँ", "Bread Wheat": "गेहूँ",
    "Mustard": "सरसों", "Oilseed Mustard": "सरसों",
    "Groundnut": "मूंगफली", "Peanut": "मूंगफली",
    "Cumin": "जीरा", "Jeera Spice": "जीरा",
    "Fennel": "सौंफ", "Saunf Spice": "सौंफ",
    "Chickpea": "चना", "Bengal Gram": "चना",
    "Sesame": "तिल", "Til Oilseed": "तिल",
    "Maize": "मक्का", "Field Corn": "मक्का",
    "Cotton": "कपास", "Bt Cotton": "बीटी कपास",
    "Tomato": "टमाटर", "Hybrid Tomato": "हाइब्रिड टमाटर",
    "Chilli": "मिर्च", "Hot Pepper": "मिर्च",
    "Okra": "भिंडी", "Bhindi": "भिंडी",
    "Vegetables": "सब्ज़ियाँ", "Veg Crops": "सब्ज़ी पाक",
    "Fodder": "चारा", "Fodder Crops": "चारा पाक",
    "Isabgol": "इसबगोल",
    "Seed Spices": "बीज मसाले", "SEED SPICES": "बीज मसाले", "Species": "बीज मसाले",
    "Major Indian Seed Spices": "प्रमुख भारतीय बीज मसाले",
    "Our Seed Spices": "हमारे बीज मसाले",
    "India's Premier Seed Spices": "भारत के प्रमुख बीज मसाले",
    "Seed Rate & Acreage Calculator": "बीज दर एवं रकबा कैलकुलेटर",
    "Farmer's Seed Rate & Acreage Calculator": "किसान बीज दर एवं रकबा कैलकुलेटर",
    "1-Click WhatsApp Enquiry": "1-क्लिक व्हाट्सएप पूछताछ",

    // Seasons
    "Kharif": "खरीफ", "Rabi": "रबी", "Summer": "गर्मी",
    "June – October": "जून – अक्टूबर",
    "October – March": "अक्टूबर – मार्च",
    "February – May": "फरवरी – मई",
    "Monsoon-driven sowing across rainfed and irrigated tracts, anchored by pearl millet, maize and cotton.": "वर्षा-आधारित और सिंचित क्षेत्रों में मानसून-संचालित बुवाई, बाजरा, मक्का और कपास के साथ।",
    "Cool-season cultivation focused on wheat, mustard and spices under controlled irrigation.": "नियंत्रित सिंचाई के तहत गेहूँ, सरसों और मसालों पर केंद्रित शीत-ऋतु खेती।",
    "Short-window cultivation of groundnut, vegetables and fodder under assured irrigation.": "निश्चित सिंचाई के तहत मूंगफली, सब्ज़ियों और चारे की छोटी-अवधि खेती।",

    // Quality steps
    "Research": "अनुसंधान",
    "Parent lines bred and screened across multiple locations for stress and performance.": "तनाव और प्रदर्शन के लिए कई स्थानों पर जनक लाइनें प्रजनित और जाँची गईं।",
    "Selection": "चयन",
    "Only consistent, high-performing entries advance to commercialisation.": "केवल सुसंगत, उच्च-प्रदर्शन वाली प्रविष्टियाँ व्यावसायिक रूप से आगे बढ़ती हैं।",
    "Production": "उत्पादन",
    "Seed multiplication under isolation and supervision at contracted farms.": "अनुबंधित खेतों पर विलगन और निगरानी में बीज गुणन।",
    "Processing": "प्रसंस्करण",
    "Cleaning, grading and treatment through a controlled processing process.": "नियंत्रित प्रसंस्करण प्रक्रिया के माध्यम से सफाई, ग्रेडिंग और उपचार।",
    "Quality Testing": "गुणवत्ता परीक्षण",
    "Germination, physical purity, genetic purity and moisture verified per lot.": "प्रति लॉट अंकुरण, भौतिक शुद्धता, आनुवंशिक शुद्धता और नमी सत्यापित।",
    "Packaging": "पैकेजिंग",
    "Moisture-safe, traceable packaging with clear lot identification.": "स्पष्ट लॉट पहचान के साथ नमी-सुरक्षित, ट्रेसेबल पैकेजिंग।",
    "Distribution": "वितरण",
    "Controlled storage and dispatch through the authorised dealer network.": "नियंत्रित भंडारण और अधिकृत डीलर नेटवर्क के माध्यम से प्रेषण।",
    "Farmer": "किसान",
    "Agronomy support and field monitoring throughout the growing season.": "पूरी बढ़ती ऋतु के दौरान कृषि सहायता और फ़ील्ड निगरानी।",

    // Research areas
    "Plant Breeding": "पादप प्रजनन",
    "Hybrid and varietal development across field crops, vegetables and oilseeds.": "खेत फसलों, सब्ज़ियों और तिलहनों में हाइब्रिड और किस्म विकास।",
    "Field Trials": "फ़ील्ड परीक्षण",
    "Multi-location trials evaluating adaptability, yield stability and stress tolerance.": "अनुकूलनता, उपज स्थिरता और तनाव सहनशक्ति का मूल्यांकन करते बहु-स्थानीय परीक्षण।",
    "Disease Screening": "रोग जाँच",
    "Targeted screening for regionally relevant pest and disease pressure.": "क्षेत्रीय रूप से संगत कीट और रोग दबाव के लिए लक्षित जाँच।",
    "Climate Adaptability": "जलवायु अनुकूलनता",
    "Selection for heat, water-use efficiency and erratic rainfall patterns.": "गर्मी, जल-उपयोग दक्षता और अनियमित वर्षा पैटर्न के लिए चयन।",

    // Values
    "Farmer First": "किसान प्रथम",
    "Every variety is shaped by real field feedback from the farmers who grow it.": "हर किस्म उसे उगाने वाले किसानों की वास्तविक फ़ील्ड प्रतिक्रिया से तय होती है।",
    "Research Integrity": "अनुसंधान ईमानदारी",
    "Honest trials, transparent data and a refusal to overpromise on performance.": "ईमानदार परीक्षण, पारदर्शी आँकड़े और प्रदर्शन पर अति-वादा करने से इनकार।",
    "Quality Commitment": "गुणवत्ता प्रतिबद्धता",
    "Rigorous cleaning, grading and germination standards on every seed lot.": "हर बीज लॉट पर कठोर सफाई, ग्रेडिंग और अंकुरण मानक।",
    "Climate Resilience": "जलवायु लचीलापन",
    "Breeding for heat, water stress and pest pressure that farmers actually face.": "किसानों द्वारा वास्तव में सामना की जाने वाली गर्मी, जल तनाव और कीट दबाव के लिए प्रजनन।",

    // Seed variety types
    "Hybrid": "हाइब्रिड", "Improved": "उन्नत",

    // Presence states
    "Gujarat": "गुजरात", "Rajasthan": "राजस्थान", "Maharashtra": "महाराष्ट्र",
    "Madhya Pradesh": "मध्य प्रदेश", "Uttar Pradesh": "उत्तर प्रदेश",
    "Haryana": "हरियाणा", "Punjab": "पंजाब"
  },

  gu: {
    // Crops
    "Bajra": "બાજરી", "Pearl Millet": "બાજરી",
    "Wheat": "ઘઉં", "Bread Wheat": "ઘઉં",
    "Mustard": "રાઈ", "Oilseed Mustard": "રાઈ",
    "Groundnut": "મગફળી", "Peanut": "મગફળી",
    "Cumin": "જીરું", "Jeera Spice": "જીરું",
    "Fennel": "સોંફ", "Saunf Spice": "સોંફ",
    "Chickpea": "ચણા", "Bengal Gram": "ચણા",
    "Sesame": "તલ", "Til Oilseed": "તલ",
    "Maize": "મકાઈ", "Field Corn": "મકાઈ",
    "Cotton": "કપાસ", "Bt Cotton": "બીટી કપાસ",
    "Tomato": "ટમાટર", "Hybrid Tomato": "હાઇબ્રિડ ટમાટર",
    "Chilli": "મરચું", "Hot Pepper": "મરચું",
    "Okra": "ભીંડો", "Bhindi": "ભીંડો",
    "Vegetables": "શાકભાજી", "Veg Crops": "શાક પાક",
    "Fodder": "ચારો", "Fodder Crops": "ચારા પાક",
    "Isabgol": "ઈસબગુલ",
    "Seed Spices": "બીજ મસાલા", "SEED SPICES": "બીજ મસાલા", "Species": "બીજ મસાલા",
    "Major Indian Seed Spices": "મુખ્ય ભારતીય બીજ મસાલા",
    "Our Seed Spices": "અમારા બીજ મસાલા",
    "India's Premier Seed Spices": "ભારતના મુખ્ય બીજ મસાલા",
    "Seed Rate & Acreage Calculator": "બીજ દર અને જમીન કેલ્ક્યુલેટર",
    "Farmer's Seed Rate & Acreage Calculator": "ખેડૂત બીજ દર અને જમીન કેલ્ક્યુલેટર",
    "1-Click WhatsApp Enquiry": "1-ક્લિક વોટ્સએપ પૂછપરછ",

    // Seasons
    "Kharif": "ખરીફ", "Rabi": "રવિ", "Summer": "ઉનાળો",
    "June – October": "જૂન – ઓક્ટોબર",
    "October – March": "ઓક્ટોબર – માર્ચ",
    "February – May": "ફેબ્રુઆરી – મે",
    "Monsoon-driven sowing across rainfed and irrigated tracts, anchored by pearl millet, maize and cotton.": "વરસાદ-આધારિત અને સિંચાઈ વિસ્તારોમાં મોસમ-સંચાલિત વાવણી, બાજરી, મકાઈ અને કપાસ સાથે.",
    "Cool-season cultivation focused on wheat, mustard and spices under controlled irrigation.": "નિયંત્રિત સિંચાઈ હેઠળ ઘઉં, રાઈ અને મસાલા પર કેન્દ્રિત શિયાળુ-ઋતુ ખેતી.",
    "Short-window cultivation of groundnut, vegetables and fodder under assured irrigation.": "નિશ્ચિત સિંચાઈ હેઠળ મગફળી, શાકભાજી અને ચારાની ટૂંકી-સમય ખેતી.",

    // Quality steps
    "Research": "સંશોધન",
    "Parent lines bred and screened across multiple locations for stress and performance.": "તણાવ અને પ્રદર્શન માટે અનેક સ્થળોએ મૂળ લાઇન પ્રજનિત અને ચકાસાયેલ.",
    "Selection": "પસંદગી",
    "Only consistent, high-performing entries advance to commercialisation.": "માત્ર સુસંગત, ઉચ્ચ-પ્રદર્શન નોંધણીઓ વ્યાવસાયિક રીતે આગળ વધે છે.",
    "Production": "ઉત્પાદન",
    "Seed multiplication under isolation and supervision at contracted farms.": "કરારી ખેતરોએ વિલગીકરણ અને દેખરેખ હેઠળ બીજ ગુણન.",
    "Processing": "પ્રક્રિયા",
    "Cleaning, grading and treatment through a controlled processing process.": "નિયંત્રિત પ્રક્રિયા માર્ગે સફાઈ, ગ્રેડિંગ અને સારવાર.",
    "Quality Testing": "ગુણવત્તા પરીક્ષણ",
    "Germination, physical purity, genetic purity and moisture verified per lot.": "દરેક લોટ અંકુરણ, ભૌતિક શુદ્ધતા, આનુવંશિક શુદ્ધતા અને ભેજ ચકાસાયેલ.",
    "Packaging": "પેકેજિંગ",
    "Moisture-safe, traceable packaging with clear lot identification.": "સ્પષ્ટ લોટ ઓળખ સાથે ભેજ-સુરક્ષિત, ટ્રેસેબલ પેકેજિંગ.",
    "Distribution": "વિતરણ",
    "Controlled storage and dispatch through the authorised dealer network.": "નિયંત્રિત ભંડારણ અને અધિકૃત ડીલર નેટવર્ક મારફેત પ્રેષણ.",
    "Farmer": "ખેડૂત",
    "Agronomy support and field monitoring throughout the growing season.": "આખી વિકસતી ઋતુ દરમિયાન કૃષિ સહાય અને ફીલ્ડ નિગરાની.",

    // Research areas
    "Plant Breeding": "પાદપ પ્રજનન",
    "Hybrid and varietal development across field crops, vegetables and oilseeds.": "ખેતર પાક, શાકભાજી અને તલહનમાં હાઇબ્રિડ અને જાત વિકાસ.",
    "Field Trials": "ફીલ્ડ પરીક્ષણ",
    "Multi-location trials evaluating adaptability, yield stability and stress tolerance.": "અનુકૂલનતા, ઉપજ સ્થિરતા અને તણાવ સહનશક્તિનું મૂલ્યાંકન કરતા બહુ-સ્થાનીય પરીક્ષણ.",
    "Disease Screening": "રોગ જાંચ",
    "Targeted screening for regionally relevant pest and disease pressure.": "પ્રાદેશિક રીતે સંગત કીટ અને રોગ દબાણ માટે લક્ષિત જાંચ.",
    "Climate Adaptability": "જલવાયુ અનુકૂલનતા",
    "Selection for heat, water-use efficiency and erratic rainfall patterns.": "ગરમી, જળ-ઉપયોગ ક્ષમતા અને અનિયમિત વરસાદ પેટર્ન માટે પસંદગી.",

    // Values
    "Farmer First": "ખેડૂત પ્રથમ",
    "Every variety is shaped by real field feedback from the farmers who grow it.": "દરેક જાત તેને ઉગાડતા ખેડૂતોની વાસ્તવિક ફીલ્ડ પ્રતિસાદથી ઘડાય છે.",
    "Research Integrity": "સંશોધન પ્રામાણિકતા",
    "Honest trials, transparent data and a refusal to overpromise on performance.": "પ્રામાણિક પરીક્ષણ, પારદર્શી આંકડા અને પ્રદર્શન પર અતિ-વાદો કરવાનો ઇનકાર.",
    "Quality Commitment": "ગુણવત્તા પ્રતિબદ્ધતા",
    "Rigorous cleaning, grading and germination standards on every seed lot.": "દરેક બીજ લોટ પર કઠોર સફાઈ, ગ્રેડિંગ અને અંકુરણ ધોરણ.",
    "Climate Resilience": "જલવાયુ સ્થિતિસ્થાપકતા",
    "Breeding for heat, water stress and pest pressure that farmers actually face.": "ખેડૂતો વાસ્તવમાં સામનો કરતી ગરમી, જળ તણાવ અને કીટ દબાણ માટે પ્રજનન.",

    // Seed variety types
    "Hybrid": "હાઇબ્રિડ", "Improved": "સુધારેલ",

    // Presence states
    "Gujarat": "ગુજરાત", "Rajasthan": "રાજસ્થાન", "Maharashtra": "મહારાષ્ટ્ર",
    "Madhya Pradesh": "મધ્ય પ્રદેશ", "Uttar Pradesh": "ઉત્તર પ્રદેશ",
    "Haryana": "હરિયાણા", "Punjab": "પંજાબ"
  }
};