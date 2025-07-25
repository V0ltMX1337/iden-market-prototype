import { useState, useEffect, useRef, DragEvent } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { storeApi } from "@/lib/store";
import { Track } from "@/lib/types";

const formatTime = (sec: number) => {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const MusicTab = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [musicFiles, setMusicFiles] = useState<File[]>([]);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(1);

  const fetchTracks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await storeApi.getMusic();
      setTracks(data);
    } catch {
      setError("Ошибка загрузки треков");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  // Drag-n-drop
  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === "audio/mpeg"
    );
    if (files.length === 0) {
      setError("Пожалуйста, загрузите только mp3 файлы");
      return;
    }
    setError(null);
    setMusicFiles(files);
    if (files.length === 1) {
      setTitle(files[0].name.replace(/\.[^/.]+$/, ""));
    } else {
      setTitle("");
    }
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const uploadTracks = async () => {
    if (musicFiles.length === 0) {
      setError("Выберите файл(ы) для загрузки");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      for (const file of musicFiles) {
        const formData = new FormData();
        formData.append(
          "title",
          title.trim() || file.name.replace(/\.[^/.]+$/, "")
        );
        formData.append("music", file);
        await storeApi.uploadMusic(formData);
      }
      setMusicFiles([]);
      setTitle("");
      await fetchTracks();
    } catch {
      setError("Ошибка загрузки треков");
    } finally {
      setLoading(false);
    }
  };

  const playTrackAtIndex = (index: number) => {
    if (index < 0 || index >= tracks.length) return;
    setCurrentTrackIndex(index);
    const track = tracks[index];
    if (audioRef.current) {
      audioRef.current.src = track.musicUrl;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  };

  const deleteTrack = async (filename: string, index: number) => {
      try {
        await storeApi.deleteMusic(filename);
        await fetchTracks();

        if (currentTrackIndex !== null) {
          if (currentTrackIndex === index) {
            setCurrentTrackIndex(null);
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.src = "";
              setIsPlaying(false);
              setProgress(0);
            }
          } else if (currentTrackIndex > index) {
            setCurrentTrackIndex(currentTrackIndex - 1);
          }
        }
      } catch {
        setError("Ошибка удаления трека");
      }
    };

  const playNext = () => {
    if (currentTrackIndex === null) return;
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    playTrackAtIndex(nextIndex);
  };

  const playPrev = () => {
    if (currentTrackIndex === null) return;
    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrackAtIndex(prevIndex);
  };

  // Громкость — синхронизируем с аудио
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Работа с прогрессом и событиями аудио
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => playNext();

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentTrackIndex, tracks]);

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = Number(e.target.value);
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
  };

  const clearFiles = () => {
    setMusicFiles([]);
    setTitle("");
  };

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  const currentTrack =
    currentTrackIndex !== null ? tracks[currentTrackIndex] : null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      {error && <div className="text-red-600 font-bold mb-2">{error}</div>}

      <Card>
        <CardHeader>
          <CardTitle>Загрузить трек(и)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Название трека (если 1 файл)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />

          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            className="border-2 border-dashed border-gray-400 rounded p-6 text-center cursor-pointer select-none"
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            {musicFiles.length === 0
              ? "Перетащите mp3 файлы сюда или кликните, чтобы выбрать"
              : `${musicFiles.length} файл(ов) выбрано: ${musicFiles
                  .map((f) => f.name)
                  .join(", ")}`}
          </div>

          <Input
            id="fileInput"
            type="file"
            accept="audio/mpeg"
            multiple
            onChange={(e) =>
              setMusicFiles(e.target.files ? Array.from(e.target.files) : [])
            }
            disabled={loading}
            className="hidden"
          />

          <div className="flex gap-4">
            <Button
              onClick={uploadTracks}
              disabled={loading || musicFiles.length === 0}
            >
              Загрузить
            </Button>
            <Button
              variant="secondary"
              onClick={clearFiles}
              disabled={loading || musicFiles.length === 0}
            >
              Очистить
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {tracks.map((track, index) => (
          <Card
            key={track.id}
            className={`cursor-pointer ${
              currentTrackIndex === index ? "border-2 border-blue-500" : ""
            }`}
            onClick={() => playTrackAtIndex(index)}
          >
            <CardContent className="flex items-center gap-4 py-4">
              {track.coverUrl && (
                <img
                  src={track.coverUrl}
                  alt={track.title}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <div className="font-semibold">{track.title}</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(track.uploadTime).toLocaleString()}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    playTrackAtIndex(index);
                  }}
                >
                  ▶️
                </Button>
                <Button
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTrack(track.musicFilename, index);
                  }}
                >
                  🗑️
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Плеер внизу */}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg flex items-center gap-4 px-4 py-3 max-w-4xl mx-auto">
          {currentTrack.coverUrl ? (
            <img
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              className="w-16 h-16 rounded"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-300 rounded flex items-center justify-center text-gray-600">
              🎵
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="font-semibold truncate">{currentTrack.title}</div>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={progress}
              onChange={onSeek}
              className="w-full mt-1"
            />
            <div className="flex justify-between text-xs text-gray-600">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button aria-label="Предыдущий трек" onClick={playPrev} className="text-xl">
              ⏮️
            </Button>
            <Button
              aria-label={isPlaying ? "Пауза" : "Воспроизведение"}
              onClick={togglePlayPause}
              className="text-2xl"
            >
              {isPlaying ? "⏸️" : "▶️"}
            </Button>
            <Button aria-label="Следующий трек" onClick={playNext} className="text-xl">
              ⏭️
            </Button>
          </div>

          {/* Громкость */}
          <div className="flex items-center gap-1 w-24">
            <span>🔊</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={onVolumeChange}
              className="w-full"
            />
          </div>

          <audio ref={audioRef} className="hidden" />
        </div>
      )}
    </div>
  );
};

export default MusicTab;
