import { supabase } from "../../../lib/supabaseClient";
import { sortOnce } from "../../../helpers/sort";

async function getSearchResults(req, res) {
  const { query, ownerId } = req.query
  let outputData = {
    "goalData": [],
    "contactData": [],
    "descriptionData": []
  }
  try {
    // Search goal titles
    const { data, error, status } = await supabase
      .from('goals')
      .select()
      .ilike('title', `%${query}%`)
      .eq('owner_id', ownerId)
    if (data) {
      outputData = {
        ...outputData,
        goalData: data
      }
    }
    error && console.error("Search Error: ", error)
  } catch (err) {
    res.json(err)
  } finally {
    // Search contact names
    try {
      const { data, error, status } = await supabase
        .from('contacts')
        .select()
        .ilike('name', `%${query}%`)
        .eq('owner_id', ownerId)
      if (data) {
        outputData = {
          ...outputData,
          contactData: data
        }
      }
      error && console.error("Search Error: ", error)
    } catch (err) {
      console.error("Search Error: ", err)
    } finally {
      // Search goal descriptions
      try {
        const { data, error, status } = await supabase
          .from('goals')
          .select()
          .ilike('description', `%${query}%`)
          .eq('owner_id', ownerId)
        if (data) {
          outputData = {
            ...outputData,
            descriptionData: data
          }
        }
        error && console.error("Search Error: ", error)
      } catch (err) {
        console.error("Search Error: ", err)
      } finally {
        const concatGoalData = outputData?.goalData.concat(outputData?.descriptionData)
        const sortedGoals = sortOnce(concatGoalData, 'id', false)
        // Remove duplicates
        let filteredGoals = []
        if (sortedGoals?.length > 0) {
          filteredGoals = Array.from(new Set(sortedGoals?.map(a => a.id)))
            .map(id => {
              return sortedGoals.find(a => a.id === id)
            })
        }
        const finalOutput = {
          "contactData": outputData.contactData,
          "goalData": filteredGoals
        }
        res.status(200).json(finalOutput)
      }
    }
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    //
  } else if (req.method === 'GET') {
    return getSearchResults(req, res)
  } else {
    res.send("Something's not right. Check your query.").end()
  }
}