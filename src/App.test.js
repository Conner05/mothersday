import React from "react"
import { render, cleanup, fireEvent, waitForElement } from "@testing-library/react"
import App from "./App"
import * as utils from "./utils"

describe("App", () => {
  beforeEach(() => {
    const names = ["Conner"]
    utils.getNamesOfPosters = jest.fn(async () => names)
    utils.postFiles = jest.fn(async (files, name) => {
      setTimeout(() => {}, 100)
    })
  })

  afterEach(cleanup)

  describe("hidden input", () => {
    it("should add name to list when changed", async () => {
      const { queryByLabelText } = render(<App />)
      await waitForElement(() => queryByLabelText(/names list number 1 Conner/i))
      fireEvent.change(queryByLabelText(/enter name/i), { target: { value: "Ricky Bobby" } })
      fireEvent.change(queryByLabelText(/hidden input/i), {
        target: { files: [new File(["(⌐□_□)"], "cool.png", { type: "image/png" })] },
      })
      await waitForElement(() => queryByLabelText(/names list number 1 Ricky/i))
      expect(queryByLabelText(/names list number 1 Ricky/i)).toBeInTheDocument()
    })
    it("should add name to list when changed twice", async () => {
      const { queryByLabelText } = render(<App />)
      await waitForElement(() => queryByLabelText(/names list number 1 Conner/i))

      // first time
      fireEvent.change(queryByLabelText(/enter name/i), { target: { value: "Ricky Bobby" } })
      fireEvent.change(queryByLabelText(/hidden input/i), {
        target: { files: [new File(["(⌐□_□)"], "cool.png", { type: "image/png" })] },
      })
      await waitForElement(() => queryByLabelText(/names list number 1 Ricky/i))
      expect(queryByLabelText(/names list number 1 Ricky/i)).toBeInTheDocument()

      // second time
      fireEvent.change(queryByLabelText(/enter name/i), { target: { value: "Wonder Woman" } })
      fireEvent.change(queryByLabelText(/hidden input/i), {
        target: { files: [new File(["(⌐□_□)"], "cool2.png", { type: "image/png" })] },
      })
      await waitForElement(() => queryByLabelText(/names list number 1 Wonder/i))
      expect(queryByLabelText(/names list number 1 Wonder/i)).toBeInTheDocument()
    })
  })

  describe("Select Video button", () => {
    it("should display on render", async () => {
      const { queryByLabelText } = render(<App />)
      expect(queryByLabelText(/select video/i)).toBeInTheDocument()
      await waitForElement(() => queryByLabelText(/names list number 1 Conner/i))
    })
  })
})
