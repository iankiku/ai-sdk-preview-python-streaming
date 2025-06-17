import { create } from "zustand";

export interface Measurement {
	id: number;
	length: number | null;
	width: number | null;
	area: number | null;
	confidence: number | null;
	created_at: string;
}

export interface PhotoItem {
	id: number;
	fileUrl: string;
	status: "pending" | "processing" | "completed" | "failed";
	measurements?: Measurement[];
	error?: string;
}

interface PhotoState {
	photos: PhotoItem[];
	addPhoto: (photo: PhotoItem) => void;
	updateStatus: (
		photoId: number,
		status: PhotoItem["status"],
		error?: string
	) => void;
	setMeasurements: (photoId: number, measurements: Measurement[]) => void;
	setPhotos: (photos: PhotoItem[]) => void;
}

export const usePhotoStore = create<PhotoState>((set) => ({
	photos: [],
	addPhoto: (photo) => set((state) => ({ photos: [...state.photos, photo] })),
	updateStatus: (photoId, status, error) =>
		set((state) => ({
			photos: state.photos.map((p) =>
				p.id === photoId ? { ...p, status, error } : p
			),
		})),
	setMeasurements: (photoId, measurements) =>
		set((state) => ({
			photos: state.photos.map((p) =>
				p.id === photoId ? { ...p, measurements } : p
			),
		})),
	setPhotos: (photos) => set({ photos }),
}));
