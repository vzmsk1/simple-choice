videojs('my-video', {
    fluid: true, // Устанавливает плеер на полный размер контейнера
    controlBar: {
        children: [
            'playToggle',
            'currentTimeDisplay',
            'timeDivider',
            'durationDisplay',
            'volumePanel',
            'progressControl',
            'fullscreenToggle',
            'customControlSpacer',
            'settingsMenuButton'
        ]
    }
});
