export type DayType = 1 | 2 | 3 | 4;
export type Equipment = 'bar' | 'dumbbell' | 'machine';
export interface WorkoutSet { weight: string; reps: string }
export interface WorkoutExercise { exerciseId: string; sets: WorkoutSet[]; notes: string }
export interface WorkoutSession { id: string; date: string; completedAt: string; durationMinutes?: number; dayType: DayType; exercises: WorkoutExercise[] }
export interface Draft { dayType: DayType; startedAt: string; exercises: WorkoutExercise[] }
export interface WorkoutState { version: 1; sessions: WorkoutSession[]; draft?: Draft }
export interface Exercise { id: string; name: string; equipment: Equipment; group: string }

const push: Exercise[] = [
  ['press-plano-barra', 'Press plano con barra', 'bar'], ['press-inclinado-mancuernas', 'Press inclinado con mancuernas', 'dumbbell'], ['apertura-mancuernas', 'Apertura con mancuernas', 'dumbbell'], ['press-militar', 'Press militar', 'bar'], ['vuelo-lateral', 'Vuelo lateral', 'dumbbell'], ['press-frances', 'Press francés con barra romana', 'bar'], ['extension-triceps-barra', 'Extensión de tríceps con barra', 'machine'], ['extension-triceps-polea', 'Extensión unilateral de tríceps en polea baja', 'machine'],
].map(([id, name, equipment]) => ({ id, name, equipment: equipment as Equipment, group: 'Pecho · Hombros · Tríceps' }));
const pull: Exercise[] = [
  ['jalon-pecho', 'Jalón al pecho prono', 'machine'], ['remo-maquina', 'Remo sentado en máquina', 'machine'], ['remo-barra', 'Remo con barra libre', 'bar'], ['face-pull', 'Face pull', 'machine'], ['biceps-predicador', 'Bíceps en predicador', 'machine'], ['curl-martillo', 'Curl martillo', 'dumbbell'], ['curl-polea', 'Curl de bíceps en polea baja', 'machine'],
].map(([id, name, equipment]) => ({ id, name, equipment: equipment as Equipment, group: 'Espalda · Bíceps' }));
export const exercises = [...push, ...pull];
export const exercisesForDay = (day: DayType) => (day === 1 || day === 3 ? push : pull);
export const dayGroup = (day: DayType) => exercisesForDay(day)[0].group;
export const parseNumber = (input: string): number | null => {
  const value = input.trim().replace(',', '.');
  if (!/^\d+(?:\.\d+)?$/.test(value)) return null;
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : null;
};
export const setVolume = (exerciseId: string, set: WorkoutSet) => {
  const exercise = exercises.find((item) => item.id === exerciseId);
  const weight = parseNumber(set.weight) ?? 0; const reps = parseNumber(set.reps) ?? 0;
  return weight * reps * (exercise?.equipment === 'dumbbell' ? 2 : 1);
};
export const sessionVolume = (session: Pick<WorkoutSession | Draft, 'exercises'>) => session.exercises.reduce((sum, ex) => sum + ex.sets.reduce((total, set) => total + setVolume(ex.exerciseId, set), 0), 0);
export const sessionReps = (session: Pick<WorkoutSession | Draft, 'exercises'>) => session.exercises.reduce((sum, ex) => sum + ex.sets.reduce((total, set) => total + (parseNumber(set.reps) ?? 0), 0), 0);
export const blankDraft = (dayType: DayType): Draft => ({ dayType, startedAt: new Date().toISOString(), exercises: exercisesForDay(dayType).map((exercise) => ({ exerciseId: exercise.id, notes: '', sets: Array.from({ length: 3 }, () => ({ weight: '', reps: '' })) })) });
export const nextDay = (sessions: WorkoutSession[]): DayType => {
  const latest = sessions.reduce<WorkoutSession | undefined>((last, session) => !last || new Date(session.completedAt).getTime() > new Date(last.completedAt).getTime() ? session : last, undefined);
  return latest ? ((latest.dayType % 4) + 1) as DayType : 1;
};
