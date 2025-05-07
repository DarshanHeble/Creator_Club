import { Quest } from "@/types";
import api from "./api";

export const questService = {
  async createQuest(creatorId: string, quest: Quest): Promise<Quest> {
    try {
      const response = await api.post<Quest>("quest/create-quest", {
        creatorId,
        quest,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create quest.");
    }
  },

  async getQuests(creatorId: string): Promise<Quest[]> {
    try {
      const response = await api.get<Quest[]>(`quest/get-quests/${creatorId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to retrieve quests.");
    }
  },

  async deleteQuest(creatorId: string, questId: string): Promise<void> {
    try {
      await api.delete(`quest/delete-quest/${creatorId}/${questId}`);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete quest.");
    }
  },

  async completeQuest(userId: string, questId: string): Promise<void> {
    try {
      await api.post(`quest/complete-quest/${userId}/${questId}`);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to complete quest.");
    }
  },
};
