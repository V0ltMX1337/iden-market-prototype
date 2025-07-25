import React, { useState, useEffect, DragEvent, useRef } from "react";
import Plyr from "react-plyr";
import "plyr/dist/plyr.css";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { storeApi } from "@/lib/store"; // uploadVideo, deleteVideo, fetchVideoFromUrl, getVideo, getVideoDownloadProgress
import { Loader2 } from "lucide-react";

const VideoTab = () => {
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [downloadTaskId, setDownloadTaskId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(-1); // -1 — подготовка, 0..100 — прогресс

  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchVideos = async () => {
    try {
      const data = await storeApi.getVideo();
      setVideos(data);
    } catch (e) {
      setError("Ошибка загрузки списка видео");
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Опрос прогресса скачивания видео с URL
  useEffect(() => {
    if (!downloadTaskId) return;

    // Сначала показываем «подготовка»
    setDownloadProgress(-1);

    progressIntervalRef.current = setInterval(async () => {
      try {
        const res = await storeApi.getVideoDownloadProgress(downloadTaskId);

        // Обновляем прогресс, только если он >= 0, иначе оставляем -1
        if (typeof res.progress === "number" && res.progress >= 0) {
          setDownloadProgress(res.progress);
        }

        if (res.progress >= 100) {
          clearInterval(progressIntervalRef.current!);
          progressIntervalRef.current = null;
          setDownloadTaskId(null);
          setDownloadProgress(-1);
          setLoading(false);
          setSuccess("Скачивание завершено. Видео появится после обработки.");
          fetchVideos();
        }
      } catch {
        clearInterval(progressIntervalRef.current!);
        progressIntervalRef.current = null;
        setDownloadTaskId(null);
        setDownloadProgress(-1);
        setLoading(false);
        setError("Ошибка получения прогресса скачивания");
      }
    }, 1000);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, [downloadTaskId]);

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("video/")
    );
    if (files.length === 0) {
      setError("Пожалуйста, загрузите видеофайлы (mp4, mkv, и т.д.)");
      return;
    }
    setError(null);
    setVideoFiles(files);
    setTitle(files.length === 1 ? files[0].name.replace(/\.[^/.]+$/, "") : "");
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  const uploadVideos = async () => {
    if (videoFiles.length === 0) {
      setError("Выберите файл(ы) для загрузки");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      for (const file of videoFiles) {
        const formData = new FormData();
        formData.append("video", file);
        if (title) formData.append("title", title);
        await storeApi.uploadVideo(formData);
      }
      setVideoFiles([]);
      setTitle("");
      setSuccess("Видео успешно загружены");
      fetchVideos();
    } catch (err) {
      setError("Ошибка загрузки видео");
    } finally {
      setLoading(false);
    }
  };

  const fetchVideoFromUrl = async () => {
    if (!videoUrl.trim()) {
      setError("Введите ссылку на видео");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    setDownloadProgress(-1);

    try {
      const res = await storeApi.fetchVideoFromUrl(videoUrl.trim());
      setDownloadTaskId(res.taskId);
      setDownloadProgress(-1); // Подготовка
      setVideoUrl("");
    } catch {
      setError("Ошибка при скачивании с YouTube или ВКонтакте");
      setLoading(false);
    }
  };

  const deleteVideo = async (filename: string) => {
    if (!window.confirm("Удалить это видео?")) return;
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await storeApi.deleteVideo(filename);
      setSuccess("Видео удалено");
      fetchVideos();
    } catch {
      setError("Ошибка удаления видео");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto p-4">
      {error && <div className="text-red-600 font-bold mb-2">{error}</div>}
      {success && <div className="text-green-600 font-bold mb-2">{success}</div>}

      <Card>
        <CardHeader>
          <CardTitle>Загрузить видеофайлы</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Название видео (опционально)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading || downloadTaskId !== null}
          />

          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            className="border-2 border-dashed border-gray-400 rounded p-6 text-center cursor-pointer select-none"
            onClick={() => document.getElementById("videoInput")?.click()}
          >
            {videoFiles.length === 0
              ? "Перетащите видео сюда или нажмите, чтобы выбрать"
              : `${videoFiles.length} файл(ов) выбрано: ${videoFiles
                  .map((f) => f.name)
                  .join(", ")}`}
          </div>

          <Input
            id="videoInput"
            type="file"
            accept="video/*"
            multiple
            onChange={(e) =>
              setVideoFiles(e.target.files ? Array.from(e.target.files) : [])
            }
            disabled={loading || downloadTaskId !== null}
            className="hidden"
          />

          <div className="flex gap-4">
            <Button
              onClick={uploadVideos}
              disabled={loading || videoFiles.length === 0 || downloadTaskId !== null}
            >
              {loading && !downloadTaskId && (
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
              )}
              Загрузить
            </Button>
            <Button
              variant="secondary"
              onClick={() => setVideoFiles([])}
              disabled={loading || videoFiles.length === 0 || downloadTaskId !== null}
            >
              Очистить
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Скачать видео с YouTube или ВКонтакте</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Введите ссылку на видео (YouTube или VK)"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            disabled={loading || downloadTaskId !== null}
          />
          <Button onClick={fetchVideoFromUrl} disabled={loading || downloadTaskId !== null}>
            {(loading || downloadTaskId !== null) && (
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
            )}
            Скачать
          </Button>

          {downloadTaskId !== null && (
            <div className="mt-2">
              {downloadProgress === -1 ? (
                <div className="italic text-gray-600">Подготовка к скачиванию...</div>
              ) : (
                <progress
                  max={100}
                  value={downloadProgress}
                  className="w-full h-4 rounded"
                >
                  {downloadProgress}%
                </progress>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-6 mt-8">
        {videos.length === 0 && (
          <p className="text-center text-gray-500">Видео пока нет</p>
        )}

        {videos.map((video) => (
          <div
            key={video.videoFilename}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
          >
            <h3
              className="font-semibold text-lg mb-2 truncate"
              title={video.videoFilename}
            >
              {video.videoFilename}
            </h3>

            <div className="rounded-md overflow-hidden shadow-md">
              <Plyr
  type="video"
  url={video.videoUrl}
  controls={[
    "play-large",
    "play",
    "progress",
    "current-time",
    "mute",
    "volume",
    "fullscreen",
  ]}
/>
            </div>

            <div className="mt-3 flex justify-between items-center text-sm text-gray-600">
              <span>Загружено: {new Date(video.uploadTime).toLocaleString()}</span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteVideo(video.videoFilename)}
                disabled={loading || downloadTaskId !== null}
                className="ml-4"
              >
                Удалить
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoTab;
