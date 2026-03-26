/**
 * Case Switch – block ก้ามปู สำหรับ Minecraft Education Edition
 * ใช้ handlerStatement=1 เพื่อให้ block รับ block ซ้อนข้างในได้
 */
//% block="Case Switch"
//% color="#7B5EA7"
//% icon="\uf074"
//% weight=95
namespace caseSwitch {

    let _cases: { match: number; body: () => void }[] = []
    let _defaultBody: (() => void) | null = null
    let _currentValue: number = 0

    // ─── switch on (hat block) ───────────────────────

    /**
     * เริ่ม switch — ใส่ case block ข้างในได้เลย
     * @param value ค่าตัวเลขที่ต้องการตรวจสอบ
     * @param body บล็อกที่อยู่ข้างใน
     */
    //% blockId=caseswitch_switch_on
    //% block="switch on $value"
    //% handlerStatement=1
    //% weight=100
    //% blockGap=8
    export function switchOn(value: number, body: () => void): void {
        _cases = []
        _defaultBody = null
        _currentValue = value
        body()
        _run()
    }

    // ─── case (C-shape block) ────────────────────────

    /**
     * เงื่อนไข case — วางในบล็อก switch on
     * @param match ค่าที่ต้องตรงกัน
     * @param body บล็อกที่จะทำงานถ้าตรง
     */
    //% blockId=caseswitch_case
    //% block="case $match"
    //% handlerStatement=1
    //% weight=90
    //% blockGap=4
    export function caseOf(match: number, body: () => void): void {
        _cases.push({ match: match, body: body })
    }

    /**
     * case ช่วงตัวเลข from ถึง to — วางในบล็อก switch on
     * @param from ค่าเริ่มต้น
     * @param to   ค่าสิ้นสุด
     * @param body บล็อกที่จะทำงานถ้าตรง
     */
    //% blockId=caseswitch_case_range
    //% block="case from $from to $to"
    //% handlerStatement=1
    //% weight=85
    //% blockGap=4
    export function caseRange(from: number, to: number, body: () => void): void {
        if (_currentValue >= from && _currentValue <= to) {
            _cases.push({ match: _currentValue, body: body })
        }
    }

    /**
     * default — ทำงานถ้าไม่มี case ไหนตรงเลย
     * @param body บล็อกที่จะทำงาน
     */
    //% blockId=caseswitch_default
    //% block="default"
    //% handlerStatement=1
    //% weight=80
    //% blockGap=8
    export function defaultCase(body: () => void): void {
        _defaultBody = body
    }

    // ─── internal ────────────────────────────────────
    function _run(): void {
        let matched = false
        for (let i = 0; i < _cases.length; i++) {
            if (_cases[i].match === _currentValue) {
                _cases[i].body()
                matched = true
                break
            }
        }
        if (!matched && _defaultBody != null) {
            _defaultBody()
        }
    }
}