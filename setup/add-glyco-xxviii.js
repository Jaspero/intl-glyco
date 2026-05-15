const admin = require('firebase-admin');
admin.initializeApp({ projectId: 'intl-glyco' });

const db = admin.firestore();

const meetingHtml = `<h1>GLYCO XXVIII</h1>` +
  `<p>The International Symposium on Glycoconjugates</p>` +
  `<p>The GLYCO XXVIII, the 28TH INTERNATIONAL CONFERENCE ON GLYCOCONJUGATES, will take place from <strong>AUGUST 1 – 6, 2027</strong> in <strong>Chiba, Japan</strong>.</p>` +
  `<p>More information:</p>` +
  `<p><a href="https://www.congre.co.jp/glyco2027/about_glyco28.html" target="_blank">https://www.congre.co.jp/glyco2027/about_glyco28.html</a></p>`;

const eventDescription = `<p>The GLYCO XXVIII, the 28TH INTERNATIONAL CONFERENCE ON GLYCOCONJUGATES, will take place from AUGUST 1 – 6, 2027 in Chiba, Japan. More information:</p>` +
  `<p><a href="https://www.congre.co.jp/glyco2027/about_glyco28.html" target="_blank">https://www.congre.co.jp/glyco2027/about_glyco28.html</a></p>`;

const announcementContent = `<p>The International Symposium on Glycoconjugates</p>` +
  `<p>The GLYCO XXVIII, the 28TH INTERNATIONAL CONFERENCE ON GLYCOCONJUGATES, will take place from AUGUST 1 – 6, 2027 in Chiba, Japan.</p>` +
  `<p>More information:</p>` +
  `<p><a href="https://www.congre.co.jp/glyco2027/about_glyco28.html" target="_blank">https://www.congre.co.jp/glyco2027/about_glyco28.html</a></p>`;

async function run() {
  // 1. Prepend GLYCO XXVIII to meetings page content
  const meetingsDoc = await db.collection('pages').doc('meetings').get();
  const currentContent = meetingsDoc.data().content || '';
  await db.collection('pages').doc('meetings').update({
    content: meetingHtml + ' ' + currentContent
  });
  console.log('✓ Updated pages/meetings content');

  // 2. Add event document
  const eventRef = await db.collection('events').add({
    title: 'GLYCO XXVIII',
    description: eventDescription,
    content: '',
    readMore: '',
    from: new Date('2027-08-01T00:00:00').getTime(),   // August 1, 2027
    to: new Date('2027-08-06T00:00:00').getTime(),     // August 6, 2027
    createdOn: Date.now()
  });
  console.log('✓ Created event: ' + eventRef.id);

  // 3. Add announcement document
  const annRef = await db.collection('announcements').add({
    title: 'GLYCO XXVIII',
    content: announcementContent
  });
  console.log('✓ Created announcement: ' + annRef.id);
}

run()
  .then(() => { console.log('\nAll done!'); process.exit(0); })
  .catch(e => { console.error('Error:', e); process.exit(1); });
