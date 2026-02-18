(function () {
  function requireFirebaseConfig() {
    if (!window.FIREBASE_CONFIG || !window.FIREBASE_CONFIG.projectId || window.FIREBASE_CONFIG.projectId === 'REPLACE_ME') {
      throw new Error('Firebase non configuré: renseignez firebase-config.js');
    }
  }

  function init() {
    requireFirebaseConfig();
    const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(window.FIREBASE_CONFIG);
    const db = firebase.firestore(app);
    return { app, db };
  }

  function toTimestampFromLocalDateTime(localValue) {
    if (!localValue) return null;
    const dt = new Date(localValue);
    if (Number.isNaN(dt.getTime())) return null;
    return firebase.firestore.Timestamp.fromDate(dt);
  }

  function formatTimestamp(ts) {
    if (!ts || typeof ts.toDate !== 'function') return '—';
    return ts.toDate().toLocaleString('fr-FR');
  }

  function extractMaintenance(doc) {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title || '',
      machine: data.machine || '',
      startAt: data.startAt || null,
      endAt: data.endAt || null,
      enabled: Boolean(data.enabled),
      status: data.status || 'planned',
      createdAt: data.createdAt || null,
      updatedAt: data.updatedAt || null
    };
  }

  window.MaintenanceFirebase = {
    init,
    toTimestampFromLocalDateTime,
    formatTimestamp,
    extractMaintenance,
    serverTimestamp: () => firebase.firestore.FieldValue.serverTimestamp()
  };
})();
