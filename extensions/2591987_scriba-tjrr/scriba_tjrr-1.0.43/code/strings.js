STRINGS = {
  conferenceColumn: 'Audiências',
  enterTitle: 'Entrar',
  enterTitleLong: 'Entrar',
  enterEmpty: '',
  guestTitleLong: 'Gerar convite',
  guestTitle: 'Gerar convite',
  conferencePrefix: 'Audiência',

  insertRecordingTitle: 'Este processo possui gravações. Uma delas pode ser inserida no documento.',
  insertRecordingText: 'Selecione uma gravação no menu à direita e inclua ela no documento com o código <strong>$enderecoGravacao</strong>',

  recordingsTitle: 'Gravações disponíveis',
  recordingsItemName: 'Gravação ',
  recordingsItemStartTime: 'Horário de início',
  recordingsItemEndTime: 'Horário de término',
  recordingsItemSize: 'Tamanho',
  recordingsItemDuration: 'Duração',
  recordingsItemSelect: 'Incluir gravação',
  recordingsTranscriptionLink: 'Assistir gravação',

  recordingSelected: 'Gravação selecionada',

  recordingsFieldSet: 'Gravações de Audiência',

  xhrError: 'Erro na extensão',
  xhrErrorDescription: 'Não foi possível conectar ao Scriba, por favor recarregue a página e tente novamente.',

  timeUndefined: 'Indefinido',
  timeLessThanAMinute: 'Menos de um minuto',
  timeMinutes: function(m) { return m + ' ' + (m==1 ? 'minuto' : 'minutos'); },
  timeHoursMinutes: function(h, m) { return h + ' ' + (h==1 ? 'hora' : 'horas') + (m==0 ? '' : ' e ' + m + ' ' + (m==1 ? 'minuto' : 'minutos')); }
};
